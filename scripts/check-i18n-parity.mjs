#!/usr/bin/env node
/**
 * Asserts messages/fr.json and messages/en.json describe the same tree.
 *
 * next-intl resolves a missing key by falling back to the key path itself, so
 * a key that exists in one locale and not the other does not crash the build
 * and does not crash the page. It renders the literal string
 * "pricing.faq.questions.3.answer" to a visitor, in the middle of otherwise
 * correct copy. That is the failure class this catches, and it is invisible to
 * every source-level check that reads only one locale.
 *
 * Four rules, because four distinct edits produce that same outcome:
 *
 * 1. A key present in one locale and absent from the other. The common cause
 *    is copy added to fr.json during French-first authoring and never carried
 *    across.
 * 2. A type mismatch at the same path. A path that is a string in one locale
 *    and an object in the other means one of the two call sites is reading
 *    something it cannot render.
 * 3. An array length mismatch. Arrays here are rendered lists -- FAQ entries,
 *    pricing examples, trust badges -- so a shorter array in one locale is a
 *    silently shorter list on that locale's page, not an error.
 * 4. An empty or whitespace-only value, in either locale. A blank string
 *    renders as nothing at all, which reads as a layout bug rather than as
 *    missing copy, so it tends to survive review.
 *
 * Run with --self-test to prove the checker can fail: it plants each defect in
 * an in-memory clone and asserts the corresponding rule rejects it. The real
 * files are never written to.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

const LOCALES = ["fr", "en"];

/**
 * Every leaf path in a tree, dot-notated, with its value and type.
 *
 * Arrays are indexed rather than treated as opaque values, so a per-entry
 * difference reports the entry that differs ("pricing.faq.questions.3.answer")
 * rather than the whole list. `kind` distinguishes array from object, which
 * JavaScript's typeof does not.
 */
function leaves(node, path, out) {
  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) {
      leaves(node[i], path ? `${path}.${i}` : String(i), out);
    }
    return out;
  }
  if (node !== null && typeof node === "object") {
    for (const key of Object.keys(node)) {
      leaves(node[key], path ? `${path}.${key}` : key, out);
    }
    return out;
  }
  out.set(path, node);
  return out;
}

/**
 * Container paths and their shape, so a type or length mismatch is reported at
 * the container rather than as a storm of differing leaf paths beneath it.
 */
function containers(node, path, out) {
  if (Array.isArray(node)) {
    out.set(path, { kind: "array", length: node.length });
    for (let i = 0; i < node.length; i++) {
      containers(node[i], path ? `${path}.${i}` : String(i), out);
    }
    return out;
  }
  if (node !== null && typeof node === "object") {
    out.set(path, { kind: "object", length: Object.keys(node).length });
    for (const key of Object.keys(node)) {
      containers(node[key], path ? `${path}.${key}` : key, out);
    }
    return out;
  }
  out.set(path, { kind: typeof node, length: null });
  return out;
}

function check(messages, fail) {
  const [a, b] = LOCALES;
  const leafA = leaves(messages[a], "", new Map());
  const leafB = leaves(messages[b], "", new Map());
  const shapeA = containers(messages[a], "", new Map());
  const shapeB = containers(messages[b], "", new Map());

  // 1. Presence, both directions. Reported against the locale that lacks it,
  //    which is the file that has to be edited.
  for (const path of leafA.keys()) {
    if (!leafB.has(path) && !shapeB.has(path)) {
      fail(`messages/${b}.json: missing key "${path}" (present in ${a})`);
    }
  }
  for (const path of leafB.keys()) {
    if (!leafA.has(path) && !shapeA.has(path)) {
      fail(`messages/${a}.json: missing key "${path}" (present in ${b})`);
    }
  }

  // 2 and 3. Shape at shared paths: a string facing an object, or two arrays
  //    of different length.
  for (const [path, shape] of shapeA) {
    const other = shapeB.get(path);
    if (!other) continue;
    if (shape.kind !== other.kind) {
      fail(
        `type mismatch at "${path}": ${a} has ${shape.kind}, ${b} has ${other.kind}`
      );
      continue;
    }
    if (shape.kind === "array" && shape.length !== other.length) {
      fail(
        `array length mismatch at "${path}": ${a} has ${shape.length} ` +
          `entr${shape.length === 1 ? "y" : "ies"}, ${b} has ${other.length}. ` +
          `One locale renders a shorter list.`
      );
    }
  }

  // 4. Blank values, in either locale. Checked on strings only: a numeric or
  //    boolean leaf has no empty form.
  for (const locale of LOCALES) {
    const all = locale === a ? leafA : leafB;
    for (const [path, value] of all) {
      if (typeof value === "string" && value.trim() === "") {
        fail(`messages/${locale}.json: empty value at "${path}"`);
      }
    }
  }

  return leafA.size;
}

function readInputs() {
  const messages = {};
  for (const locale of LOCALES) {
    messages[locale] = JSON.parse(
      readFileSync(join(ROOT, "messages", `${locale}.json`), "utf8")
    );
  }
  return messages;
}

function failuresFor(messages) {
  const out = [];
  check(messages, (m) => out.push(m));
  return out;
}

const clone = (o) => JSON.parse(JSON.stringify(o));

if (process.argv.includes("--self-test")) {
  // Positive controls. Each mutation happens on a clone; the files on disk are
  // only ever read. A control that goes undetected means the matching rule
  // above is decorative, and its silence on the real tree means nothing.
  const base = readInputs();
  const cases = [
    {
      name: "a key added to fr only",
      mutate: (m) => {
        m.fr.pricing.faq.orphanKey = "Texte present uniquement en francais";
      },
    },
    {
      name: "a key deleted from en",
      mutate: (m) => {
        delete m.en.pricing.cta.start;
      },
    },
    {
      name: "an array shortened in one locale",
      mutate: (m) => {
        m.en.pricing.faq.questions.pop();
      },
    },
    {
      name: "a value blanked to empty string",
      mutate: (m) => {
        m.fr.homepage.finalCta.badges[1] = "";
      },
    },
    {
      name: "a string replaced by an object",
      mutate: (m) => {
        m.en.pricing.cta.start = { text: "Try for 30 days" };
      },
    },
  ];

  let ok = true;
  for (const c of cases) {
    const mutated = clone(base);
    c.mutate(mutated);
    if (failuresFor(mutated).length === 0) {
      console.error(`SELFTEST_FAIL undetected: ${c.name}`);
      ok = false;
    } else {
      console.log(`  caught: ${c.name}`);
    }
  }

  // And the real tree must be clean, or a control could be "catching" a
  // pre-existing failure rather than the defect it planted.
  const live = failuresFor(base);
  if (live.length > 0) {
    console.error(`SELFTEST_FAIL working tree already failing: ${live[0]}`);
    ok = false;
  }

  if (!ok) process.exit(1);
  console.log(`I18N_PARITY_SELFTEST_PASS (${cases.length} controls caught)`);
  process.exit(0);
}

const messages = readInputs();
const failures = [];
const total = check(messages, (m) => failures.push(m));

for (const f of failures) console.error(`FAIL ${f}`);
if (failures.length > 0) {
  console.error(`I18N_PARITY_FAILED (${failures.length})`);
  process.exit(1);
}

console.log(`  ${total} leaf keys, identical in ${LOCALES.join(" and ")}`);
console.log("I18N_PARITY_OK");
