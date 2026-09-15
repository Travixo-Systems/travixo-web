import type { LandingPage } from "../types";

// SEO doorway. routeKey, h1, title and description are FROZEN: they carry the
// existing keyword targeting and are asserted byte-identical to origin/main by
// scripts/check-doorway-frozen.mjs. Only the body below was rewritten.
//
// Structure follows verified search intent (DECISIONS.md S-1, D-9). The VGP
// cluster splits: "logiciel VGP" is commercial, "suivi VGP" leans
// problem-aware, and bare "VGP" is informational and held by inspection bodies
// rather than software vendors. The pages that bridge the two halves answer
// the regulation first. So this page resolves the regulatory question, then
// rises into the chain and hands off to /logiciel-loueur-materiel.
//
// Regulatory claims trace to content/reference/vgp-reglementation.md, primary
// text rows only, and to the Legifrance URLs logged in DECISIONS.md S-2/S-3/S-4.
// Compresseurs and groupes electrogenes are never presented as VGP levage
// equipment: they fall under other regimes entirely.
const page: LandingPage = {
  routeKey: "softwareVgp",
  locale: "fr",

  title: "Logiciel VGP : suivi des vérifications périodiques | TraviXO",
  description:
    "Suivez les VGP de tout votre parc au même endroit. Échéances, alertes, rapports de vérification et historique reliés à chaque machine.",

  h1: "Logiciel de suivi VGP pour parcs de matériel",
  shortLabel: "Logiciel de suivi VGP",
  subtitle:
    "Échéances, rapports de vérification et historique reliés à chaque machine. Vous savez à tout moment ce qui est dans les délais, ce qui arrive à échéance, et ce qui ne peut plus sortir.",

  sections: [
    {
      kind: "prose",
      heading: "Ce qu'est une VGP, et ce que le texte exige",
      paragraphs: [
        "La vérification générale périodique est une obligation de l'employeur au titre de l'article R.4323-23 du Code du travail. Cet article ne fixe pas lui-même les périodicités : il prévoit que des arrêtés ministériels désignent les équipements concernés et précisent la périodicité, la nature et le contenu des vérifications.",
        "Deux textes couvrent l'essentiel d'un parc de travaux publics. L'arrêté du 1er mars 2004 régit les appareils de levage. L'arrêté du 5 mars 1993 régit d'autres machines, dont les engins de terrassement à conducteur porté.",
        "Une précision qui change l'organisation du suivi : la vérification est réalisée par une personne qualifiée, appartenant ou non à l'établissement (article R.4323-24). En règle générale, ce texte n'impose pas le recours à un organisme accrédité, même si certaines catégories d'équipements relèvent d'exigences propres. Une compétence interne peut donc suffire, à condition que la liste des personnes qualifiées reste à disposition de l'inspection du travail.",
      ],
    },
    {
      kind: "bullets",
      heading: "Les périodicités, par famille d'équipement",
      lead: "Trois paliers, selon le texte applicable et la catégorie exacte de la machine. Le détail article par article figure sur la page des périodicités par type d'engin.",
      items: [
        {
          title: "Douze mois.",
          body: "La règle générale des appareils de levage (arrêté du 1er mars 2004, article 23), et les engins de terrassement à conducteur porté sans fonction de levage (arrêté du 5 mars 1993, article 2).",
        },
        {
          title: "Six mois.",
          body: "Les appareils énumérés au II de l'article 20 de l'arrêté du 1er mars 2004 : nacelles PEMP, chariots élévateurs, grues auxiliaires de chargement, hayons élévateurs, engins de terrassement équipés pour le levage, entre autres.",
        },
        {
          title: "Trois mois.",
          body: "Les appareils mus par la force humaine déplaçant un poste de travail en élévation, et les équipements de l'article 1er de l'arrêté du 5 mars 1993, sous les deux conditions cumulatives que ce texte pose.",
        },
      ],
    },
    {
      kind: "bullets",
      heading: "Pourquoi le suivi se perd, même quand les dates sont connues",
      lead: "Dans la plupart des parcs, l'information VGP existe. Elle est simplement répartie entre trois endroits qui ne se parlent pas.",
      items: [
        {
          title: "La date est quelque part.",
          body: "Dans un fichier, dans un logiciel de gestion, ou dans la tête de la personne qui suit le parc.",
        },
        {
          title: "Le rapport est ailleurs.",
          body: "Dans un dossier partagé, en pièce jointe d'un mail, ou en version papier au dépôt.",
        },
        {
          title: "La machine, elle, est encore ailleurs.",
          body: "C'est le point que le tableur ne traite pas : l'échéance tombe souvent pendant que la machine est chez un client, et rien ne relie la date à sa situation locative.",
        },
      ],
    },
    {
      kind: "blocks",
      heading: "Un suivi rattaché à la machine, pas à une ligne de tableur",
      lead: "TraviXO ne réalise pas la vérification à la place de la personne qualifiée. Il porte l'échéance, conserve le rapport et garde les deux attachés au matériel concerné.",
      items: [
        {
          title: "La périodicité portée par le matériel",
          body: "Chaque machine porte sa périodicité et sa prochaine échéance. Le calendrier se met à jour sans ressaisie.",
        },
        {
          title: "Rappels avant l'échéance",
          body: "Alertes par e-mail à J-30, J-7, J-1 et en dépassement. Vous voyez venir les échéances au lieu de les découvrir.",
        },
        {
          title: "Rapports reliés au matériel",
          body: "Les rapports PDF sont déposés sur la fiche de la machine. Un scan du QR code affiche le dernier rapport, sans chercher dans un dossier partagé.",
        },
        {
          title: "Historique prêt pour un contrôle",
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
      heading: "La VGP est un segment de la chaîne, pas le produit entier",
      paragraphs: [
        "Suivre les échéances ne suffit pas, parce que l'échéance n'est jamais le seul élément en jeu. Au moment où elle tombe, il faut aussi savoir où est la machine, qui l'a, quand elle revient, et si son dernier rapport est parti avec elle.",
        "C'est pourquoi TraviXO ne s'arrête pas au calendrier réglementaire. Le même système relie chaque matériel à ses locations, ses mouvements, ses documents et sa conformité, de la sortie au retour. Le suivi VGP est un segment de cette chaîne : celui qui répond de l'état réglementaire de la machine.",
        "Pour un loueur, cette différence est décisive : l'obligation documentaire de l'article 15-II de l'arrêté du 1er mars 2004 ne porte pas sur une date, mais sur des pièces qui doivent physiquement accompagner l'appareil de levage d'occasion donné en location.",
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
      question: "Qu'est-ce qu'un logiciel de suivi VGP ?",
      answer:
        "Un logiciel de suivi VGP centralise les échéances de vérification générale périodique de vos matériels, conserve les rapports de contrôle, et alerte avant qu'une échéance ne tombe. Il remplace le suivi par tableur, qui ne prévient de rien et se désynchronise dès que plusieurs personnes le modifient.",
    },
    {
      question: "Qui peut réaliser une VGP ?",
      answer:
        "Une personne qualifiée, appartenant ou non à l'établissement, au sens de l'article R.4323-24 du Code du travail. Elle doit être compétente dans le domaine de prévention des risques concerné et connaître les dispositions réglementaires applicables, et la liste de ces personnes est tenue à disposition de l'inspection du travail. En règle générale, cet article n'impose pas d'organisme accrédité ; certaines catégories d'équipements relèvent toutefois d'exigences propres.",
    },
    {
      question: "TraviXO réalise-t-il les vérifications ?",
      answer:
        "Non. TraviXO planifie les échéances, conserve les rapports et vous alerte avant les dates limites. La vérification elle-même reste l'affaire de la personne qualifiée.",
    },
    {
      question: "Quelle périodicité s'applique à un engin de terrassement ?",
      answer:
        "Cela dépend de son équipement. Un engin de terrassement équipé pour le levage figure au II de l'article 20 de l'arrêté du 1er mars 2004 : six mois. Un engin de terrassement à conducteur porté sans fonction de levage relève de l'article 2 de l'arrêté du 5 mars 1993 : douze mois. La qualification exacte de la machine décide, et elle revient à la personne qualifiée.",
    },
    {
      question: "Peut-on importer un suivi VGP existant ?",
      answer:
        "Oui. Vous chargez votre fichier tel qu'il est. Les colonnes Numéro de série, Emplacement ou Date d'achat sont reconnues automatiquement, y compris avec des en-têtes en français, abrégés ou irréguliers.",
    },
    {
      question: "Quelle est la différence avec notre ERP ?",
      answer:
        "TraviXO ne remplace pas votre ERP. Il relie ce que l'ERP ne relie pas : la machine physique, sa conformité, ses documents et sa traçabilité terrain.",
    },
  ],

  readMoreLabel: "Voir la page",

  related: [
    {
      label:
        "Loueur de matériel ? La chaîne complète, de la sortie au retour, avec l'obligation documentaire de l'article 15-II.",
      routeKey: "softwareRental",
    },
    {
      label: "Le même suivi vu du parc complet.",
      routeKey: "softwareFleet",
    },
  ],

  cta: {
    heading: "Voir TraviXO sur votre parc",
    label: "Demander une démonstration",
  },
};

export default page;
