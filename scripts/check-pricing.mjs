#!/usr/bin/env node
/**
 * Guards the published pricing against the drift class that produced the
 * 30-vs-15 trial discrepancy: a number published on the site that nothing
 * keeps true.
 *
 * The four-tier grid is gone, and with it the two assumptions the previous
 * version of this script enforced: that every annual figure was 12x its
 * monthly, and that exactly one card carried a longer service term. Both were
 * properties of a commercial model that no longer exists, so asserting them
 * now would fail the correct tree.
 *
 * What replaces them is arithmetic the new model actually claims:
 *
 * 1. The base rate is 179 EUR HT per month, 100 assets included.
 * 2. Above 100 assets a graduated rate applies, and every worked example on
 *    the page must equal what that grid computes. An example edited by hand,
 *    or a band rate changed without its examples, fails here.
 * 3. Annual is exactly 10x monthly (two months offered), on the base rate and
 *    on every example alike.
 *
 * Prices now live in messages/*.json rather than hardcoded in the page JSX,
 * so this reads them from the same place the page does.
 *
 * Run with --self-test to prove the checker can fail: it mutates an in-memory
 * copy of each input and asserts every rule rejects it.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

/** Base rate, in euros HT per month, and the assets it includes. */
const BASE_MONTHLY = 179;
const BASE_ASSETS = 100;

/** Annual is two months offered: ten monthly payments, not twelve. */
const ANNUAL_MULTIPLIER = 10;

/**
 * The graduated bands above BASE_ASSETS, as published. `upTo` is inclusive.
 * Kept here rather than parsed from copy: this is the model the copy is
 * checked against, so it has to be stated independently of it.
 */
const BANDS = [
  { upTo: 500, rate: 1.55 },
  { upTo: 1000, rate: 1.2 },
  { upTo: 2000, rate: 0.8 },
];

/**
 * Every worked example the page shows, as (assets, monthly, annual).
 *
 * The arithmetic is asserted for all five regardless of which the page
 * prints: a rate band changed without its examples must fail even for a row
 * that is currently unpublished. Presence is checked per locale below.
 */
const EXPECTED_EXAMPLES = [
  { assets: 100, monthly: 179, annual: 1790 },
  { assets: 250, monthly: 411.5, annual: 4115 },
  { assets: 500, monthly: 799, annual: 7990 },
  { assets: 1000, monthly: 1399, annual: 13990 },
  { assets: 2000, monthly: 2199, annual: 21990 },
];

/** Figures from the retired four-tier model. None may reappear anywhere. */
const RETIRED_FIGURES = [490, 1200, 2400, 5880, 14400, 28800];

/**
 * Wording from the retired model, in either locale.
 *
 * Checked against the pricing namespace and the landing copy, NOT against the
 * whole message file. "Developpe a la demande" also labels unbuilt features on
 * the features page, where it is a shipping-status claim rather than a pricing
 * one: banning it outright there would quietly promote unshipped features to
 * shipped, which is the opposite of what this script exists to prevent.
 */
const RETIRED_WORDING = [
  "Most Popular",
  "Le plus choisi",
  "VGP Included",
  "VGP incluse",
  "Everything in",
  "Tout le contenu de",
  "built on demand",
  "Built on demand",
  "Développé à la demande",
  "mois de service",
  "months of service",
];

/**
 * The monthly rate the published grid computes for a given asset count.
 * Marginal, not flat: each band applies only to the assets that fall inside
 * it, which is what "+1,55 par materiel" means on the page.
 */
function computeMonthly(assets) {
  let total = BASE_MONTHLY;
  let counted = BASE_ASSETS;
  for (const band of BANDS) {
    if (assets <= counted) break;
    const inBand = Math.min(assets, band.upTo) - counted;
    total += inBand * band.rate;
    counted += inBand;
  }
  return Math.round(total * 100) / 100;
}

/**
 * Euro figures appearing in a string, as numbers. Both locales' conventions,
 * because the same rule runs over fr.json and en.json:
 *
 *   FR  "1 790 €" -> 1790     (space thousands, comma decimal)
 *   FR  "411,50 €" -> 411.5
 *   EN  "1,790 € / yr" -> 1790  (comma thousands, dot decimal)
 *   EN  "411.50 € / mo" -> 411.5
 *
 * A comma is a thousands separator only when followed by exactly three digits
 * that are not themselves followed by another digit; otherwise it is a decimal
 * comma. Reading EN "1,790" as 1.79 is exactly the failure this disambiguates.
 */
const euroFigures = (s) =>
  [...s.matchAll(/([\d][\d  .,]*)\s*€/g)].map((m) => {
    const cleaned = m[1]
      .replace(/[  ]/g, "")
      .replace(/,(\d{3})(?!\d)/g, "$1")
      .replace(",", ".");
    return Number(cleaned);
  });

