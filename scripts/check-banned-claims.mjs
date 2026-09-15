#!/usr/bin/env node
/**
 * Sweeps every source of user-facing copy for claims the site is not allowed
 * to make.
 *
 * Three bans, for three different reasons:
 *
 * 1. Retired performance claims. "2 a 4 semaines", "500 materiels en 5
 *    minutes", "500 codes en 30 secondes" were published without a measurement
 *    behind them and were removed site-wide. Removal from the pages that
 *    carried them is not the same as removal from the site: the same sentence
 *    can return through a landing file, a metadata description, or the other
 *    locale, none of which the original edit touched.
 *
 * 2. Compliance-fear CTAs. "Securiser votre conformite", "avant le prochain
 *    controle" sell by implying the reader is exposed. That framing was
 *    dropped deliberately, and it is the kind of line that comes back because
 *    it converts.
 *
 * 3. Competitor names. Naming a competitor in marketing copy is a legal and
 *    positioning decision, not a copy decision, so it does not belong in a
 *    file anyone edits casually.
 *
 * On top of the fixed strings there is a heuristic pass for unsourced speed
 * claims: any digit immediately followed by a unit of time in a rendered
 * value. That pattern is what every retired claim above had in common, and it
 * is the only way to catch the next one before it is written down here.
 *
 * The heuristic necessarily hits legitimate copy -- the trial length, the
 * contact-form response commitment, VGP reminder cadences, statutory
 * periodicities, and the contractual periods in the terms. Those are declared
 * in ALLOWLIST below, each with the reason it is a deliberate keep, and each
 * scoped as narrowly as the copy allows. The count of allowlisted hits is
 * printed on success so the list cannot quietly grow into a blanket.
 *
 * Run with --self-test to prove the sweep can fail: it plants a banned phrase,
 * a competitor name, and a newly invented speed claim in in-memory copies, and
 * asserts each is caught while a known allowlisted string is not.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, relative, sep } from "node:path";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

const LOCALES = ["fr", "en"];

/** Retired claims and fear-based CTAs, in both locales, matched verbatim. */
const BANNED_PHRASES = [
  // Unverified onboarding duration.
  "2 à 4 semaines",
  "2 to 4 weeks",
  "2 a 4 semaines",
  // Unverified import and generation speeds.
  "500 matériels en 5 minutes",
  "500 assets in 5 minutes",
  "500 codes en 30 secondes",
  "500 codes in 30 seconds",
  // Compliance-fear CTAs.
  "sécuriser votre conformité",
  "secure your compliance",
  "avant le prochain contrôle",
  "before the next inspection",
];

/** Competitors. Naming one is a positioning decision, not a copy edit. */
const COMPETITORS = [
  "ShareMat",
  "Loxam",
  "Kiloutou",
  "Hilti",
  "Trackunit",
  "MachineMax",
  "Organilog",
  "Codial",
  "LoKisi",
  "Sphinx Manager",
  "Unipresta",
  "Rentman",
  "Locasyst",
  "Praxedo",
  "Tracktor",
  "Hector Asset Manager",
  "Optim'BTP",
  "Fleezy",
  "SETINUP",
  "myB2O",
  "Substock",
  "Trafman",
  "QRTick",
  "Pro VGP",
  "VGPManager",
  "Octav",
  "MemoryFlow",
  "Prevatis",
  "Ealico",
];

/**
 * A digit followed by a unit of time. Deliberately broad: its job is to
 * surface figures for review, not to be right about which are claims.
 *
 * "mois" and "ans" are included because statutory periodicities and
 * contractual terms are exactly where an unsourced figure would hide most
 * comfortably, next to figures that are genuinely sourced.
 */
const TIME_FIGURE =
  /\d+\s*(?:min\b|mins\b|minutes?\b|sec\b|secs\b|secondes?\b|seconds?\b|heures?\b|hours?\b|jours?\b|days?\b|semaines?\b|weeks?\b|mois\b|months?\b|ans?\b|years?\b)/gi;

/**
 * Ages, which the pattern above cannot distinguish from durations: "18 ans"
 * and "2 ans" are the same shape, and only the surrounding words say which is
 * a period and which is a person's age.
 *
 * These are matched on the phrase rather than the figure, so raising the age
 * of consent from 16 would not silently inherit the exemption.
 */
const AGE_PHRASES = [
  "moins de 16 ans",
  "au moins 18 ans",
  "18 years old",
  "16 years",
];

const isAge = (value, hit) =>
  AGE_PHRASES.some((p) => value.includes(p) && p.includes(hit));

/**
 * Deliberate keeps. Each entry declares the exact string, why it stays, and
 * where it is allowed to appear.
 *
 * `paths` restricts an entry to message key paths matching a prefix or regex.
 * An entry with no `paths` is allowed anywhere, which is reserved for strings
 * whose meaning does not change with location. Scoping is preferred: the trial
 * length is a claim wherever it appears and is gated separately, but a
 * fourteen-day withdrawal period is only legitimate inside the legal pages.
 */
