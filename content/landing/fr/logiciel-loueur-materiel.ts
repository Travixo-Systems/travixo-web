import type { LandingPage } from "../types";

// Copy validated 19/08/2026 (copybofufr v2).
//
// Positioning: the differentiator is not "QR plus documents", which ShareMat
// already communicates on its own /loueurs page. It is the operational
// timeline linking departure, holder, return, observed condition, documents
// and VGP deadline.
//
// The FAQ entry on what a locataire sees when scanning is deliberately absent:
// VERIF-B is unresolved, and describing an access model that may not exist
// would be a false capability claim. Add it once the product answer is known.
const page: LandingPage = {
  routeKey: "softwareRental",
  locale: "fr",

  title: "Logiciel pour loueur de matériel BTP | TraviXO",
  description:
    "Logiciel pour loueurs de matériel : sortie, retour, état constaté, chaque passage de main laisse une trace horodatée. VGP et documents reliés à la machine.",

  h1: "Logiciel pour loueur de matériel : chaque passage de main laisse une trace",
  subtitle:
    "Sortie, retour, état constaté. Une trace horodatée est enregistrée au moment du scan, avec les éléments nécessaires pour documenter la sortie ou le retour en cas de contestation.",

  sections: [
    {
      kind: "prose",
      heading: "Le litige se joue sur ce que vous pouvez montrer",
      paragraphs: [
        "Un client conteste un choc. Ou une date de retour. Ou l'état dans lequel la machine est partie.",
        "Lorsqu'un bon de sortie papier est difficile à retrouver ou à relier au bon matériel, reconstituer les faits devient lent et incertain. Et si la machine est partie sans son dernier rapport VGP, le problème n'est plus seulement commercial.",
      ],
    },
    {
      kind: "blocks",
      heading: "Sortie, retour, état : trois scans, une chronologie",
      items: [
        {
          title: "Départ chez le client",
          body: "Quand le matériel quitte le dépôt, un scan crée un événement horodaté : qui l'a sorti, quand, avec quelles remarques.",
        },
        {
          title: "Retour avec état constaté",
          body: "Au retour, un second scan enregistre l'état du matériel, avec notes et photos si besoin.",
        },
        {
          title: "Chronologie complète",
          body: "Chaque matériel affiche son parcours : qui l'a eu, sur quelle période, dans quel état il a été restitué, et où en est sa prochaine échéance VGP.",
        },
      ],
    },
    {
      kind: "quote",
      heading: "La machine part avec ses documents",
      lead: "La réglementation demande que certains documents accompagnent la machine louée : la notice d'instructions, le rapport de première mise en service, le dernier rapport de vérification périodique et l'historique des vérifications doivent être placés sur l'appareil ou à proximité.",
      quote:
        "A cet effet, il doit être placé sur l'appareil, ou à défaut à proximité, avec la notice d'instructions, les copies des rapports de vérification de première mise en service et de la dernière vérification périodique ainsi que l'historique des vérifications périodiques effectuées.",
      citation: "Arrêté du 1er mars 2004, article 15-II",
      paragraphs: [
        "TraviXO centralise ces documents par machine et permet de les retrouver immédiatement par QR code. Vous conservez ainsi un accès structuré aux éléments nécessaires pour préparer chaque départ et répondre à une demande de contrôle.",
      ],
    },
    {
      kind: "prose",
      heading: "Qui porte la VGP pendant la location",
      paragraphs: [
        "Le loueur doit avoir maintenu les vérifications périodiques dans les délais depuis la première mise en location, et fournir avec la machine les rapports et l'historique mentionnés ci-dessus. L'entreprise utilisatrice, en tant qu'employeur, reste tenue de faire procéder aux vérifications de ses équipements de travail (article R.4323-23 du Code du travail).",
        "En pratique, cela veut dire que le loueur doit pouvoir produire l'état documentaire de la machine au moment où elle part, et savoir à tout moment quelles machines en location approchent de leur échéance.",
      ],
    },
    {
      kind: "pricing",
      heading: "Tarifs",
      paragraphs: [
        "Offres à partir de 490 €/mois. Le pilotage VGP est inclus à partir de l'offre Professional, à 1 200 €/mois.",
      ],
      linkLabel: "Voir les tarifs",
    },
  ],

  faq: [
    {
      question: "Comment la sortie et le retour sont-ils documentés ?",
      answer:
        "Par un scan à la sortie et un scan au retour. Chaque scan enregistre l'opérateur, l'horodatage, les remarques et l'état constaté.",
    },
    {
      question: "Peut-on ajouter des photos au retour ?",
      answer:
        "Oui, des notes et des photos peuvent être jointes à l'événement de retour.",
    },
    {
      question: "Que se passe-t-il si une VGP expire pendant une location ?",
      answer:
        "Une alerte de rappel part assez tôt pour organiser le retour et planifier le contrôle avant l'échéance.",
    },
    {
      question: "Faut-il équiper les machines de boîtiers ?",
      answer:
        "Non. Le suivi repose sur des QR codes imprimés sur étiquettes adhésives standard, pas sur du matériel embarqué.",
    },
  ],

  related: [
    {
      label: "Pour le suivi des échéances réglementaires.",
      routeKey: "softwareVgp",
    },
    {
      label: "Pour la gestion du parc complet.",
      routeKey: "softwareFleet",
    },
  ],

  cta: {
    heading: "Voir TraviXO sur votre parc",
    label: "Demander une démonstration",
  },
};

export default page;
