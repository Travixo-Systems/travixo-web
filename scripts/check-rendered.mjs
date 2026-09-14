#!/usr/bin/env node
/**
 * Asserts the built HTML, not the source.
 *
 * Source-level checks miss the failures that actually reach a visitor: a
 * message key that resolves to a raw path, copy rendered into the wrong
 * locale's page, or a guard that stops suppressing a route it should hide.
 * Every assertion here reads .next/server/app, so it fails on what shipped.
 *
 * Requires a completed build (scripts/build-check.mjs).
 */

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = join(ROOT, ".next", "server", "app");

let failed = false;
const fail = (m) => {
  console.error(`FAIL ${m}`);
  failed = true;
};

function html(rel) {
  const p = join(OUT, rel);
  if (!existsSync(p)) {
    fail(`${rel} not built - run scripts/build-check.mjs first`);
    return null;
  }
  return readFileSync(p, "utf8");
}

/**
 * Rendered text only. The RSC flight payload embedded in each page carries
 * every message in the namespace, including copy for locales and routes the
 * page does not display, so searching raw HTML produces false positives.
 */
function visible(src) {
  const body = src.replace(/<script[\s\S]*?<\/script>/g, "");
  return body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
}

const CASES = [
  {
    file: "en.html",
    label: "EN home",
    present: ["How the chain builds up, scan by scan", "equipment rental software"],
    absent: ["Comment la chaine", "Comment la chaîne", "loueur de materiel", "loueur de matériel"],
  },
  {
    file: "fr.html",
    label: "FR home",
    present: [
      "Comment la chaîne se construit, scan par scan",
      "logiciel pour loueur de matériel",
      "logiciel de suivi VGP",
    ],
    absent: ["How the chain builds up"],
  },
  {
    file: join("en", "features.html"),
    label: "EN features",
    present: ["These features from the point of view of a construction fleet"],
    absent: ["Ces fonctions vues", "gestion de parc materiel", "gestion de parc matériel"],
  },
  {
    file: join("fr", "features.html"),
    label: "FR features",
    present: ["Ces fonctions vues du point de vue", "logiciel de gestion de parc matériel"],
    absent: ["These features from the point of view"],
  },
  {
    file: join("en", "pricing.html"),
    label: "EN pricing",
    present: ["15 months of service", "Rates subject to change"],
    absent: ["15 mois de service", "billing.term", "billing.note"],
  },
  {
    file: join("fr", "pricing.html"),
    label: "FR pricing",
    present: ["15 mois de service", "Tarifs susceptibles d"],
    absent: ["15 months of service", "billing.term", "billing.note"],
  },
];

for (const c of CASES) {
  const src = html(c.file);
  if (!src) continue;
  const text = visible(src);

  for (const needle of c.present) {
    if (!text.includes(needle)) fail(`${c.label}: missing "${needle}"`);
  }
  for (const needle of c.absent) {
    if (text.includes(needle)) fail(`${c.label}: should not contain "${needle}"`);
  }
}

// The French-only route must stay suppressed in English. Assert on the link
// itself, since the anchor text also lives in the flight payload.
const enHome = html("en.html");
if (enHome && /href="\/en\/logiciel-vgp/.test(enHome)) {
  fail("EN home links to /en/logiciel-vgp: the hasRoute guard stopped working");
}

// The term belongs to Professional alone.
const enPricing = html(join("en", "pricing.html"));
if (enPricing) {
  const hits = (visible(enPricing).match(/15 months of service/g) ?? []).length;
  if (hits !== 1) fail(`EN pricing renders the term ${hits} times, expected exactly 1`);
}

// The 12 must actually render struck through. Asserted on the markup rather
// than the text, because a bare "12" also occurs inside €1 200 and would pass
// a substring check while the strike-through silently disappeared.
for (const [label, file] of [
  ["EN pricing", join("en", "pricing.html")],
  ["FR pricing", join("fr", "pricing.html")],
]) {
  const src = html(file);
  if (!src) continue;
  if (!/line-through[^"]*"[^>]*>\s*12\s*</.test(src)) {
    fail(`${label}: the 12 is not rendered with line-through`);
  }
}

if (failed) process.exit(1);

console.log(`  ${CASES.length} page/locale combinations verified in built HTML`);
console.log("RENDERED_OK");
