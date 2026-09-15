import type { LandingPage } from "../types";

// Primary commercial landing. Repositioned 15/09/2026 onto the site-wide
// spine: the chain from depot to return, of which VGP is one segment.
//
// The page follows the chain in order rather than leading with features:
// PARC (what leaves), LOCATION (the handover), CONFORMITE (what must travel
// with it), PREUVE (what remains afterwards). A loueur reading top to bottom
// should recognise their own sequence, not a feature list.
//
// Regulatory scope is exact. Article 15-II governs appareils de levage
// d'occasion donnes en location, not rented equipment in general, and the
// obligation it creates runs in both directions: the hirer's own duty to ask
// is why producing the pack on demand is worth something commercially.
// Sources logged in DECISIONS.md, S-2 and S-4.
//
// The scan FAQ describes the unauthenticated view as observed on 20/08/2026,
// after the RLS migration: identity, location, status and last scan are shown,
// purchase price and book value are not, and writes require a login.
const page: LandingPage = {
  routeKey: "softwareRental",
  locale: "fr",

  title: "Logiciel pour loueur de matériel BTP | TraviXO",
  description:
    "Logiciel pour loueurs de matériel : sortie, retour, état constaté, chaque passage de main laisse une trace horodatée. VGP et documents reliés à la machine.",

  h1: "Logiciel pour loueur de matériel : la preuve part avec la machine",
  shortLabel: "Logiciel pour loueurs",
  subtitle:
    "Le matériel part chez le client. Ses documents, son état constaté et son échéance de vérification partent avec lui, et reviennent avec lui. Sortie, retour, litige : la réponse est déjà enregistrée.",

  sections: [
    {
      kind: "prose",
      heading: "La conformité est un problème de garde, pas de calendrier",
      paragraphs: [
        "Une échéance dans un tableur se surveille. Une machine chez un client se surveille moins bien : elle est partie avec un état, elle revient avec un autre, et entre les deux personne n'a la main sur elle.",
        "C'est là que les deux problèmes se rejoignent. Le litige commercial et l'écart de conformité viennent du même endroit : au moment où la machine change de mains, rien n'a été enregistré. Quand le client conteste un choc, une date de retour ou l'état de départ, la discussion porte sur ce que vous pouvez montrer. Et si la machine est partie sans son dernier rapport de vérification, le problème n'est plus seulement commercial.",
      ],
    },
    {
      kind: "blocks",
      heading: "Le parc : ce qui peut partir, et ce qui ne peut pas",
      lead: "Avant la location, il faut savoir ce dont vous disposez. Chaque matériel porte une fiche et un QR code, et son statut dit s'il est louable aujourd'hui.",
      items: [
        {
          title: "Une fiche par machine",
          body: "Désignation, catégorie, numéro de série, emplacement, statut. La fiche s'ouvre par scan du QR code, depuis n'importe quel téléphone et sans installer d'application.",
        },
        {
          title: "Votre fichier existant comme point de départ",
          body: "Le parc s'importe depuis le fichier que vous tenez aujourd'hui. Les colonnes sont reconnues même avec des en-têtes irréguliers, et les erreurs sont signalées avant validation.",
        },
        {
          title: "L'échéance portée par le matériel",
          body: "La périodicité de vérification est attachée à la machine, pas à une ligne de tableur tenue à côté. Ce qui approche de son échéance se voit sur le parc.",
        },
        {
          title: "Le statut avant la sortie",
          body: "Disponible, en location, en maintenance. Vous savez ce qui peut être engagé sur une commande avant de le promettre à un client.",
        },
      ],
    },
    {
      kind: "blocks",
      heading: "La location : trois scans, une chronologie",
      lead: "Le passage de main est le moment qui compte. Chaque scan écrit un événement daté, et ces événements mis bout à bout sont la chronologie de la machine.",
      items: [
        {
          title: "Départ chez le client",
          body: "Quand le matériel quitte le dépôt, un scan crée un événement horodaté : qui l'a sorti, quand, avec quelles remarques.",
        },
        {
          title: "Retour avec état constaté",
          body: "Au retour, un second scan enregistre l'état du matériel, avec notes et photos si besoin. L'écart entre l'état de départ et l'état de retour est documenté au moment où il se constate.",
        },
        {
          title: "Le parcours complet",
          body: "Chaque matériel affiche qui l'a eu, sur quelle période, dans quel état il a été restitué, et où en est sa prochaine échéance.",
        },
      ],
    },
    {
      kind: "quote",
      heading: "La conformité : ce qui doit voyager avec la machine",
      lead: "Pour les appareils de levage d'occasion donnés en location, l'arrêté du 1er mars 2004 ne demande pas seulement que les vérifications soient à jour. Il demande que les documents soient physiquement présents sur la machine ou à proximité.",
      quote:
        "A cet effet, il doit être placé sur l'appareil, ou à défaut à proximité, avec la notice d'instructions, les copies des rapports de vérification de première mise en service et de la dernière vérification périodique ainsi que l'historique des vérifications périodiques effectuées.",
      citation: "Arrêté du 1er mars 2004, article 15-II",
      paragraphs: [
        "Quatre pièces, donc : la notice d'instructions, le rapport de première mise en service, le dernier rapport de vérification périodique et l'historique des vérifications. Le même article prévoit par ailleurs que le chef de l'établissement utilisateur s'assure auprès du loueur que ces vérifications ont bien été effectuées. Votre client a une raison réglementaire de vous demander ce dossier.",
        "TraviXO rattache ces documents à la machine et les rend accessibles par scan du QR code. Le dossier se constitue au fil des vérifications au lieu d'être rassemblé au moment où on le réclame.",
      ],
    },
    {
      kind: "prose",
      heading: "Qui porte la vérification pendant la location",
      paragraphs: [
        "Le loueur doit avoir maintenu les vérifications périodiques dans les délais depuis la première mise en location, et fournir avec la machine les rapports et l'historique mentionnés ci-dessus. L'entreprise utilisatrice, en tant qu'employeur, reste tenue de faire procéder aux vérifications de ses équipements de travail (article R.4323-23 du Code du travail).",
        "Ces vérifications sont réalisées par une personne qualifiée, appartenant ou non à l'établissement (article R.4323-24). En règle générale, le recours à un organisme accrédité n'est pas exigé par ce texte ; certaines catégories d'équipements relèvent toutefois d'exigences propres.",
        "En pratique, cela veut dire deux choses pour un loueur : pouvoir produire l'état documentaire d'une machine au moment où elle part, et savoir à tout moment quelles machines en location approchent de leur échéance.",
      ],
    },
    {
      kind: "screenshot",
      heading: "La preuve : ce que voit celui qui scanne",
      lead: "La fiche machine ouverte depuis le QR code, sans compte : identité, emplacement, statut et dernier scan. Les prix d'achat ne sont pas affichés, et toute modification demande une connexion.",
      src: "/screenshots/scan-public.png",
      alt: "Fiche machine TraviXO ouverte par scan QR sans connexion : numéro de série, emplacement, statut, dernier scan",
      width: 667,
      height: 880,
      portrait: true,
    },
    {
      kind: "bullets",
      heading: "Une échéance qui tombe pendant une location",
      lead: "C'est le cas que le suivi par tableur détecte mal, parce qu'il demande de rapprocher deux informations tenues séparément : la date de vérification et la situation locative de la machine.",
      items: [
        {
          title: "Le rapprochement est fait pour vous.",
          body: "TraviXO recoupe les échéances avec les locations en cours. Une machine encore chez un client dont l'échéance approche ressort sans que personne ait à croiser deux fichiers.",
        },
        {
          title: "L'alerte part assez tôt pour agir.",
          body: "Le rappel arrive avec de la marge pour organiser le retour et planifier le contrôle, plutôt qu'au moment où l'échéance est déjà passée.",
        },
        {
          title: "Le conflit de dates est signalé.",
          body: "Au moment de planifier le contrôle, l'application compare l'échéance à la date de retour prévue et signale le cas où le contrôle tombe avant le retour. Vous choisissez alors de rappeler la machine ou d'organiser une intervention sur site.",
        },
      ],
    },
    {
      kind: "prose",
      heading: "TraviXO ne remplace pas votre ERP",
      paragraphs: [
        "Votre ERP connaît le contrat et la facturation. Il ne connaît généralement pas l'état dans lequel la machine est revenue, ni où se trouve son dernier rapport de vérification. TraviXO relie la machine physique à ses locations, ses mouvements, ses documents et sa conformité, sans dépendance à un ERP particulier et sans changer vos outils existants.",
      ],
    },
    {
      kind: "pricing",
      heading: "Tarifs",
      paragraphs: [
        "179 € par mois, 100 matériels inclus et utilisateurs illimités. TVA non applicable, art. 293 B du CGI. Le pilotage VGP fait partie du produit, sans supplément. Au-delà de 100 matériels, le tarif suit une grille dégressive.",
      ],
      linkLabel: "Voir les tarifs",
    },
  ],

  faqTitle: "Questions fréquentes",

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
      question: "Quels documents doivent accompagner une machine louée ?",
      answer:
        "Pour les appareils de levage d'occasion donnés en location, l'article 15-II de l'arrêté du 1er mars 2004 demande que soient placés sur l'appareil ou à proximité : la notice d'instructions, le rapport de vérification de première mise en service, le dernier rapport de vérification périodique et l'historique des vérifications. Les autres catégories de matériel relèvent de régimes différents.",
    },
    {
      question: "Que se passe-t-il si une échéance approche sur une machine en location ?",
      answer:
        "Une alerte de rappel part assez tôt pour organiser le retour et planifier le contrôle. Au moment de planifier ce contrôle, l'application compare l'échéance à la date de retour prévue et signale le cas où le contrôle tombe avant le retour, avec la possibilité de rappeler la machine ou d'organiser une intervention sur site.",
    },
    {
      question: "Que voit un locataire qui scanne le QR code sans compte ?",
      answer:
        "La fiche de la machine : désignation, catégorie, numéro de série, emplacement, statut et description, ainsi que la date et le lieu du dernier scan. Les prix d'achat et les valeurs comptables ne sont jamais affichés. La modification du statut ou de l'emplacement demande une connexion.",
    },
    {
      question: "Faut-il équiper les machines de boîtiers ?",
      answer:
        "Non. Le suivi repose sur des QR codes imprimés sur étiquettes adhésives standard, pas sur du matériel embarqué.",
    },
  ],

  readMoreLabel: "Voir la page",

  related: [
    {
      label: "Le détail du suivi des échéances réglementaires.",
      routeKey: "softwareVgp",
    },
    {
      label: "Le même système vu du parc complet.",
      routeKey: "softwareFleet",
    },
  ],

  cta: {
    heading: "Voir la chaîne sur votre propre parc",
    label: "Demander une démonstration",
  },
};

export default page;
