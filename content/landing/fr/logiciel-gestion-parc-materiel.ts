import type { LandingPage } from "../types";

// Copy validated 19/08/2026 (copybofufr v2).
const page: LandingPage = {
  routeKey: "softwareFleet",
  locale: "fr",

  title: "Logiciel de gestion de parc matériel BTP | TraviXO",
  description:
    "Suivez chaque machine de votre parc par QR code : emplacement, état, documents et conformité. Import de votre fichier existant. À partir de 490 €/mois.",

  h1: "Logiciel de gestion de parc matériel pour le BTP",
  subtitle:
    "Chaque machine porte un QR code relié à sa fiche : où elle est, qui l'a, dans quel état elle est revenue, et si elle est en règle.",

  sections: [
    {
      kind: "prose",
      heading: "Un parc suivi, mais pas relié",
      paragraphs: [
        "Un parc de 50 à 2 000 machines peut rapidement se retrouver réparti entre plusieurs systèmes. L'ERP connaît la facturation. Le tableur connaît les emplacements. Les documents sont ailleurs. Obtenir la vue complète d'une machine donnée devient difficile.",
      ],
    },
    {
      kind: "blocks",
      heading: "Une fiche par machine, accessible par scan",
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
          title: "VGP qui approche sur une machine en location.",
          body: "La machine est chez un client et son échéance arrive. L'alerte de rappel part assez tôt pour organiser le retour.",
        },
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
        "Offres à partir de 490 €/mois, pensées pour des parcs de 50 à 2 000 machines.",
      ],
      linkLabel: "Voir les tarifs",
    },
  ],

  faq: [
    {
      question: "Combien de matériels peut-on suivre ?",
      answer:
        "Le produit est pensé pour des parcs de 50 à 2 000 machines. Au-delà, l'offre Enterprise est établie sur devis.",
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

  related: [
    {
      label: "Pour le suivi des vérifications réglementaires.",
      routeKey: "softwareVgp",
    },
    {
      label: "Pour la traçabilité des locations.",
      routeKey: "softwareRental",
    },
  ],

  cta: {
    heading: "Voir TraviXO sur votre parc",
    label: "Demander une démonstration",
  },
};

export default page;