const LEGAL_NAMESPACES = /^(terms|privacy|legalNotice)\./;

const ALLOWLIST = [
  {
    match: ["30 jours", "30 days", "30-day"],
    reason:
      "advertised trial duration, gated separately by check-trial-claims.mjs",
    paths: /^(metadata|homepage|pricing)\./,
  },
  {
    match: ["24 heures", "24 hours"],
    reason:
      "contact-form response commitment the business makes about itself, not a product performance claim",
    paths: /^contact\./,
  },
  {
    match: [
      "J-30",
      "J-15",
      "J-14",
      "J-7",
      "J-1",
      "D-30",
      "D-15",
      "D-14",
      "D-7",
      "D-1",
      "30, 15, 7, and 1 day",
    ],
    reason: "VGP reminder cadence, a product behaviour rather than a speed claim",
    paths: /^features\./,
  },
  {
    match: ["10 jours", "10 days"],
    reason: "scenario illustration in the vgpExpiring example, not a speed claim",
    paths: /^homepage\.exceptions\.vgpExpiring\./,
  },
  {
    match: [
      "14 jours",
      "14 days",
      "14-day",
      "7 jours",
      "7 days",
      "30 jours",
      "30 days",
      "2 ans",
      "2 years",
      "12 mois",
      "12 months",
    ],
    reason: "legal or contractual period stated in the terms and privacy pages",
    paths: LEGAL_NAMESPACES,
  },
  {
    match: [
      "3 mois",
      "6 mois",
      "12 mois",
      "douze mois",
      "six mois",
      "trois mois",
      "3 months",
      "6 months",
      "12 months",
    ],
    reason:
      "VGP statutory periodicity, transcribed from the arretes in content/reference",
  },
  {
    match: ["2 mois", "2 months"],
    reason:
      "annual plan offers two months, asserted arithmetically by check-pricing.mjs (annual = 10x monthly)",
    paths: /^pricing\.card\.annualBadge$/,
  },
];

/**
 * Whether a hit at a given path is a declared keep.
 *
 * A hit matches an allowlist string either exactly, or as a fragment of a
 * longer declared phrase. The second case exists because the heuristic matches
 * the shortest thing that looks like a figure: in "Email reminders at 30, 15,
 * 7, and 1 day before due" it reports "1 day", which no exact-match entry can
 * cover without also permitting a bare "1 day" anywhere in the namespace.
 *
 * Both forms still require the declared phrase to be present in the value, so
 * permitting the cadence does not permit an unrelated figure that happens to
 * share its tail.
 */
function allowedBy(hit, path, value) {
  const needle = hit.toLowerCase();
  for (const entry of ALLOWLIST) {
    const matched = entry.match.some((s) => {
      const declared = s.toLowerCase();
      if (declared === needle) return true;
      // A fragment of a longer declared phrase, and that phrase is really here.
      return declared.includes(needle) && value.toLowerCase().includes(declared);
    });
    if (!matched) continue;
    if (entry.paths && !entry.paths.test(path)) continue;
    return entry;
  }
  return null;
}

/** Every string leaf of a message tree, with its dot-notated key path. */
function stringLeaves(node, path, out) {
  if (Array.isArray(node)) {
    node.forEach((v, i) =>
      stringLeaves(v, path ? `${path}.${i}` : String(i), out)
    );
    return out;
  }
  if (node !== null && typeof node === "object") {
    for (const key of Object.keys(node)) {
      stringLeaves(node[key], path ? `${path}.${key}` : key, out);
    }
    return out;
  }
  if (typeof node === "string") out.push([path, node]);
  return out;
}

function walkTs(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walkTs(full, out);
    else if (full.endsWith(".ts")) out.push(full);
  }
  return out;
}

/**
 * The count of allowlisted hits seen, returned alongside failures so a
 * successful run can print it. An allowlist nobody looks at is a blanket.
 */
