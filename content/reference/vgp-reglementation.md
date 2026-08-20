# VGP : table de périodicité sourcée (référence interne TraviXO)

**Consulté le :** 19 août 2026, sur Légifrance sauf mention contraire.
**Usage :** backbone d'exactitude pour le cluster de fiches `/fr/vgp/[engin]`, le lead magnet Excel et toute page réglementaire. Chaque affirmation ci-dessous porte sa source. Les points marqués `[A VERIFIER]` n'ont pas pu être confirmés sur le texte primaire depuis cet environnement et exigent une lecture humaine avant publication.

**Statut de vérification :** les articles 20, 22, 23 et 15-II de l'arrêté du 1er mars 2004, ainsi que R.4323-23 et R.4323-24 du Code du travail, ont été lus sur le texte consolidé. L'arrêté du 5 mars 1993 n'a pas pu être lu en direct (403) : ses attributions reposent sur une source secondaire et sont flaggées.

---

## 1. Cadre légal (vérifié sur texte primaire)

**Obligation générale, art. R.4323-23 Code du travail** (texte intégral, consulté 19/08/2026) :

> « Des arrêtés du ministre chargé du travail ou du ministre chargé de l'agriculture déterminent les équipements de travail ou les catégories d'équipement de travail pour lesquels l'employeur procède ou fait procéder à des vérifications générales périodiques afin que soit décelée en temps utile toute détérioration susceptible de créer des dangers. Ces arrêtés précisent la périodicité des vérifications, leur nature et leur contenu. »

Source : [Légifrance, R.4323-23](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000018531479/2008-05-01)

**Qui peut réaliser la VGP, art. R.4323-24 Code du travail** (texte intégral) :

> « Les vérifications générales périodiques sont réalisées par des personnes qualifiées, appartenant ou non à l'établissement, dont la liste est tenue à la disposition de l'inspection du travail. Ces personnes sont compétentes dans le domaine de la prévention des risques présentés par les équipements de travail soumis à vérification et connaissent les dispositions réglementaires afférentes. »

