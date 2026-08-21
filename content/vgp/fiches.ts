import type { Checkpoints, Fiche, Source } from "./types";

/**
 * Sources, declared once. Every fiche points at these rather than restating
 * them, so a correction to the reference propagates everywhere.
 */
export const ARRETE_2004: Source = {
  label: "Arrêté du 1er mars 2004, articles 20, 22 et 23",
  url: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000439029",
  consultedOn: "2026-08-19",
};

export const ARRETE_2004_ART_15: Source = {
  label: "Arrêté du 1er mars 2004, article 15-II",
  url: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000439029",
  consultedOn: "2026-08-19",
};

export const CODE_TRAVAIL_R4323_23: Source = {
  label: "Code du travail, article R.4323-23",
  url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000018531479/2008-05-01",
  consultedOn: "2026-08-19",
};

export const CODE_TRAVAIL_R4323_24: Source = {
  label: "Code du travail, article R.4323-24",
  url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000018531477",
  consultedOn: "2026-08-19",
};

/**
 * The second regime. The arrêté du 5 mars 1993 covers machines that are not
 * appareils de levage, so it answers the question the 2004 arrêté leaves open:
 * a pelle that is not equipped for lifting.
 *
 * Read on the primary text 20/08/2026, which corrected two points the earlier
 * secondary source had dropped: article 2 applies only "à conducteur porté",
 * and article 1er applies only to machines powered otherwise than by direct
 * human force and loaded or unloaded manually in the production phase.
 */
const ARRETE_1993_URL =
  "https://www.legifrance.gouv.fr/loda/id/LEGITEXT000006060118";

export const ARRETE_1993_ART_1: Source = {
  label: "Arrêté du 5 mars 1993, article 1er",
  url: ARRETE_1993_URL,
  consultedOn: "2026-08-20",
};

export const ARRETE_1993_ART_2: Source = {
  label: "Arrêté du 5 mars 1993, article 2",
  url: ARRETE_1993_URL,
  consultedOn: "2026-08-20",
};

export const ARRETE_1993_ART_3: Source = {
  label: "Arrêté du 5 mars 1993, article 3",
  url: ARRETE_1993_URL,
  consultedOn: "2026-08-20",
};

/**
 * Article 3, transcribed. The text lists the same checks for every machine of
 * articles 1er and 2, so this is declared once and shared rather than restated
 * per fiche. Nothing equivalent exists in the 2004 arrêté, which is why fiches
 * under the levage-2004 regime carry no checkpoints.
 */
export const CHECKPOINTS_1993: Checkpoints = {
  scope:
    "Les vérifications portent sur l'ensemble des éléments dont la détérioration est susceptible de créer un danger. L'article 3 les limite aux parties visibles et aux éléments accessibles par démontage des carters ou capots.",
  groups: [
    {
      heading: "État physique du matériel, par examen visuel",
      items: [
        "Stabilité de la machine et de ses équipements, fixation des éléments qui pourraient tomber ou être projetés",
        "Fixation des éléments de protection",
        "État des matériaux, notamment détection des fissures, déformations et oxydations anormales",
        "État de propreté, notamment accumulation de poussières, de déchets, de copeaux",
        "État des filtres et des échappements",
        "État des liaisons et des raccordements électriques, hydrauliques et pneumatiques",
      ],
    },
    {
      heading: "Éléments fonctionnels, par essais de fonctionnement",
      items: [
        "Présence et fonctionnement des dispositifs de protection dans tous les modes de fonctionnement",
        "Caractéristiques anormales de fonctionnement, notamment bruit, vibrations, température, chocs",
        "Fonctionnement des dispositifs d'arrêt automatiques ou à actionnement volontaire",
        "Fonctionnement des dispositifs d'arrêt associés à une fonction de protection",
      ],
    },
    {
      heading: "Réglages et jeux",
      items: [
        "Niveau des fluides",
        "Pression d'air, d'huile",
        "État des ressorts, notamment dans les dispositifs de freinage et d'embrayage",
        "Appréciation des jeux anormaux dans les organes mécaniques de commande",
        "État des pièces d'usure, notamment garnitures de freins et d'embrayage",
        "Réglage des fins de course",
      ],
    },
    {
      heading: "État des indicateurs",
      items: [
        "État des appareils de mesure, notamment manomètres, thermomètres, tachymètres",
        "État des dispositifs de signalisation, notamment voyants et inscriptions",
      ],
    },
  ],
  source: ARRETE_1993_ART_3,
};

