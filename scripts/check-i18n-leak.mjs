#!/usr/bin/env node
/**
 * Detects French copy hardcoded at English-rendering call sites.
 *
 * The leak this was written for: InlineRouteLink takes `lead` and `anchor` as
 * literal props. Its docstring assumed every target route was French-only, so
 * a French literal was safe -- the component would return null in English.
 * Two of those routes (softwareFleet, softwareRental) later gained English
 * slugs, which flipped hasRoute() to true in English and started rendering
 * French sentences mid-page on /en.
 *
 * So this checks the invariant that actually matters: a call site may only
 * pass a bare string literal for a locale-visible prop when the target route
 * does not exist in English. Otherwise the prop must be locale-aware.
 */

import { readFileSync, readdirSync, statSync, writeFileSync, unlinkSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const APP = join(ROOT, "app");

/** Props whose value reaches the DOM as visible text. */
const VISIBLE_PROPS = ["lead", "anchor"];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next") continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.tsx?$/.test(full)) out.push(full);
  }
  return out;
}

/** Route keys that have an `en` slug, read from the real manifest. */
function englishRouteKeys() {
  const src = readFileSync(join(ROOT, "lib", "routes.ts"), "utf8");
  const table = src.slice(src.indexOf("export const ROUTES"));
  const keys = new Set();
  // Each route block: `key: { ... slugs: { ... } ... },`
  const re = /(\w+):\s*\{[\s\S]*?slugs:\s*\{([\s\S]*?)\}/g;
  let m;
  while ((m = re.exec(table))) {
    if (/\ben\s*:/.test(m[2])) keys.add(m[1]);
  }
  return keys;
}

/**
 * Extract InlineRouteLink call sites with their routeKey and literal props.
 * Deliberately simple: these are hand-written JSX blocks, not generated code.
 */
function callSites(src, file) {
  const sites = [];
  const re = /<InlineRouteLink\b([\s\S]*?)\/>/g;
  let m;
  while ((m = re.exec(src))) {
    const body = m[1];
    const routeKey = body.match(/routeKey=["']([\w]+)["']/)?.[1];
    const literals = {};
    for (const prop of VISIBLE_PROPS) {
      // Only a bare string literal is a hazard. `lead={t("...")}` is fine.
      const lit = body.match(new RegExp(`${prop}=["']([^"']+)["']`));
      if (lit) literals[prop] = lit[1];
    }
    const line = src.slice(0, m.index).split("\n").length;
    sites.push({ file, line, routeKey, literals });
  }
  return sites;
}

function findLeaks(files) {
  const enKeys = englishRouteKeys();
  const leaks = [];
  for (const file of files) {
    const src = readFileSync(file, "utf8");
    for (const site of callSites(src, file)) {
      const props = Object.entries(site.literals);
      if (props.length === 0) continue;
      if (!enKeys.has(site.routeKey)) continue; // FR-only target: guard holds.
      for (const [prop, value] of props) {
        leaks.push({ ...site, prop, value });
      }
    }
  }
  return leaks;
}

const files = walk(APP);
const arg = process.argv[2];

if (arg === "--self-test") {
  // Positive control: plant a known leak, confirm the checker reports it,
  // then remove it. Without this, "0 leaks" could just mean a broken regex.
  const probe = join(APP, "__leak_probe.tsx");
  writeFileSync(
    probe,
    `export default function P() {\n  return (\n    <InlineRouteLink\n      locale={locale as Locale}\n      routeKey="softwareRental"\n      lead="Texte francais plante pour le test"\n      anchor="logiciel de test"\n    />\n  );\n}\n`,
    "utf8"
  );
  let caught = 0;
  try {
    caught = findLeaks(walk(APP)).filter((l) => l.file === probe).length;
  } finally {
    unlinkSync(probe);
  }
  if (caught >= 2) {
    console.log(`SELFTEST_PASS (planted leak detected: ${caught} props)`);
    process.exit(0);
  }
  console.error(`SELFTEST_FAIL (planted leak NOT detected; caught=${caught})`);
  process.exit(1);
}

if (arg === "--links") {
  // The fix must keep the English inbound links, not delete them.
  const enKeys = englishRouteKeys();
  let rendered = 0;
  for (const file of files) {
    for (const site of callSites(readFileSync(file, "utf8"), file)) {
      if (enKeys.has(site.routeKey)) rendered++;
    }
  }
  if (rendered >= 2) {
    console.log(`LINKS_OK (${rendered} English-visible inbound links present)`);
    process.exit(0);
  }
  console.error(`LINKS_MISSING (expected >=2 English-visible links, found ${rendered})`);
  process.exit(1);
}

const leaks = findLeaks(files);
if (leaks.length === 0) {
  console.log("I18N_LEAK_OK (no hardcoded literals at English-visible call sites)");
  process.exit(0);
}
for (const l of leaks) {
  console.error(
    `LEAK ${relative(ROOT, l.file)}:${l.line}  routeKey=${l.routeKey}  ${l.prop}="${l.value}"`
  );
}
console.error(`I18N_LEAK_FOUND (${leaks.length})`);
process.exit(1);
