# Gates: marketing site - single-product pricing revision

OWNS: app/[locale]/**, content/landing/**, messages/en.json, messages/fr.json,
scripts/check-*.mjs

Scope: replace the four-tier commercial model (Starter / Professional /
Business / Enterprise) with one subscription priced on billable asset count.
179 EUR HT per month covering up to 100 assets, unlimited users, no commitment
on monthly billing. Annual is ten monthly payments, so two months free. Above
100 assets the rate tapers (1,55 / 1,20 / 0,80 per asset per month across three
bands) and above 2 000 assets pricing is on quote. FR is the source, EN mirrors
it.

The page order is hero, card, fleet examples with the rate card, the
differentiator, onboarding, FAQ, final CTA. The 2 000 row is not a worked
example; it is "sur devis" in the rate card. The card carries a promise line
and four capability groups covering the same audited scope as the flat fifteen
inclusions they replaced.

Prices are quoted without a bare "HT" suffix. The business is under the
franchise en base, so "TVA non applicable, art. 293 B du CGI" appears in the
legal line under the grid, on the worked examples, in the pricing meta
description and on the landing pages that quote a price. terms.section16
previously stated the opposite in both locales (prices hors taxes, VAT added at
checkout and applied by country of residence) and was rewritten to match. The
invoice template is not in this repository and needs the same mention app-side,
where it is a legal requirement rather than a preference.

This supersedes the previous ledger, which gated the 15-month Professional
annual term (commits 527f7c2 and 09eb7e2, merged in #22). That term is deleted
here, so the gates asserting it are not carried forward: the old ledger's
pricing gates are replaced by G1 and G2 below, and its final gate ("do not
deploy until billing grants 15 months on an annual Professional subscription")
is void, because the page no longer publishes a 15-month term at all. The
i18n-leak work from that ledger is untouched by this revision, and G9 below
re-runs its checks to confirm they still hold after both locales were
rewritten.

Shell: Git Bash (win32). CWD: d:/Dev/projects/travixo-web
Build needs RESEND_API_KEY set to any non-empty value: app/api/contact/route.ts
calls `new Resend(...)` at module scope, so page-data collection throws without
it. Pre-existing, unrelated to this change.

- [x] G1: Published figures match the graduated grid, both locales
  CHECK: node scripts/check-pricing.mjs
  EXPECT: PRICING_OK
  EVIDENCE: exit=0; output=base 179 EUR/mo, 100 assets included | annual 1790
  EUR/yr = 10 x monthly | 100=179/1790 250=411.5/4115 500=799/7990
  1000=1399/13990 2000=2199/21990, each equal to the grid computation |
  PRICING_OK. The 2 000 row is asserted arithmetically although the page does
  not publish it as a worked example, so a band edited without its examples
  fails even for the unpublished row.

- [x] G2: The pricing checker provably catches drift
  CHECK: node scripts/check-pricing.mjs --self-test
  EXPECT: PRICING_SELFTEST_PASS
  EVIDENCE: exit=0; output=caught: base monthly rate changed on the card |
  annual no longer 10x monthly | a worked example edited by hand | an example's
  annual decoupled from its monthly | included list extended with an unshipped
  feature | a published example silently dropped | a fifth capability group
  added | an unshipped feature named inside a group | a retired tier price
  reappears in landing copy | retired popularity badge reappears on the page |
  PRICING_SELFTEST_PASS (9 controls caught)

- [x] G3: No retired price survives on any pricing surface, either locale
  CHECK: grep -rnE "490 ?€|€ ?490|1,?200 ?€|2,?400 ?€|5,? ?880|14,? ?400|28,? ?800" messages/ content/landing/ app/[locale]/pricing/page.tsx app/[locale]/layout.tsx
  EXPECT: no matches
  EVIDENCE: exit=1 (no matches); the same sweep for retired wording (Most
  Popular, Le plus choisi, VGP Included, VGP incluse, Everything in, Tout le
  contenu de, months of service, mois de service) also returns no matches.

- [x] G4: Typecheck and lint clean
  CHECK: npx tsc --noEmit -p tsconfig.json; npx eslint app/[locale]/pricing/page.tsx app/[locale]/layout.tsx scripts/check-pricing.mjs scripts/check-rendered.mjs
  EXPECT: both silent
  EVIDENCE: exit=0 for both, no diagnostics emitted.

- [x] G5: Trial-length copy stays 30 days and agrees across locales
  CHECK: node scripts/check-trial-claims.mjs
  EXPECT: TRIAL_CLAIMS_4_3
  EVIDENCE: exit=0; output=Advertised trial length: 30 days (both locales
  agree) | TRIAL_CLAIMS_4_3. Re-run after the FAQ and CTA copy were rewritten
  in both locales, not carried forward from the previous ledger. Note this
  gates only that the site says 30 days consistently; whether provisioning
  delivers 30 days is G11, and it is open.

- [x] G6: Production build compiles and prerenders every route
  CHECK: node scripts/build-check.mjs
  EXPECT: BUILD_OK
  EVIDENCE: exit=0; output=compiled, 43 static pages prerendered | BUILD_OK.
  Run with RESEND_API_KEY supplied as an environment variable only; the key is
  not stored in this repository.

- [x] G7: Rendered HTML carries the new pricing in each locale
  CHECK: node scripts/check-rendered.mjs
  EXPECT: RENDERED_OK
  EVIDENCE: exit=0; output=6 page/locale combinations verified in built HTML |
  RENDERED_OK. The pricing cases assert the current headings (the capability
  groups title, two group titles, the fleet examples heading, the disclosure's
  own summary text and the onboarding block), plus the base rate, the
  1 000-asset example, a band rate and the quote label, each in that locale's
  number formatting. The rate-card heading is sr-only, so the summary text is
  asserted instead of it. The cases also assert the absence of the deleted
  comparison table, the deleted compliance CTA, and the three banned speed
  claims.

  Defect found and fixed in this gate: visible() stripped tags without decoding
  entities, so an assertion written the way the copy reads ("Parc &
  identification") was compared against "Parc &amp; identification" and failed
  on correct output. This is the caveat recorded under G8 last round, found
  living in the committed script rather than an ad-hoc probe. visible() now
  decodes entities, so the gate is correct for every apostrophe and ampersand
  rather than for the strings that happen to contain neither.

- [x] G8: Built HTML independently inspected, not only self-certified
  CHECK: read .next/server/app/{fr,en}/pricing.html, strip scripts and tags,
  assert published figures present and retired ones absent
  EXPECT: every new figure present, every retired figure and badge absent
  EVIDENCE: FR carries the one-subscription h1, 179 EUR, 1 790 EUR / an, the
  promise line, "Tout le cycle du materiel dans un meme historique", all four
  capability group titles, "Utilisateurs illimites", "Exemples de parc", the
  four worked figures as "179 EUR / mois" through "1 399 EUR / mois", the
  growth line, "Voir le bareme detaille", +1,55, +0,80, "sur devis", the
  differentiator, "Vous ne repartez pas de zero", the first FAQ question and
  the new final CTA. EN carries the mirrored strings in its own number
  formatting. 56 present and 31 absent checks across the two locales, zero
  problems.

  Neither page contains 5 880, 14 400, 28 800, 490, 1 200, 2 199, "formule",
  "Tout est inclus", "Everything is included", "Un seul TraviXO", "Le plus
  choisi", "Most Popular", "VGP incluse", "VGP Included", "mois de service",
  "months of service", either superseded h1, the deleted comparison table
  ("Pourquoi TraviXO", "Methodes actuelles"), the deleted compliance CTA, or
  the three banned speed claims. A separate sweep confirms no "HT", "hors
  taxes", "excl. VAT" or "exclusive of tax" survives on either pricing page.

  Read directly from the build output rather than through check-rendered.mjs,
  so this does not depend on that script being correct. The probe decodes HTML
  entities before comparing: an earlier version did not, and wrongly reported
  "Jusqu'a 100 materiels" missing because React escapes the apostrophe to
  &#x27;. Any future run must decode, or it will silently mishandle every
  apostrophe and ampersand in the French copy.

- [x] G9: The i18n leak fix still holds after both locales were rewritten
  CHECK: node scripts/check-i18n-leak.mjs; node scripts/check-i18n-leak.mjs --links
  EXPECT: I18N_LEAK_OK; LINKS_OK
  EVIDENCE: exit=0 for both; output=I18N_LEAK_OK (no hardcoded literals at
  English-visible call sites) | LINKS_OK (2 English-visible inbound links
  present).

- [ ] G10: Stripe prices and checkout match the published model (app repo)
  EVIDENCE: pending, not gateable here.

- [ ] G11: Backend trial interval is 30 days (app repo)
  EVIDENCE: pending.

- [ ] G12: Site appears in search results
  EVIDENCE: pending.

- [x] G13: No unverified speed or volume claim is published
  CHECK: sweep messages/*.json for duration and volume promises, both locales
  EXPECT: only the deliberate keeps
  EVIDENCE: twelve strings per locale rewritten. "500 materiels en 5 minutes",
  "500 codes en 30 secondes", "2 a 4 semaines de ressaisie" and the "500 codes
  et plus" bulk-PDF line are gone from the homepage and the features page; the
  pricing page's four went with the comparison table. Three further claims of
  the same class were found by reading the structure rather than by pattern and
  removed on the same basis: homepage.values.3 promising same-day tracking
  against "d'autres projets prennent des semaines" (the FR phrasing "le jour
  meme" escaped the first sweep), homepage.useCases.excel.body promising import
  "en 10 minutes", and features.differentiators.deploy promising tracking
  "quelques heures apres l'inscription".

  A widened sweep (any digit followed by a time unit, plus same-day, within
  hours, take weeks and the banned figures) returns one hit per locale, and it
  is a deliberate keep: contact.form.successMessage, "sous 24 heures", which is
  a response commitment the business makes about itself rather than a product
  performance claim. Also kept deliberately: "en un clic" on QR generation and
  inspection reports, which describes an interaction rather than a duration and
  is verifiable from the UI.

  This closes the handoff recorded here in the previous ledger, by removing the
  claims rather than sourcing them. Sourcing remains open as a separate option:
  if a real fleet import and a 500-code generation are ever timed against
  production, the claims can be restated with evidence behind them.

ABANDON: G10 Stripe cannot be gated from this repository. The web repo contains
no Stripe code, no price IDs and no checkout: SIGNUP_URL is `${APP_URL}/signup`,
a plain outbound link. Confirmed by grep across the tree. The new price points
must exist as Stripe prices, and checkout must charge them, before this page
publishes them. Handoff: verify in the app repo, per the user's own merge gate.

ABANDON: G11 Backend trial interval cannot be gated from this repository. That
code lives in the app repo. The previous session recorded 30 days verified live
against the production database, but the user has since flagged trial
provisioning as needing a fix before merge, so this reopens as a handoff rather
than a settled item.

ABANDON: G12 Search visibility is not a property of this codebase. It depends
on external index state and elapsed time. No honest local oracle exists.

RESOLVED: G13 was abandoned in the previous ledger on the grounds that the
speed claims could not be measured from the marketing repo. They have now been
removed instead, which is a decision this repo can make and verify on its own.
The copy states sequence rather than duration: tracking starts when the file is
imported, with no deployment project first. That is a property of the product,
not a measurement nobody has taken.
