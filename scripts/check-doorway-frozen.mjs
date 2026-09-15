#!/usr/bin/env node
/**
 * Freezes the four indexed fields of the two SEO doorway pages against
 * origin/main.
 *
 * /fr/logiciel-vgp and /fr/logiciel-gestion-parc-materiel exist to rank. Their
 * routeKey, h1, meta title and meta description are what a search engine has
 * already crawled and scored, so editing any of them is not a copy change --
 * it resets the page's history for a gain nobody measured. The rest of each
 * file is ordinary copy and stays freely editable; only these four are frozen.
 *
 * The baseline is origin/main rather than a checked-in snapshot, because a
 * snapshot is one more file that drifts. `git show` gives the committed bytes
 * directly, which also means this fails honestly when git is unavailable
 * rather than silently comparing a file against itself.
 *
 * Comparison is byte for byte on the decoded string value. Accents, the
 * narrow no-break space before French punctuation, and a curly versus straight
 * apostrophe are all real differences to a crawler, and all three are the kind
 * of edit an editor makes without noticing.
 *
 * Run with --self-test to prove the comparison can fail: it mutates each of
 * the four fields in an in-memory copy of the working-tree source and asserts
 * each mutation is rejected. A frozen-field gate that cannot detect a change
 * is decorative.
 */

import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

/** Paths as git knows them: forward slashes, relative to the repo root. */
const DOORWAYS = [
  "content/landing/fr/logiciel-vgp.ts",
  "content/landing/fr/logiciel-gestion-parc-materiel.ts",
];

const BASELINE_REF = "origin/main";

/** The indexed fields. Everything else in these files may change freely. */
const FROZEN_FIELDS = ["routeKey", "h1", "title", "description"];

/**
 * Read one top-level property of the `const page: LandingPage = {...}` literal.
 *
 * Two forms appear in these files, and both are normal Prettier output:
 *
 *   h1: "Logiciel de suivi VGP pour parcs de matériel",
 *   description:
 *     "Suivez les VGP de tout votre parc au même endroit. ...",
 *
 * so the newline after the property name is optional. Matching is anchored to
 * a two-space indent, which is the nesting depth of the page object's own
 * properties: without that anchor, `title:` inside a nested section item would
 * match first and the script would freeze the wrong string.
 *
 * The string body is read with an escape-aware pattern rather than a lazy
 * `[^"]*`, since these values contain escaped quotes and apostrophes. The
 * captured text is then unescaped, so the comparison runs on the value the
 * page actually renders rather than on its source spelling.
 */
function extractField(src, field) {
  const re = new RegExp(
    `^  ${field}:\\s*\\n?\\s*"((?:[^"\\\\]|\\\\.)*)"`,
    "m"
  );
  const m = src.match(re);
  if (!m) return null;
  return m[1]
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\n/g, "\n")
    .replace(/\\\\/g, "\\");
}

function fieldsOf(src) {
  const out = {};
  for (const field of FROZEN_FIELDS) out[field] = extractField(src, field);
  return out;
}

/**
 * The committed version of a file. Returns null with a reported reason when
 * git cannot answer, rather than letting a missing baseline read as a pass.
 */
function baselineSource(path, fail) {
  // No shell: the argument is a path from the list above, and going through
  // cmd.exe on Windows would both require escaping it and mangle the UTF-8
  // output these files depend on.
  const result = spawnSync("git", ["show", `${BASELINE_REF}:${path}`], {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });

  if (result.error) {
    fail(`git is not available: ${result.error.message}`);
    return null;
  }
  if (result.status !== 0) {
    const why = (result.stderr || "").trim().split("\n")[0] || "unknown error";
    fail(
      `cannot read ${BASELINE_REF}:${path} -- ${why}. ` +
        `Fetch the remote first: the baseline cannot be assumed.`
    );
    return null;
  }
  return result.stdout;
}

/**
 * Compare one file's frozen fields against a baseline source.
 *
 * Both sides are parsed with the same extractor, so a field this script cannot
 * parse fails loudly on both sides rather than comparing null to null and
 * passing. That case is checked explicitly below.
 */