function check({ messages, page, landing }, fail) {
  for (const [locale, data] of Object.entries(messages)) {
    const pricing = data?.pricing;
    if (!pricing) {
      fail(`messages/${locale}.json: pricing namespace missing`);
      continue;
    }

    // 1. The base rate, as published on the card.
    const cardMonthly = euroFigures(String(pricing.card?.monthly ?? ""));
    if (!cardMonthly.includes(BASE_MONTHLY)) {
      fail(
        `messages/${locale}.json: card.monthly is "${pricing.card?.monthly}", ` +
          `expected the base rate of ${BASE_MONTHLY} EUR`
      );
    }

    // 2. Annual is 10x monthly, stated on the card itself.
    const cardAnnual = euroFigures(String(pricing.card?.annual ?? ""));
    const expectedAnnual = BASE_MONTHLY * ANNUAL_MULTIPLIER;
    if (!cardAnnual.includes(expectedAnnual)) {
      fail(
        `messages/${locale}.json: card.annual is "${pricing.card?.annual}", ` +
          `expected ${expectedAnnual} (= ${BASE_MONTHLY} x ${ANNUAL_MULTIPLIER})`
      );
    }

    // 3. Every worked example matches the grid, monthly and annual alike.
    // Four published examples; 2 000 is routed to the rate card as "sur
    // devis" rather than shown as a worked figure, in both locales.
    const items = pricing.examples?.items ?? [];
    if (items.length !== 4) {
      fail(
        `messages/${locale}.json: ${items.length} pricing example(s), expected 4`
      );
    }
    for (const expected of EXPECTED_EXAMPLES) {
      const computed = computeMonthly(expected.assets);
      if (computed !== expected.monthly) {
        fail(
          `the published grid computes ${computed} EUR/mo for ${expected.assets} ` +
            `assets, but the example claims ${expected.monthly}. ` +
            `A band rate and its examples have gone out of step.`
        );
      }
      if (expected.monthly * ANNUAL_MULTIPLIER !== expected.annual) {
        fail(
          `${expected.assets} assets: annual ${expected.annual} != ` +
            `${ANNUAL_MULTIPLIER} x ${expected.monthly} ` +
            `(= ${expected.monthly * ANNUAL_MULTIPLIER})`
        );
      }

      const row = items.find((i) =>
        euroFigures(String(i.monthly ?? "")).includes(expected.monthly)
      );
      if (!row) {
        // 2 000 is deliberately unpublished as a worked example: it sits in
        // the rate card as "sur devis". Its arithmetic is still asserted
        // above, so a band edited without it still fails.
        if (expected.assets <= 1000) {
          fail(
            `messages/${locale}.json: no example showing ${expected.monthly} EUR/mo ` +
              `for ${expected.assets} assets`
          );
        }
        continue;
      }
      // A row carries an annual figure only where the locale publishes one.
      // FR shows monthly-only examples and states the annual on the card;
      // EN still pairs both. Assert the annual only where it is published,
      // rather than demanding a figure the page deliberately omits.
      if (row.annual !== undefined) {
        if (!euroFigures(String(row.annual)).includes(expected.annual)) {
          fail(
            `messages/${locale}.json: example at ${expected.monthly} EUR/mo shows ` +
              `annual "${row.annual}", expected ${expected.annual}`
          );
        }
      }
    }

    // 4. The included list is audit-verified and closed.
    //
    //    Seven grouped lines covering the same audited scope as the flat
    //    fifteen they replaced: nothing unshipped was folded in. Anything
    //    added here is a claim about shipped functionality, so a longer list
    //    fails until reviewed. The point is to stop unshipped features
    //    (inspection edit/delete, weekly report, periodicity autofill) being
    //    quietly promoted onto the pricing page.
    const includedCount = (pricing.included?.items ?? []).length;
    if (includedCount !== 7) {
      fail(
        `messages/${locale}.json: included list has ${includedCount} entries, ` +
          `expected 7. Extending it is a product claim.`
      );
    }
  }

  // 5. No figure or wording from the retired four-tier model survives, in
  //    messages or in the page and landing copy.
  const sources = { page, ...landing };
  for (const [locale, data] of Object.entries(messages)) {
    // The pricing namespace only: see RETIRED_WORDING above.
    sources[`messages/${locale}.json (pricing)`] = JSON.stringify(data?.pricing ?? {});
  }
  for (const [where, src] of Object.entries(sources)) {
    for (const figure of RETIRED_FIGURES) {
      const spaced = String(figure).replace(/\B(?=(\d{3})+(?!\d))/g, "[  ]?");
      if (new RegExp(`${spaced}\\s*€|€\\s*${spaced}`).test(src)) {
        fail(`${where}: retired price ${figure} EUR still present`);
      }
    }
    for (const phrase of RETIRED_WORDING) {
      if (src.includes(phrase)) {
        fail(`${where}: retired wording "${phrase}" still present`);
      }
    }
  }
}

