# Gates: site-wide positioning rewrite

OWNS: messages/fr.json, messages/en.json, content/landing/**,
app/[locale]/page.tsx, app/[locale]/features/page.tsx,
app/[locale]/tableau-suivi-vgp-excel/page.tsx, scripts/check-i18n-parity.mjs,
scripts/check-banned-claims.mjs, scripts/check-doorway-frozen.mjs,
scripts/check-links.mjs, DECISIONS.md

Branch `feat/positioning-sitewide`, cut from `origin/main` at `a579ff4`.

Scope: re-position every marketing route on one spine, the chain from depot to
return, with VGP as one segment of it rather than the product's definition.
Copy and information architecture only. FR is the source of truth; EN is a
translation of the new FR, not of the old.

This ledger does not supersede the pricing ledger merged in PR #23. That work
shipped and its gates stay valid; `/tarifs` is explicitly out of scope here,
and G6 below asserts this branch did not touch it.

Shell: Git Bash (win32). CWD: D:/Dev/projects/travixo-web
Build needs RESEND_API_KEY set to any non-empty value: app/api/contact/route.ts
calls `new Resend(...)` at module scope, so page-data collection throws without
it. Pre-existing, unrelated to this change.

All evidence below was re-measured against the final tree at commit `cb3ff02`,
after the last copy edit and a full rebuild. Numbers are read from the run, not
carried forward from an earlier one.

- [x] G1: Production build compiles and prerenders every route
  CHECK: node scripts/build-check.mjs
  EXPECT: BUILD_OK
  EVIDENCE: exit=0; output=compiled, 43 static pages prerendered | BUILD_OK.
  Same page count as origin/main, so the restructure added and removed no
  routes, which is what a copy-only change should do.

- [x] G2: Typecheck and lint clean
  CHECK: npx tsc --noEmit -p tsconfig.json; npx eslint app content lib scripts
  EXPECT: tsc silent; eslint exit 0 with no new diagnostics
  EVIDENCE: tsc exit=0, no output. eslint exit=0, 2 warnings, 0 errors. Both
  warnings are pre-existing and neither file is in this branch's diff: `Link`
  unused at app/[locale]/about/page.tsx:5 and `_error` unused at
  app/[locale]/contact/ContactForm.tsx:58, both present verbatim in
  `git show origin/main:` for those paths. A third warning introduced during
  this work, an unused `platform` import in check-doorway-frozen.mjs, was
  fixed rather than accepted.

- [x] G3: FR and EN key sets are identical, no orphans, no missing keys
  CHECK: node scripts/check-i18n-parity.mjs
  EXPECT: I18N_PARITY_OK
  EVIDENCE: exit=0; output=575 leaf keys, identical in fr and en |
  I18N_PARITY_OK. Self-test exit=0, 5 controls caught: a key added to fr only,
  a key deleted from en, an array shortened in one locale, a value blanked to
  empty string, a string replaced by an object. The real tree is asserted clean
  inside the same run, so a control cannot pass by catching a pre-existing
  failure.

- [x] G4: No banned claim survives anywhere in user-facing copy
  CHECK: node scripts/check-banned-claims.mjs
  EXPECT: BANNED_CLAIMS_OK
  EVIDENCE: exit=0; output=11 banned phrases and 29 competitor names swept |
  10 content files, 2 message files | 32 allowlisted time figures seen and
  deliberately kept | BANNED_CLAIMS_OK. Self-test exit=0, 4 controls caught: a
  retired speed claim returning to a message file, a compliance-fear CTA
  returning, a competitor named in a landing file, and a newly invented speed
  claim. The self-test also asserts the allowlisted "sous 24 heures" is NOT
  reported, so the allowlist is proved to permit rather than to blind.

  The 32 keeps are declared individually with a reason each, rather than left
  as a silent exclusion: the 30-day trial length, the 24-hour response
  commitment the business makes about itself, the VGP reminder cadences, the
  statutory periodicities transcribed from the arretes, and the legal periods
  in the terms and privacy namespaces. Declaring them is what stops a new
  unsourced figure hiding among legitimate ones.

- [x] G5: Rendered HTML carries the new positioning in each locale
  CHECK: node scripts/check-rendered.mjs
  EXPECT: RENDERED_OK
  EVIDENCE: exit=0; output=6 page/locale combinations verified in built HTML |
  RENDERED_OK. Reads .next/server/app, so it asserts what shipped rather than
  what the source says. No assertion in this script needed editing: DECISIONS.md
  D-16 records why the four inlineLinks strings survived the reposition
  unchanged, which made the allowance under D-7 unnecessary.

- [x] G6: /tarifs is untouched by this branch
  CHECK: git diff origin/main -- app/[locale]/pricing/page.tsx scripts/check-pricing.mjs
  CHECK: node scripts/check-pricing.mjs; node scripts/check-pricing.mjs --self-test
  EXPECT: empty diff; PRICING_OK; PRICING_SELFTEST_PASS
  EVIDENCE: both diffs empty. check-pricing exit=0, PRICING_OK, with the grid
  recomputed: 179/mo base, 1790/yr = 10x monthly, and 100/250/500/1000/2000
  assets each equal to the published example. Self-test exit=0, 9 controls
  caught.

  The empty page diff alone would not have been sufficient, because the pricing
  namespace shares a file with the copy this branch rewrites. Asserted
  independently: `pricing`, `privacy`, `terms`, `legalNotice`, `contact`,
  `footer` and `navigation` are byte-identical to origin/main in both locales,
  compared as parsed JSON subtrees rather than as line diffs.

- [x] G7: The two SEO doorways keep URL, h1, meta title and meta description byte-identical
  CHECK: node scripts/check-doorway-frozen.mjs
  EXPECT: DOORWAY_FROZEN_OK
  EVIDENCE: exit=0; output=8 frozen fields match origin/main |
  DOORWAY_FROZEN_OK. Self-test exit=0, 4 controls caught, one per frozen field.
  Confirmed a second time by an independent probe written separately from the
  committed script, so the result does not depend on that script being correct:
  routeKey, title, description and h1 all IDENTICAL on both files.

- [x] G8: No design-system change
  CHECK: git diff --stat origin/main -- app/[locale]/globals.css app/[locale]/components/
  EXPECT: empty
  EVIDENCE: both empty. The one layout-adjacent change is the homepage values
  block moving from three cards to four, which is a count of content rather
  than a design decision; `md:grid-cols-4` was already used twice in this
  codebase, so no new idiom was introduced. Recorded as DECISIONS.md D-14.

- [x] G9: No URL, slug, canonical or redirect change
  CHECK: git diff origin/main -- lib/routes.ts lib/seo.ts middleware.ts app/sitemap.ts app/robots.ts
  EXPECT: empty
  EVIDENCE: all five empty.

- [x] G10: Every internal link resolves
  CHECK: node scripts/check-links.mjs
  EXPECT: LINKS_RESOLVE_OK
  EVIDENCE: exit=0; output=33 pages scanned, 33 prerendered routes | 34
  distinct internal links checked (507 occurrences) | LINKS_RESOLVE_OK.
  Self-test exit=0: a planted href to a route that was never prerendered is
  reported. Next.js metadata routes (favicon, robots.txt, sitemap.xml,
  llms.txt) emit as .body rather than .html and are collected as a separate
  resolvable set, without which every page's icon link would read as dead.

- [x] G11: The i18n leak fix still holds
  CHECK: node scripts/check-i18n-leak.mjs; --links; --self-test
  EXPECT: I18N_LEAK_OK; LINKS_OK; SELFTEST_PASS
  EVIDENCE: exit=0 for all three. I18N_LEAK_OK (no hardcoded literals at
  English-visible call sites), LINKS_OK (2 English-visible inbound links
  present), SELFTEST_PASS (planted leak detected: 2 props). All new copy goes
  through messages or content modules; no locale-visible literal was added at
  a call site.

- [x] G12: Trial-length copy still agrees across locales
  CHECK: node scripts/check-trial-claims.mjs
  EXPECT: both locales agreeing on one length
  EVIDENCE: exit=0; output=Advertised trial length: 30 days (both locales
  agree) | TRIAL_CLAIMS_2_2. Re-run rather than inherited, because this branch
  edited CTA and badge copy carrying the trial length.

- [x] G13: Every page is explainable from the spine
  CHECK: read h1, the h2 flow and the closing heading of all 13 routes from
  the built HTML
  EXPECT: each page's sequence maps onto PARC / LOCATION / CONFORMITE / PREUVE
  EVIDENCE: SPINE_TRACE_COMPLETE, 13 routes, every one readable. Manual gate:
  no command can decide whether copy means what the spine says, so the trace
  produces the evidence and the judgement is recorded here.

  `/` FR opens "Le materiel part chez le client. La preuve doit partir avec
  lui." and its h2 flow runs Parc, Location, Conformite, Preuve before the
  supporting sections, closing on "Le materiel part. La preuve part avec lui."
  EN mirrors it exactly. The four stages are named in chain order and the
  closing line restates the opening, so the page is one argument rather than a
  list of capabilities.

  `/fonctionnalites` runs Parc et identification, Locations et mouvements,
  Conformite et preuve, then the shipped-capability sections, closing on "Voir
  la chaine sur votre propre parc". The band names three slots for four
  families because conformite and preuve are two halves of one claim; the full
  four are enumerated on the homepage where the chain is introduced (D-15).

  `/logiciel-loueur-materiel` opens on the spine sentence itself ("La
  conformite est un probleme de garde, pas de calendrier") and walks the chain:
  le parc, la location, la conformite, la preuve, each named in its heading.

  The two doorways keep their keyword h1 and resolve upward. `/logiciel-vgp`
  answers the regulation first (what a VGP is, the three periodicity bands, who
  may perform one) and reaches "La VGP est un segment de la chaine, pas le
  produit entier" before the pricing block. `/logiciel-gestion-parc-materiel`
  gains the movements section it lacked, so the parc is shown becoming the
  chain rather than sitting as an inventory.

  `/about`, `/vgp` and `/tableau-suivi-vgp-excel` align without restructuring.
  The tracker's closing section already argued the spine before this branch
  touched it: a spreadsheet does not alert anyone, does not carry the reports,
  and does not know where the machine is when the deadline falls.

- [x] G14: No regulatory claim without a logged source
  CHECK: trace every sentence asserting a legal obligation to a primary-text
  row in content/reference/vgp-reglementation.md or a Legifrance URL in
  DECISIONS.md
  EXPECT: every claim traced, untraceable claims deleted
  EVIDENCE: manual. Four sources logged (DECISIONS.md S-1 through S-4), three
  of them Legifrance article permalinks confirmed in force as of 15/09/2026.

  Two claims were narrowed rather than kept. Article 15-II was stated as
  applying to rented machinery generally; it governs appareils de levage
  d'occasion donnes en location, so both rental pages and the tracker page now
  say so (D-10, D-13). The R.4323-24 "personne qualifiee" point kept its hedge:
  no accreditation is required by that article, but certain equipment
  categories carry their own requirements, so it is published as the general
  rule rather than a universal one (D-11).

  One claim was added because the source supports it and it was missing: art.
  15-II also places a duty on the using establishment's head to confirm the
  inspections were carried out, which is the honest reason a loueur benefits
  from producing the document pack on demand.

  The editorial rule in content/reference/vgp-reglementation.md is respected
  throughout: only rows marked "Verifie texte primaire" are published, and
  compressors and generators are never presented as VGP-levage equipment. Both
  fleet pages now say explicitly that they are tracked without a levage
  periodicity being applied, which the landing copy had not previously stated.

ABANDON: G-nav The hardcoded French nav CTA is reported, not fixed.
`app/[locale]/components/navigation.tsx:111` and `:188` render
`currentLocale === 'fr' ? 'Essai Gratuit' : t('startPilot')`, bypassing a
`navigation.startPilot` key that already holds "Tester gratuitement". Two
instructions meet here and point opposite ways: "no hardcoded strings in JSX"
says fix it, "components frozen" says do not open the file. The freeze is
explicit and this is a label inconsistency rather than a positioning claim, so
it was not worth breaking a stated constraint for. Same for the two hardcoded
French labels at Footer.tsx:52-53. Both are one-line changes, recorded as a
handoff in DECISIONS.md D-12 and in the PR body.
