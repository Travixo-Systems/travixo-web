# TraviXO — Prompts Claude Code : corrections site web
**Date :** 2026-03-27  
**Usage :** Executer dans Claude Code (CLI), un chunk a la fois.  
**Repo cible :** travixo_web (Next.js 15, next-intl, messages/fr.json + messages/en.json)  
**Branche :** `fix/website-copy-corrections`

Creer la branche avant de commencer :
```bash
git checkout -b fix/website-copy-corrections
```

---

## CHUNK 0 — Reconnaissance (lancer en premier, toujours)

**Objectif :** Comprendre la structure i18n avant toute modification. Aucun fichier modifie.

```
Examine the i18n setup in this Next.js 15 project.

1. Show me the full content of messages/fr.json
2. Show me the full content of messages/en.json
3. List all files under app/ that are marketing pages (not dashboard, not auth, not api)
4. For each marketing page, tell me whether its text strings are:
   a) In messages/*.json (via useTranslations or getTranslations)
   b) Hardcoded inline in the component

Do not modify anything. Output only the file tree and a summary table:
| Page | Path | Text source (i18n keys / inline) |
```

**Valider avant de continuer :** confirmer que tu as la carte complete des fichiers a toucher.

---

## CHUNK 1 — P0a : purge DREETS (find and replace global)

**Objectif :** Remplacer toutes les occurrences de "DIRECCTE" dans les fichiers marketing.  
**Fichiers touches :** messages/fr.json, messages/en.json, tous les composants marketing.  
**Aucune modification** sur dashboard/, auth/, api/, lib/.

```
Search every file under app/ (excluding app/dashboard, app/auth, app/api) 
and under messages/ for the string "DIRECCTE".

For each occurrence found, show:
- File path
- Line number
- Full line content

Then apply these replacements:

In messages/fr.json and French text in components:
  "DIRECCTE" -> "inspection du travail (DREETS)"
  "rapport DIRECCTE" -> "rapport de verification VGP"
  "rapports DIRECCTE" -> "rapports de verification VGP"
  "conforme DIRECCTE" -> "conforme aux obligations VGP (DREETS)"

In messages/en.json and English text in components:
  "DIRECCTE" -> "labor inspection (DREETS)"
  "DIRECCTE reporting" -> "VGP inspection reports"
  "DIRECCTE audit" -> "DREETS inspection"

After replacing, run a final search for "DIRECCTE" to confirm zero remaining occurrences.

Commit message: fix(i18n): replace DIRECCTE with DREETS across all marketing files
```

**Valider :** `git diff` propre, zero occurrence de DIRECCTE.

---

## CHUNK 2 — P0b : supprimer GPS location tagging

**Objectif :** Retirer toute reference a GPS tracking dans les features marketing.  
**Fichiers touches :** messages/fr.json, messages/en.json, composant Features (mobile scanning card).

```
Search for "GPS" in all marketing files (app/ excluding dashboard/auth/api, and messages/).

For each occurrence, show file + line + context (3 lines around it).

Then apply:

Case 1 — "GPS location tagging" or "Captures GPS location" or similar:
  FR replacement: "Contexte du dernier scan : operateur, notes et etat du materiel"
  EN replacement: "Last scan context: operator, notes, and equipment condition"

Case 2 — "Know where every asset is" or "Know where every piece of equipment is":
  FR replacement: "Sachez qui l'a, quand il a ete vu pour la derniere fois, et s'il est pret a louer"
  EN replacement: "Know who has it, when it was last seen, and whether it's ready to rent"

Case 3 — Any other GPS reference in marketing context: flag it and ask before replacing.

Do not touch any GPS reference in dashboard components, API routes, or technical docs.

After replacing, search for "GPS" again to confirm only non-marketing references remain (if any).

Commit message: fix(copy): remove GPS tracking implication from marketing features
```

**Valider :** Ouvrir la Features page en local, verifier que "GPS" n'apparait plus.

---

## CHUNK 3 — P0c : corriger les amendes et "zero compliance risk"

**Objectif :** Remplacer les claims legalement risques sur la page Pricing et Homepage.  
**Fichiers touches :** messages/fr.json, messages/en.json, composant Pricing, composant Homepage.

