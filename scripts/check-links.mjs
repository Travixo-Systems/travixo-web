#!/usr/bin/env node
/**
 * Asserts every internal link in the built HTML points at a page that was
 * actually prerendered.
 *
 * A dead internal link does not fail the build. Next.js renders <Link href> to
 * an anchor whether or not the target exists, so a renamed route, a slug typed
 * by hand, or a locale prefix applied to a route that only exists in the other
 * locale all ship as a 404 that only a visitor discovers. Source-level checks
 * miss it because the href is often assembled from a route table at render
 * time, and the assembled value is what has to be checked.
 *
 * The route set is derived from the build output rather than from the route
 * manifest, for the same reason: a route that failed to generate is missing
 * from .next/server/app even though the manifest still lists it, and a link to
 * it is dead in exactly the way this exists to catch.
 *
 * Next.js metadata routes (favicon.ico, icon.png, robots.txt, sitemap.xml,
 * llms.txt) are emitted as `<name>.body` rather than as HTML, so they are
 * collected separately. Without that, every page's icon link reads as dead.
 *
 * Requires a completed build (scripts/build-check.mjs). It does not run one:
 * a gate that silently rebuilds hides how long it really takes to verify, and
 * the build may already be running elsewhere.
 *
 * Run with --self-test to prove the resolver can fail: it injects a known-dead
 * href into an in-memory copy of one page and asserts it is reported.
 */

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, relative, sep } from "node:path";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = join(ROOT, ".next", "server", "app");

/**
 * Schemes and prefixes that are not internal page links.
 *
 * /_next/ is the asset pipeline, which is emitted to .next/static rather than
 * to the app directory, so resolving it here would be meaningless.
 */
const EXTERNAL = /^(?:https?:|mailto:|tel:|\/\/|#)/;
const INTERNAL_SKIP = /^\/_next\//;

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const toPosix = (abs) => relative(OUT, abs).split(sep).join("/");

/**
 * Every route the build produced.
 *
 * Pages come from .html files: `fr/pricing.html` is `/fr/pricing`, and the
 * locale roots `fr.html` and `en.html` are `/fr` and `/en`. Metadata routes
 * come from `.body` files under the same tree.
 */
function prerendered() {
  const pages = new Set();
  const assets = new Set();

  for (const file of walk(OUT)) {
    const rel = toPosix(file);
    if (rel.endsWith(".html")) {
      pages.add(`/${rel.slice(0, -".html".length)}`);
    } else if (rel.endsWith(".body")) {
      assets.add(`/${rel.slice(0, -".body".length)}`);
    }
  }

  return { pages, assets };
}

/** Every internal href in a page, fragment and query stripped. */
function internalHrefs(html) {
  const out = new Set();
  for (const m of html.matchAll(/href="([^"]*)"/g)) {
    const raw = m[1];
    if (!raw.startsWith("/")) continue;
    if (EXTERNAL.test(raw) || INTERNAL_SKIP.test(raw)) continue;
    const clean = raw.split("#")[0].split("?")[0];
    if (clean === "") continue;
    out.add(clean);
  }
  return out;
}

function check(pagesByRoute, routes, fail) {
  let checked = 0;
  for (const [route, html] of pagesByRoute) {
    for (const href of internalHrefs(html)) {
      checked++;
      if (routes.pages.has(href) || routes.assets.has(href)) continue;
      // A trailing slash on an otherwise valid route is a redirect, not a
      // dead link, so it is resolved rather than reported.
      if (href.endsWith("/") && routes.pages.has(href.slice(0, -1))) continue;
      fail(`${route} links to ${href}, which was not prerendered`);
    }
  }
  return checked;
}

function readInputs() {
  const routes = prerendered();
  const pagesByRoute = [];
  for (const file of walk(OUT)) {
    if (!file.endsWith(".html")) continue;
    const rel = toPosix(file);
    pagesByRoute.push([
      `/${rel.slice(0, -".html".length)}`,
      readFileSync(file, "utf8"),
    ]);
  }
  return { routes, pagesByRoute };
}

function runCheck({ routes, pagesByRoute }) {
  const failures = [];
  const checked = check(pagesByRoute, routes, (m) => failures.push(m));
  return { failures, checked };
}

if (!existsSync(OUT)) {
  console.error(
    `FAIL .next/server/app does not exist. This check reads the built HTML, ` +
      `so it needs a completed build first: node scripts/build-check.mjs`
  );
  console.error("LINKS_NO_BUILD");
  process.exit(1);
}

if (process.argv.includes("--self-test")) {
  const base = readInputs();

  // Positive control: a href to a route that was never generated. Injected
  // into an in-memory copy of one page; nothing on disk is written.
  const DEAD = "/fr/this-route-does-not-exist";
  const mutated = {
    routes: base.routes,
    pagesByRoute: base.pagesByRoute.map(([route, html], i) =>
      i === 0 ? [route, `${html}<a href="${DEAD}">probe</a>`] : [route, html]
    ),
  };

  let ok = true;
  const caught = runCheck(mutated).failures.filter((f) => f.includes(DEAD));
  if (caught.length === 0) {
    console.error(`SELFTEST_FAIL undetected: planted dead href ${DEAD}`);
    ok = false;
  } else {
    console.log(`  caught: ${caught[0]}`);
  }

  // And the real build must already resolve cleanly, or the control could be
  // reporting a pre-existing dead link rather than the one it planted.
  const live = runCheck(base);
  if (live.failures.length > 0) {
    console.error(
      `SELFTEST_FAIL working tree already failing: ${live.failures[0]}`
    );
    ok = false;
  }

  if (!ok) process.exit(1);
  console.log("LINKS_SELFTEST_PASS");
  process.exit(0);
}

const inputs = readInputs();
const { failures, checked } = runCheck(inputs);

for (const f of failures) console.error(`FAIL ${f}`);
if (failures.length > 0) {
  console.error(`LINKS_FAILED (${failures.length})`);
  process.exit(1);
}

const distinct = new Set();
for (const [, html] of inputs.pagesByRoute) {
  for (const href of internalHrefs(html)) distinct.add(href);
}

console.log(
  `  ${inputs.pagesByRoute.length} pages scanned, ${inputs.routes.pages.size} prerendered routes`
);
console.log(
  `  ${distinct.size} distinct internal links checked (${checked} occurrences)`
);
console.log("LINKS_RESOLVE_OK");
