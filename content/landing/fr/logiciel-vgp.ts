import type { LandingPage } from "../types";

// Copy validated 19/08/2026 (copybofufr v2). Regulatory claims trace to
// content/reference/vgp-reglementation.md, primary text rows only.
const page: LandingPage = {
  routeKey: "softwareVgp",
  locale: "fr",

  title: "Logiciel VGP : suivi des vérifications périodiques | TraviXO",
  description:
    "Suivez les VGP de tout votre parc au même endroit. Échéances, rappels automatiques, certificats et rapports reliés à chaque machine.",

  h1: "Logiciel de suivi VGP pour parcs de matériel",
  shortLabel: "Logiciel de suivi VGP",
  subtitle:
    "Échéances, certificats et rapports de contrôle reliés à chaque machine. Vous savez à tout moment ce qui est conforme, ce qui arrive à échéance, et ce qui ne peut plus sortir.",

  sections: [
    {
      kind: "bullets",
      heading: "Le suivi VGP se perd entre trois endroits",
      lead: "Dans de nombreux parcs, l'information VGP existe. Elle est simplement répartie entre un tableur, une boîte mail et une armoire à classeurs.",
      items: [
        {
          title: "La date est quelque part.",
          body: "Dans un fichier, dans un logiciel de gestion, ou dans la tête de la personne qui suit le parc.",
        },
        {
          title: "Le certificat est ailleurs.",
          body: "Dans un dossier partagé, en pièce jointe d'un mail, ou en version papier au dépôt.",
        },
        {
          title: "Le lien entre les deux n'existe pas.",
          body: "Rien ne relie automatiquement la machine physique à son dernier rapport.",
        },
      ],
    },
    {
      kind: "blocks",
      heading: "Un suivi VGP relié à la machine",
      lead: "TraviXO ne réalise pas la vérification à la place de la personne qualifiée. Il planifie les échéances, centralise les rapports et relie chaque contrôle au matériel concerné.",
      items: [
        {
          title: "Planification des contrôles",
          body: "Chaque matériel porte sa périodicité et sa prochaine échéance. Le calendrier se met à jour sans ressaisie.",
        },
        {
          title: "Rappels avant l'échéance",
          body: "Alertes par e-mail à J-30, J-7, J-1 et en dépassement. Vous voyez venir les échéances au lieu de les découvrir.",
        },
        {
          title: "Certificats reliés au matériel",
          body: "Les rapports PDF sont déposés sur la fiche de la machine. Un scan du QR code affiche le dernier rapport, sans chercher dans un dossier partagé.",
        },
        {
          title: "Rapports prêts pour contrôle",
          body: "Historique complet des vérifications, export PDF ou Excel, présentation adaptée aux contrôles réglementaires.",
        },
      ],
    },
    {
      kind: "screenshot",
      heading: "L'état du parc en un écran",
      lead: "Taux de conformité, échéances à trente jours, retards. La vue signale la non-conformité en citant l'article du Code du travail plutôt qu'un montant d'amende.",
      src: "/screenshots/vgp-conformite.png",
      alt: "Vue d'ensemble de la conformité VGP dans TraviXO : taux de conformité, inspections à venir, équipements en retard",
      width: 1436,
      height: 709,
    },
    {
      kind: "prose",
      heading: "Une VGP qui arrive à échéance pendant une location",
      paragraphs: [
        "C'est le scénario qu'un suivi isolé par tableur détecte difficilement : il faut rapprocher l'échéance VGP de la situation locative de la machine.",
        "TraviXO recoupe les échéances VGP avec les locations en cours. Si une machine est encore chez un client et que son échéance approche, l'alerte de rappel part assez tôt pour organiser le retour et planifier le contrôle.",
        "Au moment de planifier un contrôle sur une machine en location, l'application compare l'échéance à la date de retour prévue et signale explicitement le cas où le contrôle tombe avant le retour.",
      ],
    },
    {
      kind: "prose",
      heading: "Ce que la réglementation demande",
      paragraphs: [
        "Les vérifications générales périodiques des appareils de levage relèvent des articles R.4323-23 et suivants du Code du travail et de l'arrêté du 1er mars 2004. La périodicité générale est de douze mois. Elle est de six mois pour certaines catégories, dont les chariots élévateurs, les nacelles PEMP, les grues auxiliaires et les engins de terrassement équipés pour le levage, et de trois mois pour les appareils mus par la force humaine déplaçant un poste de travail en élévation.",
        "Pour ces VGP, le Code du travail exige une personne qualifiée, appartenant ou non à l'établissement. Il n'impose pas systématiquement le recours à un organisme accrédité.",
        "Les résultats doivent être consignés et tenus à disposition. TraviXO conserve l'historique et le rend consultable machine par machine.",
      ],
    },
    {
      kind: "pricing",
      heading: "Tarifs",
      paragraphs: [
        "Gestion de parc à partir de 490 €/mois. Le pilotage VGP est disponible avec l'offre Professional, à 1 200 €/mois.",
      ],
      linkLabel: "Voir les tarifs",
    },
  ],

  faq: [
    {
      question: "Qu'est-ce qu'un logiciel de suivi VGP ?",
      answer:
        "Un logiciel de suivi VGP centralise les échéances de vérification générale périodique de vos matériels, conserve les rapports de contrôle, et alerte avant qu'une échéance ne tombe. Il remplace le suivi par tableur, qui ne prévient de rien et se désynchronise dès que plusieurs personnes le modifient.",
    },
    {
      question: "TraviXO réalise-t-il les vérifications ?",
      answer:
        "Non. Les vérifications sont réalisées par des personnes qualifiées, internes ou externes à l'entreprise, au sens de l'article R.4323-24 du Code du travail. Un organisme accrédité n'est pas systématiquement exigé. TraviXO planifie les échéances, conserve les rapports et vous alerte avant les dates limites.",
    },
    {
      question: "Peut-on importer un suivi VGP existant ?",
      answer:
        "Oui. Vous chargez votre fichier tel qu'il est. Les colonnes Numéro de série, Emplacement ou Date d'achat sont reconnues automatiquement, y compris avec des en-têtes en français, abrégés ou irréguliers.",
    },
    {
      question: "Comment sont générés les rapports de contrôle ?",
      answer:
        "En un clic depuis la fiche matériel ou depuis le tableau de bord, en PDF ou Excel, avec l'historique complet des vérifications.",
    },
    {
      question: "Quelle est la différence avec notre ERP ?",
      answer:
        "TraviXO ne remplace pas votre ERP. Il relie ce que l'ERP ne relie pas : la machine physique, sa conformité, ses documents et sa traçabilité terrain.",
    },
  ],

  related: [
    {
      label:
        "Loueur de matériel ? La page dédiée couvre la traçabilité des sorties et retours.",
      routeKey: "softwareRental",
    },
    {
      label: "Pour le suivi du parc complet.",
      routeKey: "softwareFleet",
    },
  ],

  cta: {
    heading: "Voir TraviXO sur votre parc",
    label: "Demander une démonstration",
  },
};

export default page;