Source : [R.4323-24 (via Pappers Justice, miroir du texte Légifrance)](https://justice.pappers.fr/loi/LEGITEXT000006072050/article/LEGIARTI000018531477). La VGP n'exige donc PAS un organisme agréé ; une personne qualifiée interne suffit légalement. Ne jamais écrire le contraire dans une fiche.

`[A VERIFIER]` R.4323-25 à R.4323-27 (consignation des résultats, registre de sécurité) : Légifrance a renvoyé 403 lors de la consultation. Ne citer le registre de sécurité qu'après lecture directe.

`[A VERIFIER]` Sanctions : aucun montant d'amende n'a été vérifié sur texte primaire dans cette session. Ne publier aucun chiffre de sanction sans lecture de L.4741-1 et confirmation de son applicabilité.

---

## 2. Appareils de levage, arrêté du 1er mars 2004

Champ : art. 22 (VGP des appareils de levage visés à l'art. 2-a, utilisés dans un établissement visé à L.4221-1). Périodicités : art. 23. Texte : [Légifrance, arrêté du 1er mars 2004](https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000439029), art. 23 consolidé : [LEGIARTI000006680469](https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000006680469).

**Règle générale : 12 mois.**

> « La vérification générale périodique des appareils de levage soumis à l'article 22 doit avoir lieu tous les douze mois. »

`[A CITER]` Le renvoi de l'art. 23 vers les II et III de l'art. 20 pour le palier 6 mois n'est pas cité verbatim dans ce document, alors que toute la colonne « 6 mois » du tableau en dépend. Corroboré le 19/08/2026 par lecture secondaire de l'art. 23 (« cette périodicité est de six mois pour les appareils de levage énumérés aux II et III de l'article 20 »), à remplacer par la citation primaire.

**Exception 6 mois** : appareils listés à l'art. 20-II et 20-III, et appareils mus par une énergie autre que la force humaine utilisés pour le transport de personnes ou le déplacement en élévation d'un poste de travail.

Liste art. 20-II, citée verbatim (consultée 19/08/2026) :

> « grues auxiliaires de chargement sur véhicules ; grues à tour à montage rapide ou automatisé, sur stabilisateurs ; bras ou portiques de levage pour bennes amovibles ; hayons élévateurs ; monte-meubles ; monte-matériaux de chantier ; engins de terrassement équipés pour le levage ; grues mobiles automotrices ou sur véhicule porteur, ne nécessitant pas de montage ou de démontage de parties importantes ; chariots élévateurs ; tracteurs poseurs de canalisations ; plates-formes élévatrices mobiles de personnes. »

**Exception 3 mois** : appareils de levage mus par la force humaine employée directement, utilisés pour déplacer en élévation un poste de travail.

---

## 3. Table par catégorie de parc TraviXO

Vocabulaire aligné sur les catégories du fichier d'import (`Nacelle, Chariot, Engin, Compresseur, Groupe électrogène, Divers`).

| Équipement (catégorie parc) | Périodicité VGP | Fondement | Statut |
|---|---|---|---|
| Nacelle / PEMP | **6 mois** | Art. 20-II + art. 23, arrêté 01/03/2004 (« plates-formes élévatrices mobiles de personnes ») | Vérifié texte primaire |
| Chariot élévateur | **6 mois** | Art. 20-II + art. 23, arrêté 01/03/2004 | Vérifié texte primaire |
| Engin de terrassement **équipé pour le levage** (pelle de manutention, chargeuse avec fourches…) | **6 mois** | Art. 20-II + art. 23, arrêté 01/03/2004 (« engins de terrassement équipés pour le levage ») | Vérifié texte primaire |
| Engin de terrassement **sans fonction levage** (pelle, chargeuse, compacteur d'extraction…) | **12 mois** | Arrêté du 05/03/1993, machines « mobiles d'extraction, de terrassement, d'excavation ou de forage du sol » | `[A VERIFIER]`, attribution via guide ACRITEC (source secondaire), texte primaire non lisible (403) |
| Grue auxiliaire de chargement | **6 mois** | Art. 20-II + art. 23, arrêté 01/03/2004 | Vérifié texte primaire |
| Grue mobile automotrice (sans montage de parties importantes) | **6 mois** | Art. 20-II + art. 23, arrêté 01/03/2004 | Vérifié texte primaire |
| Hayon élévateur / monte-matériaux de chantier | **6 mois** | Art. 20-II + art. 23, arrêté 01/03/2004 | Vérifié texte primaire |
| Autres appareils de levage (palan fixe, pont roulant, potence…) | **12 mois** | Art. 23, règle générale, arrêté 01/03/2004 | Vérifié texte primaire |
| Appareil mu par force humaine déplaçant un poste de travail en élévation | **3 mois** | Art. 23, arrêté 01/03/2004 | Vérifié texte primaire |
| Compacteur à déchets, presse, massicot | **3 mois** | Arrêté du 05/03/1993 | `[A VERIFIER]`, source secondaire ACRITEC |
| **Compresseur** | **Hors VGP levage.** Régime des équipements sous pression (suivi en service, périodicités propres) | Réglementation ESP, PAS l'arrêté de 2004 | `[A VERIFIER]`, ne publier aucune fiche compresseur avant sourçage dédié |
| **Groupe électrogène** | **Hors VGP levage.** Vérifications des installations électriques, régime distinct | PAS l'arrêté de 2004 | `[A VERIFIER]`, idem |

**Règle éditoriale dure :** les fiches v1 se limitent aux lignes « Vérifié texte primaire ». Compresseurs et groupes électrogènes sont dans le vocabulaire du parc mais ne relèvent pas de la VGP levage, et une fiche qui le laisserait entendre serait fausse et attaquable. Les traiter en v2 avec leur propre sourçage, ou les exclure explicitement (« cet équipement relève d'un autre régime de vérification »).

Source secondaire utilisée pour l'arrêté du 5 mars 1993 : [guide ACRITEC](https://www.acritec.fr/guide-verification-generale-periodique-machines-arrete-5-mars-1993/), consulté 19/08/2026. Référence primaire à lire : [arrêté du 5 mars 1993, Légifrance](https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=LEGITEXT000006060118).

---

## 4. Location : loueur vs locataire (le wedge éditorial)

**Art. 15-II de l'arrêté du 1er mars 2004**, verbatim (consulté 19/08/2026) :

> « Toutefois, en cas de location, les appareils de levage d'occasion ne nécessitant pas l'installation de support particulier sont soumis uniquement à l'examen d'adéquation et, le cas échéant, à l'examen de montage et d'installation […] à condition d'avoir fait l'objet, régulièrement depuis la date de la première opération de location effectuée par le loueur en cause, des vérifications périodiques définies à l'article 22 dans les délais qu'il prévoit. »

Et l'obligation documentaire qui est LE cas d'usage TraviXO :

> « A cet effet, il doit être placé sur l'appareil, ou à défaut à proximité, avec la notice d'instructions, les copies des rapports de vérification de première mise en service et de la dernière vérification périodique ainsi que l'historique des vérifications périodiques effectuées. »

Lecture pour les fiches, exacte et sourcée :

- **Le loueur** doit avoir maintenu les VGP dans les délais depuis la première mise en location, et doit fournir **sur ou près de la machine** : notice d'instructions, rapport de première mise en service, dernier rapport de VGP, **historique complet des VGP**. C'est littéralement la fonction QR + documents de TraviXO : l'obligation de l'art. 15-II est le pitch produit, avec le texte réglementaire comme preuve.
- **L'utilisateur (locataire)**, en tant qu'employeur au sens de R.4323-23, reste tenu de faire procéder aux vérifications pendant la détention si l'échéance tombe en cours de location. Formulation à affiner après lecture des articles 5 et 15-I complets. `[A VERIFIER]` avant de publier une répartition tranchée des responsabilités.

---

## 5. Ce que cette table corrige

- L'audit du 19/08 disait « 6 mois levage / 12 mois autres » : **faux** (la règle générale levage est 12 mois).
- Le document de réconciliation disait 12/6 : **incomplet** (il manquait le palier 3 mois, et sa paraphrase des catégories 6 mois était approximative).
- La liste art. 20-II inclut bien « engins de terrassement équipés pour le levage », le point que la réconciliation attribuait à une interprétation est en fait dans le texte.

Aucun résumé de périodicité ne doit être publié sans pointer vers ce fichier, et ce fichier ne fait foi que pour les lignes « Vérifié texte primaire ».