```
Search marketing files for these exact strings (and close variants):
- "zero compliance risk" / "zero risk"
- "fully automated" near "compliance"
- "15K" or "75K" near "fine" or "amende"
- "avoid" near "fine" or "amende"

Show each occurrence with file + line + full line.

Then apply:

For "zero compliance risk" / "Fully automated, zero compliance risk":
  FR: "Rappels automatises, rapports centralises, documents disponibles pour tout controle"
  EN: "Automated reminders, centralised reports, and documents available for inspection"

For fine amounts (€15K, €75K, €15K-75K):
  FR: "Des sanctions peuvent s'appliquer en cas de manquement aux obligations de conformite (Code du travail, Art. L4741-1)"
  EN: "Penalties can apply for failure to meet periodic compliance obligations (Code du travail, Art. L4741-1)"

Do not replace occurrences in internal docs, comments, or non-user-facing files.

Commit message: fix(copy): remove unverified fine amounts and zero-risk compliance claim
```

**Valider :** Page Pricing en local — aucun chiffre €15K/€75K visible, aucun "zero risk".

---

## CHUNK 4 — P1a : corriger les statuts Features (Coming Soon -> Available)

**Objectif :** Passer Email Alerts et Team Management de "Coming Soon" a "Disponible maintenant".  
**Fichiers touches :** composant Features page, messages/fr.json, messages/en.json.

```
Find the Features page component(s) that render feature cards or feature sections.

Search for "Coming Soon" in all marketing components and messages files.

For each occurrence, show: file + line + what feature it applies to.

Then apply these changes:

For Email Alerts / Alertes email:
  Status: remove "Coming Soon" badge, add "Disponible maintenant" / "Available now"
  FR description to add or update:
    "Alertes VGP quotidiennes (J-30, J-14, J-7, J-1 et depassement). 
     Rappel si un engin expire pendant une location active. 
     Notifications d'audit avec liste des manquants."
  EN description:
    "Daily VGP alerts (J-30, J-14, J-7, J-1 and overdue). 
     Recall alert when an asset expires during an active rental. 
     Audit notifications with missing assets list."

For Team Management / Gestion d'equipe:
  Status: remove "Coming Soon" badge, add "Disponible maintenant" / "Available now"
  FR description:
    "Invitez vos techniciens, connexions separees, auditez qui a scanne quoi et quand."
  EN description:
    "Invite technicians, separate logins, audit who scanned what and when."

For any other "Coming Soon" items: flag them and do not modify without confirmation.

Commit message: fix(features): update email-alerts and team-management status to available
```

**Valider :** Features page — les deux sections affichent "Disponible maintenant", pas "Coming Soon".

---

## CHUNK 5 — P1b : remplacer la card Enterprise Integrations par VGP Automation

