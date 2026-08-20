import type { Fiche, Source } from "./types";

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
        text: "Un engin de terrassement sans fonction de levage ne relève pas de l'arrêté du 1er mars 2004 mais d'un autre texte. La périodicité applicable dans ce cas n'est pas traitée ici, faute de vérification sur le texte primaire.",
      },
    ],
    faq: [
      {
        question: "Ma pelle est-elle concernée ?",
        answer:
          "Elle l'est si elle est équipée pour le levage, par exemple avec un crochet de manutention. C'est cet équipement qui la fait entrer dans la liste du II de l'article 20, et donc dans la périodicité de six mois.",
      },
    ],
  },

  {
    slug: "hayon-elevateur",
    name: "Hayon élévateur",
    category: "levage",
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
];

export function getFiche(slug: string): Fiche | undefined {
  return FICHES.find((f) => f.slug === slug);
}