function compare(path, baselineSrc, workingSrc, fail) {
  const before = fieldsOf(baselineSrc);
  const after = fieldsOf(workingSrc);

  for (const field of FROZEN_FIELDS) {
    if (before[field] === null) {
      fail(`${path}: cannot parse ${field} from ${BASELINE_REF}`);
      continue;
    }
    if (after[field] === null) {
      fail(
        `${path}: cannot parse ${field} from the working tree. ` +
          `The field was renamed, removed, or reformatted beyond recognition.`
      );
      continue;
    }
    if (before[field] !== after[field]) {
      fail(
        `${path}: ${field} changed\n` +
          `       ${BASELINE_REF}: ${JSON.stringify(before[field])}\n` +
          `       working tree:  ${JSON.stringify(after[field])}`
      );
    }
  }
}

function readInputs(fail) {
  const inputs = [];
  for (const path of DOORWAYS) {
    const baseline = baselineSource(path, fail);
    const working = readFileSync(join(ROOT, ...path.split("/")), "utf8");
    inputs.push({ path, baseline, working });
  }
  return inputs;
}

function failuresFor(inputs) {
  const out = [];
  const fail = (m) => out.push(m);
  for (const { path, baseline, working } of inputs) {
    if (baseline === null) continue; // already reported by readInputs
    compare(path, baseline, working, fail);
  }
  return out;
}

if (process.argv.includes("--self-test")) {
  const readFailures = [];
  const base = readInputs((m) => readFailures.push(m));
  if (readFailures.length > 0) {
    for (const f of readFailures) console.error(`FAIL ${f}`);
    console.error("SELFTEST_FAIL cannot read the baseline");
    process.exit(1);
  }

  // Positive controls: one per frozen field, mutated in the working-tree copy
  // held in memory. The files on disk are never written.
  const target = base[0];
  const cases = FROZEN_FIELDS.map((field) => ({
    name: `${field} edited on ${target.path}`,
    mutate: (inputs) => {
      const current = extractField(inputs[0].working, field);
      // Append rather than replace, so the mutation is a real byte difference
      // while the surrounding syntax stays valid and parseable.
      inputs[0].working = inputs[0].working.replace(
        `${field}:\n    "${current}"`,
        `${field}:\n    "${current} MUTATED"`
      ).replace(
        `${field}: "${current}"`,
        `${field}: "${current} MUTATED"`
      );
    },
  }));

  let ok = true;
  for (const c of cases) {
    const mutated = base.map((i) => ({ ...i }));
    c.mutate(mutated);
    if (mutated[0].working === target.working) {
      console.error(`SELFTEST_FAIL mutation did not apply: ${c.name}`);
      ok = false;
      continue;
    }
    if (failuresFor(mutated).length === 0) {
      console.error(`SELFTEST_FAIL undetected: ${c.name}`);
      ok = false;
    } else {
      console.log(`  caught: ${c.name}`);
    }
  }

  // The real tree must already agree with the baseline, or a control could be
  // reporting a pre-existing drift rather than the edit it planted.
  const live = failuresFor(base);
  if (live.length > 0) {
    console.error(`SELFTEST_FAIL working tree already failing: ${live[0]}`);
    ok = false;
  }

  if (!ok) process.exit(1);
  console.log(`DOORWAY_FROZEN_SELFTEST_PASS (${cases.length} controls caught)`);
  process.exit(0);
}

const readFailures = [];
const inputs = readInputs((m) => readFailures.push(m));
const failures = [...readFailures, ...failuresFor(inputs)];

for (const f of failures) console.error(`FAIL ${f}`);
if (failures.length > 0) {
  console.error(`DOORWAY_FROZEN_FAILED (${failures.length})`);
  process.exit(1);
}

for (const { path, working } of inputs) {
  const f = fieldsOf(working);
  console.log(`  ${path}`);
  console.log(`    routeKey    ${f.routeKey}`);
  console.log(`    h1          ${f.h1}`);
}
console.log(
  `  ${DOORWAYS.length * FROZEN_FIELDS.length} frozen fields match ${BASELINE_REF}`
);
console.log("DOORWAY_FROZEN_OK");
