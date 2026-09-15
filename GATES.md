# Gates: site-wide positioning rewrite

OWNS: messages/fr.json, messages/en.json, content/landing/**,
app/[locale]/page.tsx, app/[locale]/features/page.tsx,
scripts/check-rendered.mjs, DECISIONS.md

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

- [ ] G1: Production build compiles and prerenders every route
  CHECK: node scripts/build-check.mjs
  EXPECT: BUILD_OK
  EVIDENCE: pending

- [ ] G2: Typecheck and lint clean
  CHECK: npx tsc --noEmit -p tsconfig.json && npx eslint app content lib scripts
  EXPECT: both silent, exit 0
  EVIDENCE: pending

- [ ] G3: FR and EN key sets are identical, no orphans, no missing keys
  CHECK: node scripts/check-i18n-parity.mjs
  EXPECT: I18N_PARITY_OK
  EVIDENCE: pending. Script is written by this branch; it must also pass its
  own --self-test, which plants a key in one locale only and asserts the
  checker reports it. Parity alone is not enough: a gate that cannot fail
  proves nothing.

- [ ] G4: No banned claim survives anywhere in user-facing copy
  CHECK: node scripts/check-banned-claims.mjs
  EXPECT: BANNED_CLAIMS_OK
  EVIDENCE: pending. Covers the named strings, competitor names, any digit
  followed by a time unit presented as a performance figure, and any
  compliance-fear CTA. Deliberate keeps (the 24-hour response commitment, the
  30-day trial length, VGP reminder cadences D-30/D-15/D-7/D-1, legal
  retention periods) are enumerated in the script with a reason each, so a new
  unsourced figure cannot hide among them. Must pass --self-test.

- [ ] G5: Rendered HTML carries the new positioning in each locale
  CHECK: node scripts/check-rendered.mjs
  EXPECT: RENDERED_OK
  EVIDENCE: pending. Reads .next/server/app, so it asserts what shipped rather
  than what the source says. Existing pricing cases are carried forward
  unchanged; see DECISIONS.md D-7 for why the inlineLinks assertions move.

- [ ] G6: /tarifs is untouched by this branch
  CHECK: git diff origin/main -- app/[locale]/pricing/page.tsx scripts/check-pricing.mjs
  CHECK: node scripts/check-pricing.mjs && node scripts/check-pricing.mjs --self-test
  EXPECT: empty diff; PRICING_OK; PRICING_SELFTEST_PASS
  EVIDENCE: pending. The pricing namespace shares a file with the copy this
  branch rewrites, so an empty page diff is not sufficient on its own: the
  pricing checker re-run proves the namespace inside messages/*.json is still
  arithmetically correct after both locales were edited around it.

- [ ] G7: The two SEO doorways keep URL, h1, meta title and meta description byte-identical
  CHECK: node scripts/check-doorway-frozen.mjs
  EXPECT: DOORWAY_FROZEN_OK
  EVIDENCE: pending. Compares routeKey, h1, title and description against
  `git show origin/main:<file>` for both doorway modules, byte for byte. Must
  pass --self-test, which mutates each frozen field in memory and asserts the
  checker rejects it; a frozen-field gate that cannot fail is decorative.

- [ ] G8: No design-system change
  CHECK: git diff --stat origin/main -- app/[locale]/globals.css app/[locale]/components/
  EXPECT: empty
  EVIDENCE: pending. Spacing, typography, colour tokens and components are
  frozen by instruction; the restructure reuses existing grid and card
  patterns.

- [ ] G9: No URL, slug, canonical or redirect change
  CHECK: git diff origin/main -- lib/routes.ts lib/seo.ts middleware.ts app/sitemap.ts app/robots.ts
  EXPECT: empty
  EVIDENCE: pending.

- [ ] G10: Every internal link resolves
  CHECK: node scripts/check-links.mjs
  EXPECT: LINKS_RESOLVE_OK
  EVIDENCE: pending. Every `pathFor`/`href` target in the built HTML must
  correspond to a prerendered page, so a related-page link added by the
  rewrite cannot 404. Distinct from check-i18n-leak.mjs --links, which counts
  English-visible inbound links rather than resolving them.

- [ ] G11: The i18n leak fix still holds
  CHECK: node scripts/check-i18n-leak.mjs && node scripts/check-i18n-leak.mjs --links && node scripts/check-i18n-leak.mjs --self-test
  EXPECT: I18N_LEAK_OK; LINKS_OK; SELFTEST_PASS
  EVIDENCE: pending. No hardcoded locale-visible literal may be introduced at
  a call site; all new copy goes through messages or content modules.

- [ ] G12: Trial-length copy still agrees across locales
  CHECK: node scripts/check-trial-claims.mjs
  EXPECT: TRIAL_CLAIMS_* with both locales agreeing on one length
  EVIDENCE: pending. The rewrite touches CTA and badge copy carrying the trial
  length, so this is re-run rather than inherited.

- [ ] G13: Every page is explainable from the spine
  EVIDENCE: pending. Manual. For each route in scope, the h1, the section
  order and the final CTA are read back against the spine sentence, and the
  mapping to PARC / LOCATION / CONFORMITÉ / PREUVE is recorded. No command can
  decide whether copy means what the spine says, so this stays manual and is
  reviewed with the before/after table in the PR body.

- [ ] G14: No regulatory claim without a logged source
  EVIDENCE: pending. Manual. Every sentence asserting a legal obligation is
  traced either to content/reference/vgp-reglementation.md (primary-text rows
  only) or to a Légifrance URL logged in DECISIONS.md. Claims that cannot be
  traced are deleted, not softened.