/** Verbatim, quoted on every fiche. The obligation the product answers. */
export const ART_15_QUOTE =
  "A cet effet, il doit être placé sur l'appareil, ou à défaut à proximité, avec la notice d'instructions, les copies des rapports de vérification de première mise en service et de la dernière vérification périodique ainsi que l'historique des vérifications périodiques effectuées.";

const SIX_MONTHS_BASIS =
  "Cet appareil figure à la liste du II de l'article 20 de l'arrêté du 1er mars 2004. L'article 23 ramène sa périodicité à six mois, contre douze mois pour la règle générale.";

export const FICHES: Fiche[] = [
  {
    slug: "nacelle-pemp",
    name: "Nacelle élévatrice (PEMP)",
    category: "nacelle",
    regime: "levage-2004",
    title: "VGP nacelle et PEMP : périodicité et obligations | TraviXO",
    description:
      "Périodicité de la VGP des plates-formes élévatrices mobiles de personnes : six mois, fondement réglementaire et obligations du loueur.",
    h1: "VGP d'une nacelle élévatrice (PEMP)",
    intro:
      "Les plates-formes élévatrices mobiles de personnes figurent nommément à la liste du II de l'article 20 de l'arrêté du 1er mars 2004. Leur vérification générale périodique est semestrielle.",
    periodicity: {
      months: 6,
      basis:
        "Les plates-formes élévatrices mobiles de personnes sont citées explicitement au II de l'article 20 de l'arrêté du 1er mars 2004. L'article 23 fixe pour ces appareils une périodicité de six mois.",
      source: ARRETE_2004,
    },
    faq: [
      {
        question: "Tous les six mois ou tous les douze mois ?",
        answer:
          "Six mois. La règle générale de l'article 23 est de douze mois, mais elle est ramenée à six mois pour les appareils énumérés aux II et III de l'article 20, dont les plates-formes élévatrices mobiles de personnes.",
      },
      {
        question: "Faut-il un organisme accrédité pour une nacelle ?",
        answer:
          "Le texte ne l'impose pas. L'article R.4323-24 du Code du travail confie les vérifications à des personnes qualifiées, appartenant ou non à l'établissement, dont la liste est tenue à disposition de l'inspection du travail.",
      },
    ],
  },

  {
    slug: "chariot-elevateur",
    name: "Chariot élévateur",
    category: "chariot",
    regime: "levage-2004",
    title: "VGP chariot élévateur : périodicité de six mois | TraviXO",
    description:
      "Périodicité de la VGP d'un chariot élévateur : six mois. Fondement réglementaire, qui peut vérifier, et documents à fournir en location.",
    h1: "VGP d'un chariot élévateur",
    intro:
      "Les chariots élévateurs figurent à la liste du II de l'article 20 de l'arrêté du 1er mars 2004. Leur vérification générale périodique est semestrielle.",
    periodicity: {
      months: 6,
      basis: SIX_MONTHS_BASIS,
      source: ARRETE_2004,
    },
    faq: [
      {
        question: "La périodicité change-t-elle selon l'usage du chariot ?",
        answer:
          "La liste du II de l'article 20 vise les chariots élévateurs sans distinguer l'intensité d'usage. La périodicité réglementaire reste de six mois. Un usage intensif peut justifier des contrôles plus fréquents, mais cela relève de la politique de maintenance et non du minimum réglementaire.",
      },
      {
        question: "Un chariot en location suit-il la même règle ?",
        answer:
          "Oui pour la périodicité. En location s'ajoute l'obligation documentaire de l'article 15-II : la notice, le rapport de première mise en service, le dernier rapport de vérification et l'historique doivent être placés sur l'appareil ou à proximité.",
      },
    ],
  },

  {
    slug: "grue-auxiliaire-chargement",
    name: "Grue auxiliaire de chargement",
    category: "levage",
    regime: "levage-2004",
    title: "VGP grue auxiliaire de chargement : six mois | TraviXO",
    description:
      "Périodicité de la VGP d'une grue auxiliaire de chargement sur véhicule : six mois, avec le fondement réglementaire exact.",
    h1: "VGP d'une grue auxiliaire de chargement",
    intro:
      "Les grues auxiliaires de chargement sur véhicules ouvrent la liste du II de l'article 20 de l'arrêté du 1er mars 2004. Leur vérification générale périodique est semestrielle.",
    periodicity: {
      months: 6,
      basis: SIX_MONTHS_BASIS,
      source: ARRETE_2004,
    },
    faq: [
      {
        question: "La grue et le véhicule porteur suivent-ils le même régime ?",
        answer:
          "Non. L'arrêté du 1er mars 2004 porte sur l'appareil de levage. Le véhicule porteur relève des obligations propres aux véhicules, distinctes de la VGP de levage.",
      },
    ],
  },

  {
    slug: "engin-terrassement-levage",
    name: "Engin de terrassement équipé pour le levage",
    category: "engin",
    regime: "levage-2004",
    title: "VGP engin de terrassement équipé pour le levage | TraviXO",
    description:
      "Un engin de terrassement équipé pour le levage relève de la VGP semestrielle. Le point qui distingue ces engins des autres, et sa source.",
    h1: "VGP d'un engin de terrassement équipé pour le levage",
    intro:
      "C'est l'équipement pour le levage qui fait basculer l'engin dans le champ de l'arrêté du 1er mars 2004, pas l'engin lui-même. Une pelle équipée pour la manutention n'est pas soumise au même régime qu'une pelle qui ne l'est pas.",
    periodicity: {
      months: 6,
      basis:
        "Le II de l'article 20 de l'arrêté du 1er mars 2004 vise les engins de terrassement équipés pour le levage. L'article 23 fixe pour ces appareils une périodicité de six mois.",
      source: ARRETE_2004,
    },
    notes: [
      {
        text: "Un engin de terrassement sans fonction de levage ne relève pas de l'arrêté du 1er mars 2004. S'il est à conducteur porté, il relève de l'article 2 de l'arrêté du 5 mars 1993, qui fixe une périodicité de douze mois.",
        source: ARRETE_1993_ART_2,
      },
    ],
    related: ["engin-terrassement-conducteur-porte"],
    faq: [
      {
        question: "Ma pelle est-elle concernée ?",
        answer:
          "Elle l'est si elle est équipée pour le levage, par exemple avec un crochet de manutention. C'est cet équipement qui la fait entrer dans la liste du II de l'article 20, et donc dans la périodicité de six mois.",
      },
      {
        question: "Et si je retire l'équipement de levage ?",
        answer:
          "La machine sort alors de la liste du II de l'article 20 de l'arrêté du 1er mars 2004. Si elle est à conducteur porté, elle relève de l'article 2 de l'arrêté du 5 mars 1993 et de sa périodicité de douze mois. Ce sont deux textes distincts, et c'est la présence de l'équipement de levage qui détermine lequel s'applique.",
      },
    ],
  },

  {
    slug: "hayon-elevateur",
    name: "Hayon élévateur",
    category: "levage",
    regime: "levage-2004",
    title: "VGP hayon élévateur : périodicité de six mois | TraviXO",
    description:
      "Périodicité de la VGP d'un hayon élévateur : six mois, au titre de la liste du II de l'article 20 de l'arrêté du 1er mars 2004.",
    h1: "VGP d'un hayon élévateur",
    intro:
      "Les hayons élévateurs figurent à la liste du II de l'article 20 de l'arrêté du 1er mars 2004, au même titre que les monte-matériaux de chantier. Leur vérification générale périodique est semestrielle.",
    periodicity: {
      months: 6,
      basis: SIX_MONTHS_BASIS,
      source: ARRETE_2004,
    },
    faq: [
      {
        question: "Les monte-matériaux de chantier suivent-ils la même règle ?",
        answer:
          "Oui. Les monte-matériaux de chantier figurent à la même liste du II de l'article 20 et relèvent donc de la même périodicité de six mois.",
      },
    ],
  },

  {
    slug: "pont-roulant-palan",
    name: "Pont roulant, palan et potence",
    category: "levage",
    regime: "levage-2004",
    title: "VGP pont roulant et palan : périodicité de douze mois | TraviXO",
    description:
      "Les appareils de levage non listés au II de l'article 20 relèvent de la règle générale de douze mois. Fondement et portée.",
    h1: "VGP d'un pont roulant, d'un palan ou d'une potence",
    intro:
      "Ces appareils ne figurent pas à la liste du II de l'article 20 de l'arrêté du 1er mars 2004. Ils relèvent donc de la règle générale de l'article 23, et non de la périodicité réduite.",
    periodicity: {
      months: 12,
      basis:
        "L'article 23 de l'arrêté du 1er mars 2004 dispose que la vérification générale périodique des appareils de levage soumis à l'article 22 a lieu tous les douze mois. La réduction à six mois vise les appareils énumérés aux II et III de l'article 20, dont ceux-ci ne font pas partie.",
      source: ARRETE_2004,
    },
    faq: [
      {
        question: "Pourquoi douze mois et non six ?",
        answer:
          "Parce que la périodicité de six mois est une exception réservée aux appareils énumérés aux II et III de l'article 20. Un pont roulant fixe n'y figure pas, il reste donc sous la règle générale de douze mois.",
      },
    ],
  },

  // Arrêté du 5 mars 1993. Different text, different logic: the obligation is
  // written as a condition of use ("depuis moins de N mois au moment de leur
  // utilisation") rather than as a calendar plan, and article 3 enumerates the
  // checks, which the 2004 arrêté does not.
  {
    slug: "engin-terrassement-conducteur-porte",
    name: "Engin de terrassement à conducteur porté",
    category: "engin",
    regime: "machines-1993",
    title: "VGP engin de terrassement : périodicité de douze mois | TraviXO",
    description:
      "Pelle, chargeuse ou tractopelle sans équipement de levage : la VGP est annuelle au titre de l'article 2 de l'arrêté du 5 mars 1993. Texte exact et points de contrôle.",
    h1: "VGP d'un engin de terrassement à conducteur porté",
    intro:
      "Une pelle, une chargeuse ou une tractopelle qui n'est pas équipée pour le levage ne relève pas de l'arrêté du 1er mars 2004, mais de l'arrêté du 5 mars 1993. La vérification y est annuelle, et le texte pose une condition inhabituelle : l'échéance se mesure au moment de l'utilisation de la machine.",
    periodicity: {
      months: 12,
      basis:
        "L'article 2 de l'arrêté du 5 mars 1993 vise les machines mobiles d'extraction, de terrassement, d'excavation ou de forage du sol à conducteur porté. Ces équipements doivent avoir fait l'objet de la vérification générale périodique depuis moins de douze mois au moment de leur utilisation.",
      source: ARRETE_1993_ART_2,
    },
    checkpoints: CHECKPOINTS_1993,
    notes: [
      {
        text: "Le texte vise les machines à conducteur porté. Une machine de terrassement conduite à pied ou télécommandée ne figure pas dans cette liste et ne relève donc pas de l'article 2 sur ce fondement.",
        source: ARRETE_1993_ART_2,
      },
      {
        text: "L'article 2 énumère quatre opérations : extraction, terrassement, excavation, forage du sol. Une machine qui ne fait que compacter, comme un rouleau compacteur, n'y est pas nommée. Faites qualifier ce cas par la personne qualifiée qui réalise la vérification plutôt que de le trancher depuis la seule liste.",
        source: ARRETE_1993_ART_2,
      },
    ],
    related: ["engin-terrassement-levage", "machine-battre-palplanches"],
    faq: [
      {
        question:
          "Ma pelle relève-t-elle de l'arrêté de 1993 ou de celui de 2004 ?",
        answer:
          "Cela dépend de son équipement. Équipée pour le levage, elle figure au II de l'article 20 de l'arrêté du 1er mars 2004 et sa vérification est semestrielle. Sans équipement de levage, et si elle est à conducteur porté, elle relève de l'article 2 de l'arrêté du 5 mars 1993 et sa vérification est annuelle.",
      },
      {
        question:
          "Que veut dire « depuis moins de douze mois au moment de leur utilisation » ?",
        answer:
          "Que l'obligation est rédigée comme une condition d'utilisation, et non comme un calendrier de maintenance. Une machine dont la dernière vérification date de plus de douze mois ne doit pas être utilisée avant d'avoir été vérifiée à nouveau. C'est la formulation exacte de l'article 2.",
      },
      {
        question: "Sur quoi porte concrètement la vérification ?",
        answer:
          "L'article 3 de l'arrêté du 5 mars 1993 en donne la liste : état physique du matériel par examen visuel, essais de fonctionnement des éléments concourant au travail, réglages et jeux, état des indicateurs. Le texte limite lui-même ces vérifications aux parties visibles et aux éléments accessibles par démontage des carters ou capots.",
      },
    ],
  },

  {
    slug: "machine-battre-palplanches",
    name: "Machine à battre les palplanches",
    category: "engin",
    regime: "machines-1993",
    title: "VGP machine à battre les palplanches : douze mois | TraviXO",
    description:
      "Les machines à battre les palplanches relèvent de la vérification annuelle de l'article 2 de l'arrêté du 5 mars 1993. Fondement et points de contrôle.",
    h1: "VGP d'une machine à battre les palplanches",
    intro:
      "Les machines à battre les palplanches sont nommées à l'article 2 de l'arrêté du 5 mars 1993, dans la même phrase que les machines mobiles de terrassement à conducteur porté. Leur vérification générale périodique est annuelle.",
    periodicity: {
      months: 12,
      basis:
        "L'article 2 de l'arrêté du 5 mars 1993 cite les machines à battre les palplanches. Ces équipements doivent avoir fait l'objet de la vérification générale périodique depuis moins de douze mois au moment de leur utilisation.",
      source: ARRETE_1993_ART_2,
    },
    checkpoints: CHECKPOINTS_1993,
    notes: [
      {
        text: "L'article 2 cite les machines à battre les palplanches après les machines mobiles de terrassement à conducteur porté, sans reprendre ce qualificatif. Sur une machine précise, faites trancher le point de rattachement par la personne qualifiée qui réalise la vérification.",
        source: ARRETE_1993_ART_2,
      },
    ],
    related: ["engin-terrassement-conducteur-porte"],
    faq: [
      {
        question: "Douze mois, comme les engins de terrassement ?",
        answer:
          "Oui. Les deux catégories figurent dans la même phrase de l'article 2 de l'arrêté du 5 mars 1993 et relèvent donc de la même périodicité de douze mois.",
      },
      {
        question:
          "La machine est-elle aussi soumise à la VGP des appareils de levage ?",
        answer:
          "Elle l'est pour sa fonction de levage si elle en comporte une et si elle entre dans le champ de l'arrêté du 1er mars 2004. Les deux textes n'ont pas le même objet : celui de 1993 vise la machine en tant que telle, celui de 2004 les appareils de levage.",
      },
    ],
  },

  {
    slug: "compacteur-dechets",
    name: "Compacteur à déchets",
    category: "divers",
    regime: "machines-1993",
    title: "VGP compacteur à déchets : périodicité de trois mois | TraviXO",
    description:
      "Compacteurs à déchets et systèmes de compactage des véhicules de collecte : vérification trimestrielle, sous deux conditions cumulatives posées par le texte.",
    h1: "VGP d'un compacteur à déchets",
    intro:
      "Trois mois, et non six ou douze. Les compacteurs à déchets figurent à l'article 1er de l'arrêté du 5 mars 1993, qui porte la périodicité la plus courte du dispositif. Deux conditions cumulatives en limitent toutefois le champ.",
    periodicity: {
      months: 3,
      basis:
        "L'article 1er de l'arrêté du 5 mars 1993 cite les compacteurs à déchets et les systèmes de compactage des véhicules de collecte d'ordures ou de déchets. Ces équipements doivent avoir fait l'objet de la vérification générale périodique depuis moins de trois mois au moment de leur utilisation.",
      source: ARRETE_1993_ART_1,
    },
    checkpoints: CHECKPOINTS_1993,
    notes: [
      {
        text: "Le même article restreint son champ : ne sont soumis à la vérification que les équipements mus par une source d'énergie autre que la force humaine employée directement, et dont le chargement ou le déchargement est effectué manuellement en phase de production. Les deux conditions sont cumulatives.",
        source: ARRETE_1993_ART_1,
      },
      {
        text: "Lorsque l'équipement n'est utilisé que pendant des campagnes saisonnières et que la période d'intercampagnes dépasse trois mois, une seule vérification est requise pendant cette période. La remise en service au début de la campagne suivante doit être précédée d'un essai permettant de s'assurer du fonctionnement en sécurité.",
        source: ARRETE_1993_ART_1,
      },
    ],
    related: ["engin-terrassement-conducteur-porte"],
    faq: [
      {
        question: "Pourquoi trois mois alors que la plupart des engins sont à douze ?",
        answer:
          "Parce que l'article 1er de l'arrêté du 5 mars 1993 traite d'équipements dont le chargement ou le déchargement se fait manuellement pendant la production, ce qui expose un opérateur à la partie active de la machine. Les équipements de l'article 2, dont les engins de terrassement à conducteur porté, sont à douze mois.",
      },
      {
        question: "Un compacteur chargé et déchargé mécaniquement est-il concerné ?",
        answer:
          "Le texte soumet à la vérification les équipements dont le chargement ou le déchargement est effectué manuellement en phase de production. Si ni l'un ni l'autre ne l'est, cette condition n'est pas remplie. C'est un point à faire qualifier sur l'installation réelle plutôt que sur le seul type de machine.",
      },
      {
        question: "Et si la machine ne tourne que quelques mois par an ?",
        answer:
          "L'article 1er prévoit ce cas. Si l'équipement n'est utilisé que pendant des campagnes saisonnières et que la période d'intercampagnes dépasse trois mois, une seule vérification est requise pendant cette période. La remise en service au début de la campagne suivante doit être précédée d'un essai de fonctionnement en sécurité.",
      },
    ],
  },
];

export function getFiche(slug: string): Fiche | undefined {
  return FICHES.find((f) => f.slug === slug);
}
