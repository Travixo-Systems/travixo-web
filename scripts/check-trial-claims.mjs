#!/usr/bin/env node
/**
 * Counts trial-LENGTH claims in the marketing copy, per locale.
 *
 * The site contains many unrelated "30"s -- QR generation speed, VGP reminder
 * cadence (D-30/D-15/D-7/D-1), the GDPR response window, and the post-
 * termination data-export window. A naive grep for "30" reports ~16 per locale
 * and badly overstates the exposure. Only the four strings matched here are
 * promises about how long the free trial lasts.
 *
 * This gate pins the current state so that changing the advertised trial
 * length is a deliberate, reviewed edit rather than a silent drift.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

/** Patterns that are specifically claims about trial DURATION. */
const TRIAL_CLAIM = {
  en: [/(\d+)-day trial/g, /tested for (\d+) days/g, /free for (\d+) days/g],
  fr: [/(\d+) jours d'essai/g, /Essai de (\d+) jours/g, /gratuitement pendant (\d+) jours/g],
};

const results = {};
let bad = false;

for (const locale of ["en", "fr"]) {
  const src = readFileSync(join(ROOT, "messages", `${locale}.json`), "utf8");
  const hits = [];
  for (const re of TRIAL_CLAIM[locale]) {
    for (const m of src.matchAll(re)) hits.push({ text: m[0], days: Number(m[1]) });
  }
  results[locale] = hits;

  const lengths = new Set(hits.map((h) => h.days));
  if (lengths.size > 1) {
    console.error(`INCONSISTENT ${locale}: mixed trial lengths ${[...lengths].join(", ")}`);
    bad = true;
  }
}

const enDays = new Set(results.en.map((h) => h.days));
const frDays = new Set(results.fr.map((h) => h.days));
if ([...enDays].join() !== [...frDays].join()) {
  console.error(`LOCALE_MISMATCH en=${[...enDays]} fr=${[...frDays]}`);
  bad = true;
}

for (const locale of ["en", "fr"]) {
  console.log(`${locale}: ${results[locale].length} trial-length claims`);
  for (const h of results[locale]) console.log(`   "${h.text}"`);
}

if (bad) process.exit(1);

const advertised = [...enDays][0];
console.log(`Advertised trial length: ${advertised} days (both locales agree)`);
console.log(`TRIAL_CLAIMS_${results.en.length}_${results.fr.length}`);