**Objectif :** La card "Enterprise Integrations" (ServiceNow, Jira, QuickBooks) n'est pas construite.  
La remplacer par une card "VGP Compliance Automation" qui decrit ce qui est livre.  
**Fichiers touches :** composant Features cards (Homepage + Features page), messages/*.json.

```
Find the feature card or section that mentions:
- "ServiceNow" OR "Jira" OR "QuickBooks" OR "Xero" OR "Zapier" OR "5,000+ apps"
in marketing components (not in docs or internal files).

Show the full component block for each occurrence.

Then replace the entire "Enterprise Integrations" card content with:

FR title: "Automatisation de la conformite VGP"
FR body:
  "Alertes quotidiennes parametrables (J-30, J-14, J-7, J-1 et depassement). 
   Rappel automatique si un engin expire en cours de location active. 
   Telechargement des certificats et generation de rapports PDF pour les controles. 
   Disponible maintenant."

EN title: "VGP Compliance Automation"
EN body:
  "Configurable daily alerts (J-30, J-14, J-7, J-1 and overdue). 
   Automatic recall alert when an asset expires during an active rental. 
   Certificate upload and PDF report generation formatted for inspections. 
   Available now."

If ServiceNow/Jira/QuickBooks appear elsewhere (e.g. an integrations teaser section), 
flag them separately — do not remove without confirmation.

Commit message: fix(features): replace enterprise-integrations card with vgp-automation card
```

**Valider :** Aucun des noms ServiceNow, Jira, QuickBooks ne s'affiche sur Homepage ou Features page.

---

## CHUNK 6 — P1c : corriger la section Integrations (Homepage + Pricing)

**Objectif :** Remplacer la liste d'integrations US non construites par les integrations reelles.  
**Fichiers touches :** composant Integrations teaser (Homepage), section Pricing tiers.

```
Find components or sections that list integrations logos or names including:
- ServiceNow, Jira, QuickBooks, Xero, Zapier, Slack, Microsoft Teams
in the Homepage integrations teaser and Pricing page tier descriptions.

Show the full block for each.

Then replace:

Homepage integrations teaser:
  FR: 
    "Import Excel / CSV avec detection automatique des colonnes
     Export PDF des rapports VGP
     Export CSV liste d'actifs
     Compatible SAGE, EBP, Cegid (configuration sur demande)
     Webhooks sur evenements de scan (Enterprise)
     Contactez-nous pour votre configuration specifique."
  EN:
    "Excel / CSV import with automatic column detection
     VGP report PDF export
     Asset list CSV export
     Compatible with SAGE, EBP, Cegid (on request)
     Webhooks on scan events (Enterprise)
     Contact us for your specific setup."

Pricing tiers — remove or downgrade:
  "Automatic accounting export" -> 
    FR: "Export CSV liste d'actifs et historique VGP"
    EN: "CSV export of asset list and VGP history"
  
  "SAGE & EBP accounting export" ->
    FR: "Compatible SAGE, EBP, Cegid (configuration sur demande)"
    EN: "Compatible with SAGE, EBP, Cegid (on request)"
  
  Any Zapier reference in Starter or Professional tier ->
    Move to Enterprise tier only, label: "Integrations personnalisees (sur contrat)"

Commit message: fix(copy): replace unbuilt US integrations with actual available exports
```

**Valider :** Aucun des noms US ne s'affiche dans la section integrations ou les tiers Starter/Pro.

---

## CHUNK 7 — P2a : ajouter la section Handover Proof (Homepage)

**Objectif :** Creer une nouvelle section entre Features et Use Cases sur la Homepage.  
**Fichiers touches :** app/[locale]/page.tsx (ou equivalent), messages/fr.json, messages/en.json.

```
I need to add a new section to the Homepage between the Features section and the Use Cases section.

First, show me the current structure of the Homepage component to confirm where to insert.

Then create a new component HandoverProofSection (or add inline if the page structure is flat) with:

i18n keys to add in messages/fr.json under "homepage.handover":
  title: "Toute mise a disposition, documentee."
  scanOut.title: "Scan de depart client"
  scanOut.body: "Quand un engin quitte le depot, un scan cree un evenement horodate : qui l'a pris, quand, avec quelles notes. Pas de paperasse. La preuve est dans le systeme."
  scanReturn.title: "Scan de retour avec etat"
  scanReturn.body: "Au retour, un second scan capture l'etat du materiel : notes de condition, photos si besoin. En cas de litige sur des dommages ou des dates, vous avez un historique incontestable."
  chain.title: "Chaine de responsabilite complete"
  chain.body: "Chaque engin affiche l'historique complet de ses mouvements. Qui l'avait, de quand a quand, dans quel etat rendu."

Mirror keys in messages/en.json under "homepage.handover":
  title: "Every handover, documented."
  scanOut.title: "Scan-out to client"
  scanOut.body: "When equipment leaves the depot, a scan creates a timestamped event: who took it, when, with what notes. No paperwork. The proof is in the system."
  scanReturn.title: "Scan-back with condition"
  scanReturn.body: "On return, a second scan captures equipment condition: notes, photos if needed. If a client disputes damage or timing, you have an incontestable history."
  chain.title: "Complete responsibility chain"
  chain.body: "Every asset shows its full movement history. Who had it, from when to when, in what condition it was returned."

Style: use existing Tailwind patterns from adjacent sections. 3-column layout on desktop, stacked on mobile. No gradients, no emojis, no consumer SaaS styling. Brand colors: navy #00252b, orange #f26f00.

Commit message: feat(homepage): add handover-proof section with scan-out/return/chain blocks
```

**Valider :** Section visible en local entre Features et Use Cases, responsive, bilingue.

---

## CHUNK 8 — P2b : ajouter Recall VGP + Exceptions panel (Homepage)

**Objectif :** Ajouter deux blocs de contenu qui decrivent les alertes d'exception livrees.  
**Fichiers touches :** Homepage component, messages/*.json.

```
Add two new content blocks to the Homepage.

BLOCK 1 — VGP Recall during active rental
Insert after the HandoverProofSection (added in previous step).

i18n keys under "homepage.recall":
  FR:
    title: "Votre materiel expire chez un client ? Vous le savez avant lui."
    body: "TraviXO croise automatiquement vos dates de VGP avec vos locations actives. Si un engin va expirer pendant qu'il est chez un client, vous recevez une alerte de rappel — assez tot pour organiser le retour et planifier la verification avant que la date soit depassee."
    cta: "Zero materiel non conforme en circulation par inadvertance."
  EN:
    title: "Your equipment expires at a client? You know before they do."
    body: "TraviXO automatically cross-references your VGP dates with active rentals. If an asset will expire while at a client, you receive a recall alert — with enough time to plan the return and schedule the inspection before the deadline."
    cta: "No non-compliant equipment in circulation by accident."

BLOCK 2 — Exceptions panel (3 cards)
Insert after the Recall block.

i18n keys under "homepage.exceptions":
  FR:
    title: "Les exceptions que vous devez voir immediatement"
    overdueReturn.title: "Retard de retour non scanne"
    overdueReturn.body: "Un engin attendu ce soir n'est pas revenu. TraviXO vous alerte le lendemain matin si aucun scan de retour n'a ete enregistre."
    missingAudit.title: "Manquant apres audit"
    missingAudit.body: "L'audit de depot est termine. Deux engins ne sont pas localises. TraviXO genere la liste en PDF et vous l'envoie automatiquement."
    vgpExpiring.title: "VGP expirant en location active"
    vgpExpiring.body: "Un engin dont le controle arrive a echeance dans 10 jours est encore chez un client. Alerte de rappel envoyee. Retour a organiser avant la date limite."
  EN: (mirror translations — same structure)

Style: 3-card grid, consistent with existing card patterns. No emojis. Use Lucide React icons if icons needed.

Commit message: feat(homepage): add vgp-recall block and exceptions-panel with three alert types
```

**Valider :** Les 3 blocs s'affichent, les 3 cartes d'exception sont lisibles sur mobile.

---

## CHUNK 9 — P2c : remplacer les Use Cases (mauvais marches)

**Objectif :** Remplacer Medical Equipment et Logistics par des use cases BTP francais.  
**Fichiers touches :** Homepage use cases section, messages/*.json.

```
Find the Use Cases section on the Homepage. Show me the current component or data structure 
(it may be an array of objects or individual JSX blocks).

Replace the 3 use case cards with:

Card 1 — BTP Equipment Rental:
  FR title: "Loueurs d'engins BTP"
  FR body: "Nacelles, chariots, compresseurs, groupes electrogenes. Gerez les VGP de tout votre parc, sachez exactement a quel client chaque machine est affectee, et recevez une alerte avant qu'une verification expire pendant une location."
  EN title: "BTP Equipment Rental"
  EN body: "Aerial platforms, forklifts, compressors, generators. Manage VGP for your entire fleet, know exactly which client each machine is assigned to, and get an alert before an inspection expires during a rental."

Card 2 — Multi-depot fleet:
  FR title: "Parc multi-depots"
  FR body: "Vous avez du materiel sur 2 ou 3 sites, et vous ne savez plus toujours ce qui est ou. Chaque scan cree un evenement horodate. Un audit d'inventaire produit la liste des manquants en PDF, envoyee automatiquement."
  EN title: "Multi-depot fleet"
  EN body: "Equipment across 2 or 3 sites, and you're not always sure what's where. Every scan creates a timestamped event. An inventory audit produces the missing list as PDF, sent automatically."

Card 3 — Moving off Excel:
  FR title: "La transition depuis Excel"
  FR body: "Vous gerez vos VGP sur un fichier partage ou dans votre email. Importez votre liste d'actifs en 10 minutes. TraviXO prend le relais : alertes automatiques, certificats centralises, historique consultable."
  EN title: "Moving off Excel"
  EN body: "You track VGP on a shared file or in email. Import your asset list in 10 minutes. TraviXO takes over: automatic alerts, centralised certificates, accessible history."

Keep the same visual card structure. Do not change styles, only content.

Commit message: fix(homepage): replace medical-logistics use cases with french btp rental personas
```

**Valider :** Aucune mention de "Medical Equipment" ou "Logistics" visible sur le site.

---

## CHUNK 10 — P3 : polish final (hero + copyright + meta)

**Objectif :** Corrections de fond. A faire en dernier apres validation des P0/P1/P2.  
**Fichiers touches :** Homepage hero, layout/metadata, messages/*.json.

```
Apply these final polish corrections:

1. Hero headline + subhead (Homepage):
   Find the h1 or hero headline component.
   
   FR headline: "Sachez qui l'a, quand il a ete vu pour la derniere fois, et s'il est pret a louer."
   EN headline: "Know who has it, when it was last seen, and whether it's ready to rent."
   
   FR subhead: "TraviXO donne aux loueurs d'engins francais une traçabilite horodatee pour chaque machine, du depart client au retour, avec des alertes VGP automatisees pour que votre parc soit toujours documente et pret pour un controle."
   EN subhead: "TraviXO gives French equipment rental companies a timestamped chain-of-custody for every asset — from checkout to return — plus automated VGP compliance alerts, so your fleet is always documented and inspection-ready."

2. Copyright footer:
   Find the copyright line in the footer component.
   Replace with:
   FR: "© 2026 TraviXO Systems. Tous droits reserves."
   EN: "© 2026 TraviXO Systems. All rights reserved."

3. Meta description (in layout.tsx or page metadata):
   FR: "Traçabilite QR et conformite VGP automatisee pour les loueurs d'engins en France. Onboarding en 4 heures. Alertes quotidiennes. Rapports d'inspection prets a l'emploi."
   EN: "QR traceability and automated VGP compliance for equipment rental companies in France. Onboarding in 4 hours. Daily alerts. Inspection-ready reports."

4. Remove "Multi-Language Support (2027)" from the roadmap teaser on the Features page 
   (the product is already bilingual FR/EN).

5. Remove "Works offline, syncs when online" from the Mobile Scanning feature 
   (offline mode is unconfirmed — replace with: 
   FR: "Fonctionne sur tout smartphone, sans installation d'application"
   EN: "Works on any smartphone, no app install required")

Commit message (split into individual commits per item):
  fix(homepage): rewrite hero headline and subhead
  fix(footer): update copyright year to 2026  
  fix(seo): update meta description fr and en
  fix(features): remove unconfirmed offline-mode claim
  fix(features): remove multi-language-2027 roadmap item
```

**Valider :** Build propre (`next build`), aucune erreur TypeScript, visual check sur les 3 pages.

---

## CHUNK 11 — Verification finale et PR

**Objectif :** Confirmer que toutes les corrections sont appliquees avant merge.

```
Run a final audit across all modified marketing files.

Search for and report any remaining occurrences of:
- "DIRECCTE"
- "GPS location" or "Captures GPS"
- "zero compliance risk" or "zero risk"
- "€15K" or "€75K" or "15K-75K"
- "ServiceNow" or "Jira Service" or "QuickBooks" or "Xero" or "Zapier" 
  (in marketing pages — not in internal docs or comments)
- "Coming Soon" on Email Alerts or Team Management features
- "Medical Equipment" or "Logistics & Warehousing" in use cases
- "2025" in copyright
- "DIRECCTE" in messages/*.json

For each hit found: show file + line + content.
If zero hits on all items: confirm "All corrections applied cleanly."

Then show a summary of all commits made in this branch.
```

**Si propre :** ouvrir la PR avec le message :

```
fix: website copy corrections — DREETS, GPS claims, compliance phrasing, competitor alignment

- Replace DIRECCTE with DREETS across all marketing pages and messages
- Remove GPS location tracking implication from features
- Remove unverified fine amounts and zero-risk compliance claim  
- Fix accounting export and Zapier claims in pricing tiers
- Move Email Alerts and Team Management from Coming Soon to Available
- Replace Enterprise Integrations card with VGP Compliance Automation
- Add Handover Proof section to homepage
- Add VGP Recall and Exceptions Panel to homepage
- Replace Medical/Logistics use cases with French BTP personas
- Rewrite hero headline and subhead
- Update copyright year and meta descriptions
- Remove unconfirmed offline-mode and multi-language-2027 claims
```

---

## ORDRE D'EXECUTION RECOMMANDE

```
Chunk 0  — Reconnaissance          (aucun commit)
Chunk 1  — DREETS                  (commit)
Chunk 2  — GPS                     (commit)
Chunk 3  — Amendes + zero risk     (commit)
--- DEPLOY PREVIEW + VALIDER P0 ---
Chunk 4  — Coming Soon fixes       (commit)
Chunk 5  — Features card VGP       (commit)
Chunk 6  — Integrations            (commit)
--- DEPLOY PREVIEW + VALIDER P1 ---
Chunk 7  — Handover Proof          (commit)
Chunk 8  — Recall + Exceptions     (commit)
Chunk 9  — Use Cases               (commit)
--- DEPLOY PREVIEW + VALIDER P2 ---
Chunk 10 — Polish hero/meta        (commits)
Chunk 11 — Audit final + PR        (aucun commit)
```

**Regle entre chunks :** ne pas lancer le suivant avant confirmation "OK" sur le precedent.  
**En cas de conflit i18n :** toujours regler FR en premier, puis EN.  
**En cas d'ambiguite sur un composant :** stopper et demander le chemin exact, ne pas deviner.
