import type { LandingPage } from "../types";

// SEO doorway. routeKey, h1, title and description are FROZEN: they carry the
// existing keyword targeting and are asserted byte-identical to origin/main by
// scripts/check-doorway-frozen.mjs. Only the body below was rewritten.
//
// Verified intent (DECISIONS.md S-1): "logiciel gestion parc materiel" is
// commercial but broad, spanning plant, vehicle fleets and IT assets, so the
// body keeps its BTP scoping rather than competing as a generic asset manager.
// The body follows the chain and hands off to /logiciel-loueur-materiel, which
// is where the rental-specific obligation is argued in full.
const page: LandingPage = {
  routeKey: "softwareFleet",
  locale: "fr",

  title: "Logiciel de gestion de parc matériel BTP | TraviXO",
  description:
    "Suivez chaque machine de votre parc par QR code : emplacement, état, documents et conformité. Import de votre fichier existant. À partir de 179 € par mois.",

  h1: "Logiciel de gestion de parc matériel pour le BTP",
  shortLabel: "Logiciel de gestion de parc",
  subtitle:
    "Chaque machine porte un QR code relié à sa fiche : où elle est, qui l'a, dans quel état elle est revenue, et si elle est en règle.",

  sections: [
    {
      kind: "prose",
      heading: "Un parc suivi, mais pas relié",
      paragraphs: [
        "Un parc de 50 à 2 000 machines se retrouve vite réparti entre plusieurs systèmes. L'ERP connaît la facturation. Le tableur connaît les emplacements. Les documents sont ailleurs. Chacun de ces outils est correct sur son propre périmètre.",
        "Ce qui manque est le lien. Obtenir la vue complète d'une machine donnée, où elle est, qui l'a eue, dans quel état elle est revenue et si elle est en règle, demande de rassembler quatre réponses tenues à quatre endroits. C'est ce rapprochement que TraviXO prend en charge.",
      ],
    },
    {
      kind: "blocks",
      heading: "Le parc : une fiche par machine, accessible par scan",
      items: [
        {
          title: "Suivi par QR code",
          body: "Un code unique par matériel, généré en masse et prêt à imprimer sur étiquettes adhésives standard. Le scan ouvre la fiche.",
        },
        {
          title: "Scan depuis un téléphone",
          body: "Aucune application à installer. Le scan passe par l'appareil photo et un navigateur mobile récent.",
        },
        {
          title: "Tableau de bord du parc",
          body: "État immédiat du parc, filtrable par statut, dépôt, catégorie ou champs personnalisés. Suivi des taux d'utilisation par catégorie.",
        },
        {
          title: "Import de votre fichier existant",
          body: "Vous chargez votre fichier matériel tel qu'il est. Les erreurs sont repérées avant import, avec un aperçu avant validation.",
        },
      ],
    },
    {
      kind: "screenshot",
      heading: "Chaque machine, sa catégorie, son échéance",
      lead: "Le parc filtrable par statut, catégorie et emplacement, avec la prochaine échéance de chaque matériel.",
      src: "/screenshots/vgp-suivi.png",
      alt: "Suivi VGP dans TraviXO : liste des matériels avec catégorie, emplacement, prochaine échéance et statut",
      width: 1447,
      height: 745,
    },
    {
      kind: "prose",
      heading: "Les mouvements : ce que le parc devient quand il bouge",
      paragraphs: [
        "Un parc n'est pas un inventaire figé. Les machines sortent, changent de dépôt, partent en chantier, reviennent dans un état différent de celui dans lequel elles sont parties.",
        "Chaque scan écrit un événement daté : qui a sorti la machine, quand, avec quelles remarques, et dans quel état elle a été reprise. Bout à bout, ces événements forment le parcours du matériel, consultable depuis sa fiche. C'est la même chaîne qui alimente la conformité : l'échéance de vérification suit la machine plutôt qu'une ligne de tableur tenue à côté.",
      ],
    },
    {
      kind: "bullets",
      heading: "Les écarts que vous voulez voir tout de suite",
      items: [
        {
          title: "Retour prévu non scanné.",
          body: "Une machine devait rentrer hier soir, aucun retour n'a été scanné. L'alerte part le lendemain matin.",
        },
        {
          title: "Matériel introuvable après inventaire.",
          body: "L'inventaire dépôt est terminé, deux matériels manquent. La liste part en PDF automatiquement.",
        },
        {
          title: "Échéance qui approche sur une machine en location.",
          body: "La machine est chez un client et son échéance arrive. L'alerte de rappel part assez tôt pour organiser le retour.",
        },
      ],
    },
    {
      kind: "prose",
      heading: "La conformité rattachée au matériel",
      paragraphs: [
        "Les vérifications générales périodiques relèvent de l'article R.4323-23 du Code du travail, qui renvoie à des arrêtés ministériels pour les périodicités : douze mois en règle générale pour les appareils de levage, six mois pour les catégories énumérées au II de l'article 20 de l'arrêté du 1er mars 2004, trois mois dans certains cas.",
        "Sur un parc réparti entre plusieurs dépôts, la difficulté n'est pas de connaître ces périodicités mais de les tenir machine par machine. Chaque matériel porte sa propre échéance, et le parc se filtre sur ce qui arrive à terme.",
        "Les compresseurs et les groupes électrogènes figurent dans le vocabulaire du parc, mais relèvent d'autres régimes de vérification que ces deux arrêtés. TraviXO les suit comme matériels sans leur appliquer une périodicité de VGP levage qui ne les concerne pas.",
      ],
    },
    {
      kind: "prose",
      heading: "TraviXO ne remplace pas votre ERP",
      paragraphs: [
        "Il relie ce que votre ERP ne relie pas : la machine physique, sa conformité, ses documents et sa traçabilité terrain. Aucune dépendance à un ERP particulier, et pas besoin de changer vos outils existants.",
      ],
    },
    {
      kind: "pricing",
      heading: "Tarifs",
      paragraphs: [
        "179 € par mois, 100 matériels inclus et utilisateurs illimités. TVA non applicable, art. 293 B du CGI. Au-delà de 100 matériels, le tarif suit une grille dégressive, pensée pour des parcs de 50 à 2 000 machines.",
      ],
      linkLabel: "Voir les tarifs",
    },
  ],

  faqTitle: "Questions fréquentes",

  faq: [
    {
      question: "Combien de matériels peut-on suivre ?",
      answer:
        "Le produit est pensé pour des parcs de 50 à 2 000 machines. Au-delà de 2 000 matériels, le tarif est établi sur devis.",
    },
    {
      question: "Faut-il installer une application ?",
      answer:
        "Non. Le scan fonctionne depuis un navigateur mobile récent, sans installation.",
    },
    {
      question: "Que se passe-t-il si notre fichier est mal tenu ?",
      answer:
        "L'import gère les données imparfaites. Les colonnes sont reconnues même avec des en-têtes irréguliers, et les erreurs sont signalées avant validation.",
    },
    {
      question: "Les compresseurs et groupes électrogènes sont-ils suivis ?",
      answer:
        "Oui, comme matériels du parc : fiche, QR code, emplacement, mouvements et documents. En revanche, aucune périodicité de VGP levage ne leur est appliquée : ils ne relèvent ni de l'arrêté du 1er mars 2004 ni de celui du 5 mars 1993, mais d'autres régimes de vérification.",
    },
    {
      question: "Peut-on exporter les données ?",
      answer:
        "Oui, en CSV ou Excel depuis le tableau de bord, et en PDF pour les rapports de contrôle.",
    },
    {
      question: "Faut-il abandonner notre ERP ?",
      answer:
        "Non. TraviXO se place à côté, sans dépendance à un ERP particulier.",
    },
  ],

  readMoreLabel: "Voir la page",

  related: [
    {
      label: "Le détail du suivi des vérifications réglementaires.",
      routeKey: "softwareVgp",
    },
    {
      label:
        "Activité de location ? La chaîne complète, de la sortie au retour.",
      routeKey: "softwareRental",
    },
  ],

  cta: {
    heading: "Voir TraviXO sur votre parc",
    label: "Demander une démonstration",
  },
};

export default page;