function check({ messages, files }, fail) {
  let allowed = 0;

  for (const locale of LOCALES) {
    for (const [path, value] of stringLeaves(messages[locale], "", [])) {
      const where = `messages/${locale}.json ${path}`;

      for (const phrase of BANNED_PHRASES) {
        if (value.includes(phrase)) {
          fail(`${where}: banned claim "${phrase}"`);
        }
      }
      for (const name of COMPETITORS) {
        if (value.includes(name)) {
          fail(`${where}: names competitor "${name}"`);
        }
      }
      for (const m of value.matchAll(TIME_FIGURE)) {
        const hit = m[0].trim();
        if (isAge(value, hit)) continue;
        const entry = allowedBy(hit, path, value);
        if (entry) {
          allowed++;
          continue;
        }
        fail(
          `${where}: unsourced figure "${hit}" in ${JSON.stringify(
            value.length > 90 ? `${value.slice(0, 90)}...` : value
          )}`
        );
      }
    }
  }

  // The .ts content files carry copy too, but as source rather than data, so
  // hits are reported as file:line. The heuristic is not applied to them:
  // content/vgp transcribes statutory periodicities by the hundred, and every
  // one of them is sourced in content/reference. The fixed bans still apply.
  for (const [label, src] of Object.entries(files)) {
    const lines = src.split(/\r?\n/);
    lines.forEach((line, i) => {
      for (const phrase of BANNED_PHRASES) {
        if (line.includes(phrase)) {
          fail(`${label}:${i + 1}: banned claim "${phrase}"`);
        }
      }
      for (const name of COMPETITORS) {
        if (line.includes(name)) {
          fail(`${label}:${i + 1}: names competitor "${name}"`);
        }
      }
    });
  }

  return allowed;
}

function readInputs() {
  const messages = {};
  for (const locale of LOCALES) {
    messages[locale] = JSON.parse(
      readFileSync(join(ROOT, "messages", `${locale}.json`), "utf8")
    );
  }

  const files = {};
  for (const path of [
    ...walkTs(join(ROOT, "content", "landing")),
    ...walkTs(join(ROOT, "content", "vgp")),
  ]) {
    files[relative(ROOT, path).split(sep).join("/")] = readFileSync(path, "utf8");
  }

  return { messages, files };
}

function runCheck(inputs) {
  const failures = [];
  const allowed = check(inputs, (m) => failures.push(m));
  return { failures, allowed };
}

const clone = (o) => JSON.parse(JSON.stringify(o));

if (process.argv.includes("--self-test")) {
  const base = readInputs();
  const cases = [
    {
      name: "a retired speed claim returns to a message file",
      mutate: (i) => {
        i.messages.fr.homepage.hero.subtitle =
          "Mise en route en 2 à 4 semaines, sans interruption.";
      },
    },
    {
      name: "a compliance-fear CTA returns",
      mutate: (i) => {
        i.messages.en.pricing.cta.start = "Ready to secure your compliance";
      },
    },
    {
      name: "a competitor is named in a landing file",
      mutate: (i) => {
        i.files["content/landing/fr/logiciel-vgp.ts"] +=
          "\n// comparaison avec Kiloutou\n";
      },
    },
    {
      name: "a newly invented speed claim appears",
      mutate: (i) => {
        i.messages.fr.features.differentiators.import.description =
          "500 matériels en 3 minutes, sans ressaisie.";
      },
    },
  ];

  let ok = true;
  for (const c of cases) {
    const mutated = { messages: clone(base.messages), files: { ...base.files } };
    c.mutate(mutated);
    if (runCheck(mutated).failures.length === 0) {
      console.error(`SELFTEST_FAIL undetected: ${c.name}`);
      ok = false;
    } else {
      console.log(`  caught: ${c.name}`);
    }
  }

  // Negative control. A declared keep must NOT be reported, or the allowlist
  // is not doing its job and the real run would be noise.
  const keep = { messages: clone(base.messages), files: { ...base.files } };
  keep.messages.fr.contact.form.successMessage =
    "Nous revenons vers vous sous 24 heures.";
  const keepHits = runCheck(keep).failures.filter((f) =>
    f.includes("24 heures")
  );
  if (keepHits.length > 0) {
    console.error(`SELFTEST_FAIL allowlisted string was reported: ${keepHits[0]}`);
    ok = false;
  } else {
    console.log('  not reported (correct): allowlisted "sous 24 heures"');
  }

  // And the real tree must be clean, or a control could be catching a
  // pre-existing failure rather than the defect it planted.
  const live = runCheck(base);
  if (live.failures.length > 0) {
    console.error(
      `SELFTEST_FAIL working tree already failing: ${live.failures[0]}`
    );
    ok = false;
  }

  if (!ok) process.exit(1);
  console.log(`BANNED_CLAIMS_SELFTEST_PASS (${cases.length} controls caught)`);
  process.exit(0);
}

const inputs = readInputs();
const { failures, allowed } = runCheck(inputs);

for (const f of failures) console.error(`FAIL ${f}`);
if (failures.length > 0) {
  console.error(`BANNED_CLAIMS_FAILED (${failures.length})`);
  process.exit(1);
}

console.log(
  `  ${BANNED_PHRASES.length} banned phrases and ${COMPETITORS.length} competitor names swept`
);
console.log(
  `  ${Object.keys(inputs.files).length} content files, ${LOCALES.length} message files`
);
console.log(`  ${allowed} allowlisted time figures seen and deliberately kept`);
console.log("BANNED_CLAIMS_OK");
