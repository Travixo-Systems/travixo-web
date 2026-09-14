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
/**
 * Entities React emits for characters that are legal in text but special in
 * markup. Without decoding these, an assertion written the way the copy reads
 * ("Parc & identification", "Jusqu'à") is compared against "Parc &amp;
 * identification" and "Jusqu&#x27;à" and fails on correct output.
 *
 * This bit a hand-written probe before it bit this script: the failure mode is
 * a gate that passes only for strings containing no apostrophe or ampersand,
 * which in French copy is a small and shrinking subset.
 */
const ENTITIES = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#x27;": "'",
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
  "&#x2F;": "/",
};

function decodeEntities(s) {
  // &amp; last would double-decode "&amp;#x27;" into an apostrophe, so the
  // named and numeric forms are replaced in one pass instead.
  return s.replace(
    /&(?:amp|lt|gt|quot|apos|nbsp|#x27|#39|#x2F);/g,
    (m) => ENTITIES[m] ?? m
  );
}

function visible(src) {
  const body = src.replace(/<script[\s\S]*?<\/script>/g, "");
  return decodeEntities(body.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ");
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
    present: [
      "The whole asset lifecycle in one history",
      "Fleet & identification",
      "VGP & compliance",
      "Fleet examples",
      "See the detailed rate card",
      "You are not starting from scratch",
      "Rates subject to change",
    ],
    absent: [
      "Tout est inclus",
      "Inclus dans",
      "billing.note",
      "card.monthly",
      "examples.title",
      "included.title",
      "bareme.title",
      "groups",
      "differentiator.title",
      "onboarding.title",
      // The retired four-tier model, in either locale.
      "Most Popular",
      "VGP Included",
      "months of service",
      // The superseded h1, replaced by the one-subscription framing.
      "not on your headcount",
      // Deleted outright: the comparison table and the compliance CTA.
      "Why TraviXO",
      "Current methods",
      "Ready to secure your compliance",
      // Unverified claims under a site-wide ban.
      "2 to 4 weeks",
      "500 assets in 5 minutes",
      "500 codes in 30 seconds",
    ],
  },
  {
    file: join("fr", "pricing.html"),
    label: "FR pricing",
    present: [
      "Tout le cycle du matériel dans un même historique",
      "Parc & identification",
      "VGP & conformité",
      "Exemples de parc",
      "Voir le barème détaillé",
      "Vous ne repartez pas de zéro",
      "Tarifs susceptibles d",
    ],
    absent: [
      "Everything is included",
      "billing.note",
      "card.monthly",
      "examples.title",
      "included.title",
      "bareme.title",
      "groups",
      "differentiator.title",
      "onboarding.title",
      "Le plus choisi",
      "VGP incluse",
      "mois de service",
      // The superseded h1, replaced by the one-product framing.
      "pas du nombre d'utilisateurs",
      // Deleted outright: the comparison table and the compliance CTA.
      "Pourquoi TraviXO",
      "Méthodes actuelles",
      "Prêt à sécuriser votre conformité",
      // Unverified claims under a site-wide ban.
      "2 à 4 semaines",
      "500 matériels en 5 minutes",
      "500 codes en 30 secondes",
    ],
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

// The published figures must reach the rendered page, not just the message
// file. A t() call resolving to a raw key path still produces valid HTML, so
// source-level checks alone cannot catch it.
//
// The base rate and the top worked example are asserted per locale, in that
// locale's number formatting: FR groups thousands with a space, EN with a
// comma, and reading one page with the other's convention is the drift this
// catches.
for (const [label, file, needles] of [
  ["EN pricing", join("en", "pricing.html"), ["179", "1,399", "+1.55", "on quote"]],
  ["FR pricing", join("fr", "pricing.html"), ["179", "1 399", "+1,55", "sur devis"]],
]) {
  const src = html(file);
  if (!src) continue;
  const text = visible(src);
  for (const needle of needles) {
    if (!text.includes(needle)) {
      fail(`${label}: published figure "${needle}" is not in the rendered page`);
    }
  }
}

if (failed) process.exit(1);

console.log(`  ${CASES.length} page/locale combinations verified in built HTML`);
console.log("RENDERED_OK");
