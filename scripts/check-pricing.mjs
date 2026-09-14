#!/usr/bin/env node
/**
 * Guards the pricing card against the drift class that produced the 30-vs-15
 * trial discrepancy: a number published on the site that nothing keeps true.
 *
 * Two distinct hazards, because prices and copy live in different files.
 *
 * 1. Prices are hardcoded in pricing/page.tsx JSX, NOT in messages/*.json.
 *    Only the units (/an, /mois, ou) are translated. So a price edited on one
 *    card, or an annual figure that stops being 12x its monthly, is invisible
 *    to any i18n parity check. Checked here arithmetically, from source.
 *
 * 2. The annual term and the rate note ARE in messages/*.json and must exist
 *    in both locales. A key present in fr and missing in en renders a raw key
 *    path to an English visitor.
 *
 * The term is deliberately Professional-only: Starter gates VGP tracking
 * behind an upgrade, so a long term there parks a customer on the tier that
 * cannot deliver the product's point; Business and Enterprise route through a
 * demo, where the term is worth more conceded in conversation than printed.
 * If it ever appears on another card that is a pricing decision, so this fails
 * until EXPECTED_TERM_CARDS is updated to match.
 *
 * Run with --self-test to prove the checker can fail: it mutates an in-memory
 * copy of each input and asserts every rule rejects it.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PAGE = join(ROOT, "app", "[locale]", "pricing", "page.tsx");

/** Annual / monthly pairs as published, in card order. */
const EXPECTED_PLANS = [
  { name: "Starter", annual: 5880, monthly: 490 },
  { name: "Professional", annual: 14400, monthly: 1200 },
  { name: "Business", annual: 28800, monthly: 2400 },
];

/** Cards that should carry the longer annual term. */
const EXPECTED_TERM_CARDS = 1;

/** Prices render as `€14 400`, with a plain or non-breaking space. */
const priceNumbers = (src) =>
  [...src.matchAll(/€\s?([\d   ]{3,})/g)].map((m) =>
    Number(m[1].replace(/[^\d]/g, ""))
  );

/**
 * Counts term blocks by termTo, the "15" itself. termFrom and termUnit always
 * accompany it, so one key is enough to count cards without triple-counting.
 */
const termUses = (src) => [...src.matchAll(/t\(['"]billing\.termTo['"]\)/g)].length;
const noteUses = (src) => [...src.matchAll(/t\(['"]billing\.note['"]\)/g)].length;

/**
 * Every rule, as a pure function of its inputs, so the self-test can feed it
 * deliberately broken inputs without touching the working tree.
 */
function check({ page, messages }, fail) {
  const found = priceNumbers(page);

  for (const plan of EXPECTED_PLANS) {
    if (!found.includes(plan.annual)) {
      fail(`${plan.name}: annual €${plan.annual} not found on the page`);
      continue;
    }
    if (!found.includes(plan.monthly)) {
      fail(`${plan.name}: monthly €${plan.monthly} not found on the page`);
      continue;
    }
    if (plan.annual !== plan.monthly * 12) {
      fail(
        `${plan.name}: annual €${plan.annual} != 12 x €${plan.monthly} ` +
          `(= €${plan.monthly * 12}). One of the two was edited alone.`
      );
    }
  }

  for (const [locale, data] of Object.entries(messages)) {
    const billing = data?.pricing?.billing ?? {};
    for (const key of ["termFrom", "termTo", "termUnit", "note"]) {
      if (!billing[key] || !String(billing[key]).trim()) {
        fail(`messages/${locale}.json: pricing.billing.${key} missing or empty`);
      }
    }
  }

  const terms = termUses(page);
  if (terms !== EXPECTED_TERM_CARDS) {
    fail(
      `the annual term block rendered on ${terms} card(s), expected ${EXPECTED_TERM_CARDS}. ` +
        `Putting it on another tier is a pricing decision: update EXPECTED_TERM_CARDS.`
    );
  }

  const notes = noteUses(page);
  if (notes !== 1) {
    fail(`billing.note rendered ${notes} times, expected exactly 1 (below the grid)`);
  }
}

function readInputs() {
  return {
    page: readFileSync(PAGE, "utf8"),
    messages: {
      en: JSON.parse(readFileSync(join(ROOT, "messages", "en.json"), "utf8")),
      fr: JSON.parse(readFileSync(join(ROOT, "messages", "fr.json"), "utf8")),
    },
  };
}

/** Run `check` against inputs and return the failures it produced. */
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
      name: "annual price decoupled from monthly",
      mutate: (i) => {
        i.page = i.page.replace("€14 400", "€13 000");
      },
    },
    {
      name: "term key removed from fr",
      mutate: (i) => {
        delete i.messages.fr.pricing.billing.termTo;
      },
    },
    {
      name: "note key blanked in en",
      mutate: (i) => {
        i.messages.en.pricing.billing.note = "   ";
      },
    },
    {
      name: "term added to a second card",
      mutate: (i) => {
        i.page = i.page.replace(
          "{t('billing.termTo')}",
          "{t('billing.termTo')}{t('billing.termTo')}"
        );
      },
    },
  ];

  let ok = true;
  for (const c of cases) {
    const mutated = { page: base.page, messages: clone(base.messages) };
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

for (const p of EXPECTED_PLANS) {
  console.log(`  ${p.name.padEnd(13)} €${p.annual}/yr = 12 x €${p.monthly}/mo`);
}
console.log(`  term on ${EXPECTED_TERM_CARDS} card (Professional), note rendered once`);
console.log("PRICING_OK");
