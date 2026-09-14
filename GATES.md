# Gates: marketing site - single-product pricing revision

OWNS: app/[locale]/**, content/landing/**, messages/en.json, messages/fr.json,
scripts/check-*.mjs

Scope: replace the four-tier commercial model (Starter / Professional /
Business / Enterprise) with one product priced on billable asset count.
179 EUR HT per month including 100 assets, unlimited users, no commitment on
monthly billing. Annual is ten monthly payments, so two months free. Above 100
assets the rate tapers (1,55 / 1,20 / 0,80 per asset per month across three
bands) and above 2 000 assets pricing is on quote. FR is the source, EN mirrors
it.

This supersedes the previous ledger, which gated the 15-month Professional
annual term (commits 527f7c2 and 09eb7e2). That term is deleted here, so the
gates asserting it are not carried forward: G5 and G6 below replace their
earlier namesakes, and the old G12 ("do not deploy until billing grants 15
months") is void because the page no longer publishes a 15-month term. The
i18n-leak work from that ledger is untouched by this revision and its gates
still hold.

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
  PRICING_OK

- [x] G2: The pricing checker provably catches drift
  CHECK: node scripts/check-pricing.mjs --self-test
  EXPECT: PRICING_SELFTEST_PASS
  EVIDENCE: exit=0; output=caught: base monthly rate changed on the card |
  annual no longer 10x monthly | a worked example edited by hand | an example's
  annual decoupled from its monthly | included list extended with an unshipped
  feature | a retired tier price reappears in landing copy | retired popularity
  badge reappears on the page | PRICING_SELFTEST_PASS (7 controls caught)

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
  EVIDENCE: carried forward from the previous ledger; the trial copy is
  unchanged by this revision except for rewording within the same 30-day claim.
  Re-run before merge.

- [ ] G6: Production build compiles and prerenders every route
  CHECK: node scripts/build-check.mjs
  EXPECT: BUILD_OK
  EVIDENCE: pending. Not run in this session: requires RESEND_API_KEY, which
  is not available here. Must pass in CI or preview with the real environment
  before merge.

- [ ] G7: Rendered HTML carries the new pricing in each locale
  CHECK: node scripts/check-rendered.mjs
  EXPECT: RENDERED_OK
  EVIDENCE: pending, blocked by G6. The script's pricing cases were rewritten
  for this model (the 15-month term and struck-12 markup assertions are gone,
  replaced by per-locale assertions that 179 and the 2 000-asset example reach
  the rendered page in that locale's number formatting). Those new assertions
  have never executed against built HTML.

- [ ] G8: Stripe prices and checkout match the published model (app repo)
  EVIDENCE: pending, not gateable here.

- [ ] G9: Backend trial interval is 30 days (app repo)
  EVIDENCE: pending.

- [ ] G10: Site appears in search results
  EVIDENCE: pending.

- [ ] G11: Published speed claims are sourced
  EVIDENCE: pending.

ABANDON: G8 Stripe cannot be gated from this repository. The web repo contains
no Stripe code, no price IDs and no checkout: SIGNUP_URL is `${APP_URL}/signup`,
a plain outbound link. Confirmed by grep across the tree. The new price points
must exist as Stripe prices, and checkout must charge them, before this page
publishes them. Handoff: verify in the app repo, per the user's own merge gate.

ABANDON: G9 Backend trial interval cannot be gated from this repository. That
code lives in the app repo. The previous session recorded 30 days verified live
against the production database, but the user has since flagged trial
provisioning as needing a fix before merge, so this reopens as a handoff rather
than a settled item.

ABANDON: G10 Search visibility is not a property of this codebase. It depends
on external index state and elapsed time. No honest local oracle exists.

ABANDON: G11 Speed claims ("500 materiels en 5 minutes", "500 codes en 30
secondes", "Skip 2 to 4 weeks") cannot be measured from the marketing repo:
they describe product behaviour in the app repo, and the comparison-table row
also makes a claim about competitors. This revision does not touch, restate or
strengthen them; they sit in pricing.comparison.rows, above the new card, and
this PR neither endorses nor sources them. Handoff unchanged: time one real
fleet import and one 500-code generation against production, then source or
soften.
