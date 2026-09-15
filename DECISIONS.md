# Decisions: site-wide positioning rewrite

Branch `feat/positioning-sitewide`, cut from `origin/main` at `a579ff4`
(merge of PR #23, the single-product pricing revision).

Every judgement call in this rewrite is logged here: what was decided, why, and
the source where the reason is external. A claim that could not be verified
against the codebase or a logged source was deleted rather than softened.

---

## The spine

Internal, never published verbatim as a headline:

> La conformité est un problème de garde, pas de calendrier. Le matériel part
> chez le client, la preuve doit partir avec lui. TraviXO relie chaque matériel
> à ses locations, ses mouvements, ses documents et sa conformité, de la sortie
> au retour.

The four stages, in chain order, used as the IA backbone on `/` and
`/fonctionnalites`: **PARC / LOCATION / CONFORMITÉ / PREUVE.**

VGP is one segment of that chain. It is never the definition of the product.

---

## Step 0: route inventory at `a579ff4`

Taken before any edit. Sources: `lib/routes.ts` (manifest),
`messages/{fr,en}.json` (namespaced copy), `content/landing/**` (landing copy
as typed modules).

### Routes in the manifest

| Route key | FR slug | EN slug | Copy source | In scope |
|---|---|---|---|---|
| `home` | `/fr` | `/en` | `messages.homepage` | yes |
| `features` | `/fr/features` | `/en/features` | `messages.features` | yes |
| `pricing` | `/fr/pricing` | `/en/pricing` | `messages.pricing` | **no, frozen** |
| `about` | `/fr/about` | `/en/about` | `messages.about` | yes |
| `contact` | `/fr/contact` | `/en/contact` | `messages.contact` | align only |
| `privacy` | `/fr/privacy` | `/en/privacy` | `messages.privacy` | no, legal |
| `terms` | `/fr/terms` | `/en/terms` | `messages.terms` | no, legal |
| `legalNotice` | `/fr/legal-notice` | `/en/legal-notice` | `messages.legalNotice` | no, legal |
| `softwareVgp` | `/fr/logiciel-vgp` | — | `content/landing/fr/logiciel-vgp.ts` | yes, doorway |
| `softwareFleet` | `/fr/logiciel-gestion-parc-materiel` | `/en/equipment-fleet-management-software` | `content/landing/{fr,en}/…` | yes, doorway |
| `softwareRental` | `/fr/logiciel-loueur-materiel` | `/en/equipment-rental-software` | `content/landing/{fr,en}/…` | yes, primary |
| `vgpHub` | `/fr/vgp` | — | hardcoded JSX in `app/[locale]/vgp/page.tsx` | yes, align |
| `vgpTracker` | `/fr/tableau-suivi-vgp-excel` | — | see audit | yes, align |

`/tarifs` (`pricing`) is excluded by instruction: it shipped in PR #23 and is
validated by `scripts/check-pricing.mjs`. Its namespace occupies
`messages/{fr,en}.json` lines 464–595 in both locales, and the diff for this
branch must not touch that range.

`privacy`, `terms` and `legalNotice` are legal instruments, not positioning
surfaces. `terms.section16` in particular was corrected in PR #23 to state the
franchise en base position, and must not be disturbed.

### Current h1 / meta / CTA, per route in scope

Recorded verbatim from `a579ff4` so the PR's before/after table can be built
mechanically rather than from memory.

**`/` home** — h1 `homepage.hero.title`:
- FR: "Votre parc vit dans 3 endroits. Il devrait n'en avoir qu'un."
- EN: "Your fleet lives in 3 places. It should be one."
- meta title FR: "TraviXO - Votre matériel est suivi. Mais pas connecté."
- meta desc FR ends: "Opérationnel en heures." *(unsourced speed claim, see D-2)*
- final CTA FR: "Arrêtez de perdre la trace de votre matériel" /
  "Tester sur votre parc réel" + "Voir la démo"
- section h2s: values ×3, depotScene, carousel, erpPositioning, handover,
  recall, exceptions, useCases, credibility, finalCta

**`/fonctionnalites` features** — h1 `features.hero.title`:
- FR: "Fonctionnalités TraviXO" / EN: "TraviXO Features"
- meta title FR: "Fonctionnalités - Suivi de matériel TraviXO"
- final CTA FR: "Prêt à démarrer ?" / "Lancer l'essai gratuit"
- section h2s: differentiators (3 stat tiles), availableNow (8 feature cards),
  comingSoon (1), enterprise (3), finalCta

**`/logiciel-loueur-materiel`** — h1: "Logiciel pour loueur de matériel :
chaque passage de main laisse une trace". CTA: "Voir TraviXO sur votre parc" /
"Demander une démonstration".

**`/logiciel-vgp`** (doorway) — h1: "Logiciel de suivi VGP pour parcs de
matériel". Meta title/description frozen, see D-5.

**`/logiciel-gestion-parc-materiel`** (doorway) — h1: "Logiciel de gestion de
parc matériel pour le BTP". Meta title/description frozen, see D-5.

### Banned-claim count at `a579ff4`

Swept across `messages/`, `content/`, `app/`, `lib/`:

| Banned string | Hits |
|---|---|
| "2 à 4 semaines" / "2 to 4 weeks" | 0 |
| "500 matériels en 5 minutes" / EN | 0 |
| "500 codes en 30 secondes" / EN | 0 |
| "sécuriser votre conformité" / EN | 0 |
| "avant le prochain contrôle" / EN | 0 |
| competitor names (Loxam, Kiloutou, Hilti, Trackunit) | 0 |
| **ShareMat** | **1** |

The prose speed claims were removed in commits `76e54a7` and `fb34244` (gate
G13 of the previous ledger). What survived that sweep is recorded as D-1 and
D-2 below.

### VGP / conformité in h1–h2, at `a579ff4`

- `/` — "conformité" appears in `carousel.problem.items.3.title` (h2-level in
  the carousel) and `useCases.excel.title` ("Centraliser la conformité").
  "VGP" appears in `recall.title` and `exceptions.vgpExpiring.title`.
- `/fonctionnalites` — "VGP" in two of eight `availableNow` feature h3s, and in
  `finalCta.subtitle` ("reprendre le contrôle de vos VGP").
- `/logiciel-vgp` — VGP in h1 by design; it is the keyword doorway.

Judgement: none of these makes VGP the *definition* of the product at h1 level
today, but `/fonctionnalites`'s final CTA does reduce the product to VGP. That
is corrected under D-3.

---

## Decisions

### D-1 — The three stat tiles on `/fonctionnalites` are deleted

`features.differentiators.{import,bulk,deploy}.time` render as 5xl display
figures at `app/[locale]/features/page.tsx:46,56,66`:

- FR `"5 min"` / EN `"5 min"`
- FR `"30 sec"` / EN `"30 sec"`
- FR `"Heures"` / EN `"Hours"`

These are speed claims with no logged source. The previous session removed the
*prose* versions of exactly these claims ("500 matériels en 5 minutes", "500
codes en 30 secondes", deployment "en quelques heures") but left the standalone
numerals rendering as the page's most prominent visual element. A figure
presented as a headline statistic is a stronger claim than the sentence that
was deleted for being unverifiable, not a weaker one.

**Decision:** delete the `time` values and rebuild that section around the four
chain families instead of three speed metrics. No replacement figure is
invented. Logged rather than silently dropped because it changes what the page
leads with.

### D-2 — "Opérationnel en heures" / "Operational in hours" is deleted

`metadata.home.description`, both locales. Same class as D-1: a deployment
duration with nothing behind it. It escaped the previous sweep because it lives
in the metadata namespace rather than in page copy.

**Decision:** deleted, and the meta description rewritten on the chain. The
home meta title and description are not SEO-frozen (only the two doorways are),
so this is in scope.

### D-3 — `/fonctionnalites` final CTA stops reducing the product to VGP

FR `features.finalCta.subtitle`: "Commencez par reprendre le contrôle de vos
VGP dès aujourd'hui". This makes VGP the product's purpose at the page's
closing moment, which contradicts the spine: VGP is one segment of the chain.

**Decision:** rewritten to close on the chain. VGP stays named as a segment.

### D-4 — The ShareMat reference is removed

`content/landing/fr/logiciel-loueur-materiel.ts:5`, in a source comment:
a positioning note naming a competitor and describing their page.

It is not user-facing and does not reach the rendered HTML. The instruction
bans competitor names site-wide and bans phrasing lifted from a competitor
page; a comment that exists to describe a competitor's messaging is the second
thing, and it steers future edits toward defining this product against theirs.

**Decision:** removed, and the positioning rationale restated from the spine
without reference to any competitor. Logged because it is a deletion in a file
region that is otherwise untouched by a copy rewrite.

### D-5 — The two doorway pages keep URL, h1, meta title and meta description byte-identical

`/logiciel-vgp` and `/logiciel-gestion-parc-materiel` are SEO doorways with
existing keyword targeting. Per instruction, the following are frozen:

- `routeKey`, and therefore the slug and canonical
- `h1`
- `title` (meta)
- `description` (meta)

Only `subtitle`, `sections`, `faq`, `related` and `cta` are rewritten, so the
searched topic resolves upward into the chain and links to
`/logiciel-loueur-materiel`. A byte-level diff against `origin/main` proves the
four frozen fields are unchanged; see `GATES.md` G7.

### D-6 — `/logiciel-loueur-materiel` is promoted to primary commercial landing

Per instruction. It already carries the strongest spine alignment in the
existing copy (sortie / retour / état constaté / documents), so the rewrite
strengthens rather than redirects it. Its `priority` in `lib/routes.ts` is
already 0.9, equal to the other two landings; **no manifest change is made**,
because the instruction forbids URL, slug, canonical and redirect changes, and
sitemap priority is not a copy or IA surface.

### D-7 — `check-rendered.mjs` assertions are updated in the same commit as the copy

The gate asserts four `inlineLinks` strings verbatim:
`"Comment la chaîne se construit, scan par scan"`, `"How the chain builds up,
scan by scan"`, `"Ces fonctions vues du point de vue…"`, `"These features from
the point of view of a construction fleet"`.

Where the rewrite changes those strings, the gate must change with them or a
correct rewrite turns a green gate red. This is the one script edit this branch
makes, and it is confined to assertion strings: no check is weakened or
removed, and the pricing cases are untouched.

### D-8 — No design-system change

Spacing, typography, colour tokens and components are frozen. The four-family
restructure on `/` and `/fonctionnalites` reuses the grid and card patterns
already in those files. `app/[locale]/globals.css` and
`app/[locale]/components/**` must show an empty diff against `origin/main`;
see `GATES.md` G8.

---

### D-9 — `/logiciel-vgp` answers the regulation before it pitches

Verified search intent (S-1) shows the VGP cluster is split, and the split
decides the page's structure:

- "logiciel VGP" is commercial: the qualifier means the searcher has accepted
  they need a tool.
- "suivi VGP" is mixed and leans problem-aware: it returns software pages *and*
  Excel-template results, because that searcher is still managing deadlines in
  a spreadsheet.
- bare "VGP" is informational, and is held by inspection bodies and training
  providers rather than software vendors.

The informational and commercial halves are held by different page types, and
the pages that bridge them resolve the regulation first. A doorway that opens
on a product pitch matches neither half.

**Decision:** the body answers what a VGP is, what it covers, its periodicity
and who may perform it, and only then resolves upward into the chain and links
to `/logiciel-loueur-materiel`. This is what "resolve the searched topic upward
into the chain" means for this page specifically. The h1, meta title and meta
description stay frozen per D-5.

### D-10 — The art. 15-II scope is corrected, on both rental pages

The current FR lead reads "La réglementation demande que certains documents
accompagnent la machine louée", and the EN mirrors it with "hired machinery".
Both overstate the article's scope.

Article 15-II applies to **appareils de levage d'occasion donnés en location**:
second-hand *lifting* equipment on hire. It is not a general rule about all
rented equipment. A compressor or a generator on hire is not covered by it, and
`content/reference/vgp-reglementation.md` already warns those categories fall
under other regimes entirely.

**Decision:** the scope is stated exactly on both locales. This narrows a claim
rather than broadening one, which is the correct direction when the source is
narrower than the copy.

Second correction from the same article: the obligation runs in **both**
directions. Art. 15-II also requires the using establishment's head to confirm
with the lessor that the inspections were carried out. That is published,
because it is the honest reason a lessor benefits from producing the document
pack on demand: their customer has a duty to ask for it.

### D-11 — "Personne qualifiée" is stated as the general rule, not as universal

R.4323-24 permits a qualified person "appartenant ou non à l'établissement" and
imposes no accreditation requirement. The existing copy says an accredited body
is "pas systématiquement exigé", which is already correctly hedged.

**Decision:** kept, and the hedge kept with it. Certain specific equipment
categories do carry accreditation requirements under separate texts, so this is
published as the general rule under R.4323-24 rather than as a universal one.
Removing the hedge would be the easy overclaim here.

### D-12 — The hardcoded FR nav CTA is reported, not fixed

`app/[locale]/components/navigation.tsx:111` and `:188` render
`currentLocale === 'fr' ? 'Essai Gratuit' : t('startPilot')`. The ternary is
dead weight: `navigation.startPilot` already carries a French value, "Tester
gratuitement". So the French nav says "Essai Gratuit" while the French about
page CTA says "Tester sur votre parc réel" and the pricing CTA says "Essayer
30 jours".

Two instructions meet here and point opposite ways. "No hardcoded strings in
JSX" says fix it. "Components frozen" says do not open the file.

**Decision:** not fixed on this branch. The freeze is explicit and this string
is a label inconsistency rather than a positioning claim, so it fails the test
of being worth breaking a stated constraint for. Deleting the ternary is a
one-line change in a frozen file and is left as a handoff, recorded in the PR
body. Note the French label is also the weakest of the three: "Essai Gratuit"
leads with the price, while "Tester sur votre parc réel" leads with the act.

The same applies to the two hardcoded French labels in `Footer.tsx:52-53`
("Périodicité des VGP", "Tableau de suivi Excel"). They are guarded by
`hasRoute` and so render in French only, which makes them correct in practice
but invisible to the i18n tooling. Same handoff, same reason.

### D-13 — `/tableau-suivi-vgp-excel` gets the scope correction only

The page is French-only and entirely hardcoded, deliberately: its dropdown,
reference sheet and sources are built on French regulation, so an English
version would be a different file rather than a translation (documented at
`app/[locale]/tableau-suivi-vgp-excel/page.tsx:19-21`). That reasoning holds
and is not disturbed.

Its closing section, "Ce qu'un tableur ne fera pas", already argues the spine
almost exactly: a spreadsheet does not alert anyone, does not carry the
reports, and does not know where the machine is when the deadline falls. No
repositioning is needed.

**Decision:** one claim correction only. Line 325 currently reads "En
location, l'article 15-II … demande que la notice … accompagnent la machine",
which states the article more broadly than it reads. Corrected to name its
actual scope per D-10. Nothing else on the page changes, and the page keeps its
hardcoded French per the existing rationale.

### D-14 — The homepage values block carries four stages, not three

The brief specifies four stages in chain order, one line each. The block
rendered three, iterating `[1, 2, 3]` over `md:grid-cols-3` at
`app/[locale]/page.tsx:80-81`.

Dropping a stage to fit the existing column count would misstate the chain,
which is the one thing this rewrite exists to get right. So the loop runs to
four and the grid becomes `md:grid-cols-2 lg:grid-cols-4`.

**Decision:** this is an information-architecture change, not a design-system
change. The count of items is content. `md:grid-cols-4` is already an
established pattern in this codebase (`app/[locale]/page.tsx:315` and
`ProblemSolutionCarousel.tsx:86`), so no new layout idiom is introduced, and
`globals.css` and `components/` are untouched, which is what D-8 freezes. The
two-column intermediate step exists so four cards do not crush at tablet width.

The stage names are the chain itself: Parc, Location, Conformité, Preuve. The
previous three values described onboarding steps (import the file, generate the
codes, start tracking), which described how to begin using the product rather
than what the product is.

### D-15 — The features differentiator band is rebuilt on the chain

With the three figures deleted under D-1, the band's three slots were rebuilt
as the chain families rather than left as titles with a missing figure above
them. The message keys keep their existing names (`import`, `bulk`, `deploy`)
so the page markup and the key paths stay in step; renaming them would be
churn in both locales for no reader-visible gain.

Note the band now carries three slots for four families, so conformité and
preuve share one. That is deliberate: they are the two halves of the same
claim, and forcing a fourth column here would fight the page's existing
three-column rhythm for no gain. The four families are enumerated in full on
the homepage, which is where the chain is introduced.

### D-16 — `inlineLinks` copy survives the reposition unchanged

`check-rendered.mjs` asserts four `inlineLinks` strings verbatim, and D-7
anticipated having to update them. On reading them back against the new
framing, they already speak the chain: "Comment la chaîne se construit, scan
par scan" and "How the chain builds up, scan by scan" are exactly the right
lead for the repositioned rental page.

**Decision:** left unchanged. D-7's allowance is therefore unused, and
`scripts/check-rendered.mjs` needs no assertion edit for the inline links. Any
edit that script does need is confined to the homepage and features strings the
restructure moved.

---

## Sources

External sources are logged here with the URL and what was taken from them.
A regulatory sentence without an entry here is not published.

**S-1 — Search intent, FR keyword cluster.** Verified 15/09/2026 via search.
Used only to establish intent and page-type shape; no competitor sentence was
read into the copy. Findings: `logiciel loueur materiel` is unambiguously
commercial, and competes against both vendor landing pages and comparison
listicles. `logiciel gestion parc materiel` is commercial but broader and less
qualified, spanning plant, vehicle fleets and IT assets, which is why the
doorway keeps its BTP scoping. `logiciel VGP` is commercial while `suivi VGP`
leans problem-aware and bare `VGP` is informational; this split is what D-9
acts on.

Competitor names recorded so their phrasing can be avoided, never used as a
copy source: Organilog, Codial, LoKisi, Sphinx Manager, Unipresta, Rentman,
Locasyst, Praxedo, Tracktor, Hector Asset Manager, Optim'BTP, Fleezy, SETINUP,
myB2O, Substock, Trafman, QRTick, Pro VGP, VGPManager, Octav, MemoryFlow,
Prevatis, Ealico. None appears in the repository, and none may be named in
copy. The previously committed ShareMat reference is removed under D-4.

No keyword volume or difficulty data was obtainable, so no traffic claim is
made anywhere in this rewrite.

**S-2 — Arrêté du 1er mars 2004, article 15-II.** En vigueur, effective
31/03/2005, confirmed current as of 15/09/2026.
https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000006680459
(parent text: https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000439029)

Taken from it: the documents that must be placed on the machine or near it
(notice d'instructions, rapport de première mise en service, dernier rapport de
vérification périodique, historique des vérifications), the scope limit to
second-hand lifting equipment on hire, and the reciprocal duty on the using
establishment. See D-10.

**S-3 — Code du travail R.4323-23.** En vigueur since 01/05/2008.
https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000018531479/
Taken from it: the general VGP obligation, and that periodicities are set by
ministerial arrêté rather than by the article itself.

**S-4 — Code du travail R.4323-24.** En vigueur since 01/05/2008.
https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000018531477
Taken from it: VGP is performed by a qualified person, internal or external,
with no accreditation requirement in this article. See D-11.

Already in the repository, carried forward rather than re-verified:
`content/reference/vgp-reglementation.md`, which records primary-text readings
of arrêté du 1er mars 2004 (art. 15-II, 20-II, 22, 23), arrêté du 5 mars 1993
(art. 1er, 2, 3) and Code du travail R.4323-23 / R.4323-24, each with a
Légifrance URL and a verification date. Its editorial rule is respected: only
rows marked "Vérifié texte primaire" may be published, and compresseurs and
groupes électrogènes are never presented as VGP-levage equipment.