function readInputs() {
  const landingFiles = {
    "content/landing/fr/logiciel-vgp.ts": join(ROOT, "content", "landing", "fr", "logiciel-vgp.ts"),
    "content/landing/fr/logiciel-loueur-materiel.ts": join(ROOT, "content", "landing", "fr", "logiciel-loueur-materiel.ts"),
    "content/landing/fr/logiciel-gestion-parc-materiel.ts": join(ROOT, "content", "landing", "fr", "logiciel-gestion-parc-materiel.ts"),
    "content/landing/en/equipment-fleet-management-software.ts": join(ROOT, "content", "landing", "en", "equipment-fleet-management-software.ts"),
    "content/landing/en/equipment-rental-software.ts": join(ROOT, "content", "landing", "en", "equipment-rental-software.ts"),
  };
  const landing = {};
  for (const [label, path] of Object.entries(landingFiles)) {
    landing[label] = readFileSync(path, "utf8");
  }
  return {
    page: readFileSync(join(ROOT, "app", "[locale]", "pricing", "page.tsx"), "utf8"),
    messages: {
      en: JSON.parse(readFileSync(join(ROOT, "messages", "en.json"), "utf8")),
      fr: JSON.parse(readFileSync(join(ROOT, "messages", "fr.json"), "utf8")),
    },
    landing,
  };
}

function failuresFor(inputs) {
  const out = [];
  check(inputs, (m) => out.push(m));
  return out;
}

const clone = (o) => JSON.parse(JSON.stringify(o));

if (process.argv.includes("--self-test")) {
  // Positive controls. Each mutation must be caught, or the corresponding
  // rule is decorative and its "pass" in the real run means nothing.
  const base = readInputs();
  const cases = [
    {
      name: "base monthly rate changed on the card",
      mutate: (i) => {
        i.messages.fr.pricing.card.monthly = "199 € HT";
      },
    },
    {
      name: "annual no longer 10x monthly",
      mutate: (i) => {
        i.messages.fr.pricing.card.annual = "2 148 € HT";
      },
    },
    {
      name: "a worked example edited by hand",
      mutate: (i) => {
        i.messages.fr.pricing.examples.items[2].monthly = "850 € / mois";
      },
    },
    {
      name: "an example's annual decoupled from its monthly",
      mutate: (i) => {
        i.messages.fr.pricing.examples.items[1].annual = "4 500 € / an";
      },
    },
    {
      name: "included list extended with an unshipped feature",
      mutate: (i) => {
        i.messages.fr.pricing.included.items.push("Rapport hebdomadaire");
      },
    },
    {
      name: "a published example silently dropped",
      mutate: (i) => {
        i.messages.fr.pricing.examples.items.splice(1, 1);
      },
    },
    {
      name: "a retired tier price reappears in landing copy",
      mutate: (i) => {
        i.landing["content/landing/fr/logiciel-vgp.ts"] += "\n// 490 €/mois\n";
      },
    },
    {
      name: "retired popularity badge reappears on the page",
      mutate: (i) => {
        i.page += "\n// Most Popular\n";
      },
    },
  ];

  let ok = true;
  for (const c of cases) {
    const mutated = {
      page: base.page,
      messages: clone(base.messages),
      landing: { ...base.landing },
    };
    c.mutate(mutated);
    const caught = failuresFor(mutated).length;
    if (caught === 0) {
      console.error(`SELFTEST_FAIL undetected: ${c.name}`);
      ok = false;
    } else {
      console.log(`  caught: ${c.name}`);
    }
  }

  // And the real tree must still be clean, or the controls prove nothing.
  const live = failuresFor(base);
  if (live.length > 0) {
    console.error(`SELFTEST_FAIL working tree already failing: ${live[0]}`);
    ok = false;
  }

  if (!ok) process.exit(1);
  console.log(`PRICING_SELFTEST_PASS (${cases.length} controls caught)`);
  process.exit(0);
}

const failures = failuresFor(readInputs());
for (const f of failures) console.error(`FAIL ${f}`);
if (failures.length > 0) process.exit(1);

console.log(`  base           ${BASE_MONTHLY} EUR/mo, ${BASE_ASSETS} assets included`);
console.log(`  annual         ${BASE_MONTHLY * ANNUAL_MULTIPLIER} EUR/yr = ${ANNUAL_MULTIPLIER} x monthly`);
for (const e of EXPECTED_EXAMPLES) {
  console.log(
    `  ${String(e.assets).padStart(5)} assets  ${String(e.monthly).padStart(8)} EUR/mo  ` +
      `${String(e.annual).padStart(6)} EUR/yr  (grid: ${computeMonthly(e.assets)})`
  );
}
console.log("PRICING_OK");
