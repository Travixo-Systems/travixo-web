# Gates: marketing site - i18n leak fix and Professional annual term

OWNS: app/[locale]/**, messages/en.json, messages/fr.json, scripts/check-*.mjs

Scope: two independent deliverables on the marketing site. (A) French copy no
longer renders on English pages, fixed at the component level so the bug class
cannot recur. (B) The Professional card publishes a 15-month annual term and
the plan grid carries a rate-change note, in both locales, guarded against the
drift class that produced the 30-vs-15 trial discrepancy.

Shell: Git Bash (win32). CWD: d:/Dev/projects/travixo-web
Build needs RESEND_API_KEY set to any non-empty value: app/api/contact/route.ts
calls `new Resend(...)` at module scope, so page-data collection throws without
it. Pre-existing, verified against a stashed baseline that failed identically.

- [x] G1: No French lead/anchor literal renders on any English page
  CHECK: node scripts/check-i18n-leak.mjs
  EXPECT: I18N_LEAK_OK
  EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=D:\Dev\projects\travixo-web; path=19928cd7e4cd/41 entries; output=I18N_LEAK_OK (no hardcoded literals at English-visible call sites)

- [x] G2: The leak checker provably catches a planted leak
  CHECK: node scripts/check-i18n-leak.mjs --self-test
  EXPECT: SELFTEST_PASS
  EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=D:\Dev\projects\travixo-web; path=19928cd7e4cd/41 entries; output=SELFTEST_PASS (planted leak detected: 2 props)

- [x] G3: English inbound landing-page links still render
  CHECK: node scripts/check-i18n-leak.mjs --links
  EXPECT: LINKS_OK
  EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=D:\Dev\projects\travixo-web; path=19928cd7e4cd/41 entries; output=LINKS_OK (2 English-visible inbound links present)

- [x] G4: Trial-length copy stays 30 days and agrees across locales
  CHECK: node scripts/check-trial-claims.mjs
  EXPECT: TRIAL_CLAIMS_4_3
  EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=D:\Dev\projects\travixo-web; path=19928cd7e4cd/41 entries; output=Advertised trial length: 30 days (both locales agree) | TRIAL_CLAIMS_4_3

- [x] G5: Pricing figures self-consistent, term/note present in both locales
  CHECK: node scripts/check-pricing.mjs
  EXPECT: PRICING_OK
  EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=D:\Dev\projects\travixo-web; path=19928cd7e4cd/41 entries; output=term on 1 card (Professional), note rendered once | PRICING_OK

- [x] G6: The pricing checker provably catches a locale-drift regression
  CHECK: node scripts/check-pricing.mjs --self-test
  EXPECT: PRICING_SELFTEST_PASS
  EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=D:\Dev\projects\travixo-web; path=19928cd7e4cd/41 entries; output=caught: term added to a second card | PRICING_SELFTEST_PASS (4 controls caught)

- [x] G7: Production build compiles and prerenders every route
  CHECK: node scripts/build-check.mjs
  EXPECT: BUILD_OK
  EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=D:\Dev\projects\travixo-web; path=19928cd7e4cd/41 entries; output=(node:8380) [DEP0190] DeprecationWarning: Passing args to a child process with shell option true can lead to security vulnerabilities, as the arguments are not escaped, only concatenated. | (Use `node --trace-deprecation ...` to show where 

- [x] G8: Rendered HTML carries the intended copy in each locale
  CHECK: node scripts/check-rendered.mjs
  EXPECT: RENDERED_OK
  EVIDENCE: exit=0; shell=C:\WINDOWS\system32\cmd.exe; cwd=D:\Dev\projects\travixo-web; path=19928cd7e4cd/41 entries; output=6 page/locale combinations verified in built HTML | RENDERED_OK

- [ ] G9: Backend trial interval is 30 days (app repo)
  EVIDENCE: pending

- [ ] G10: Site appears in search results
  EVIDENCE: pending

- [ ] G11: Published speed claims are sourced
  EVIDENCE: pending

- [ ] G12: Billing grants 15 months on annual Professional
  EVIDENCE: pending

ABANDON: G9 Backend trial interval cannot be gated from this repository.
create_organization_and_user, subscriptions/route.ts, pilot_end_date and
trial_ends_at return zero hits across the tree (GATES.md itself excluded).
That code lives in the app repo. The user has since verified 30 days live
against the production database, 5/5 checks passing, so the site's advertised
30 days is now true. Nothing to fix here.

ABANDON: G10 Search visibility is not a property of this codebase. It depends
on external index state and elapsed time. No honest local oracle exists.

ABANDON: G11 Speed claims ("5 minutes", "500 QR codes in 30 seconds", "same
day", "Operational in hours", "Skip 2 to 4 weeks") cannot be measured from the
marketing repo: they describe product behaviour in the app repo, and the
comparison-table row also makes a claim about competitors. Handoff: with 17
pilot orgs live, time one real fleet import and one 500-code generation
against production, then either source or soften. Flagged to the user as the
highest-value open item.

ABANDON: G12 "15 mois de service" cannot be verified from this repository.
It becomes a published payment term the moment this deploys, and only the app
repo's billing can honour it. The user has stated they will implement it
backend-side. Handoff: do not deploy this page until billing grants 15 months
on an annual Professional subscription, or the site republishes the 30-vs-15
failure class as a billing dispute.
