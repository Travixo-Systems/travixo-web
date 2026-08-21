import type { Source } from "./types";
import {
  ARRETE_2004,
  ARRETE_1993_ART_1,
  ARRETE_1993_ART_2,
} from "./fiches";

/**
 * The periodicity table, as a flat list.
 *
 * content/vgp/fiches.ts holds the pages: one entry per equipment type that has
 * enough to say to justify a page of its own. This file holds the lookup, and
 * it is deliberately more complete than the fiches: it transcribes the full
 * enumeration of both arrêtés, not only the entries a BTP fleet meets daily.
 * A reference that stops at the common cases sends the reader elsewhere for
 * the uncommon one, which is the moment it stops being worth keeping.
 *
 * It exists because the Excel tracker needs a machine-readable table, and a
 * second hand-maintained copy of the periodicities would drift from the fiches
 * within one correction. Entries that do have a fiche carry its slug, and
 * scripts/generate-vgp-tracker.ts fails the build if the two disagree.
 *
 * Every row is transcribed from a verbatim list quoted in
 * content/reference/vgp-reglementation.md. Nothing inferred belongs here.
 * Equipment outside both arrêtés is listed with months: null and an explicit
 * reason, because "not in the table" reads as an oversight while "hors champ,
 * autre régime" is an answer.
 *
 * One case is knowingly absent: the three month band of article 23 for
 * appareils de levage mus par la force humaine déplaçant un poste de travail
 * en élévation. The reference doc still flags article 23 as not quoted
 * verbatim, and a periodicity whose exact wording cannot be quoted does not go
 * in front of a reader.
 */

/**
 * Grouping for display. Families are how a reader finds their machine in a
 * thirty row list: the first two are what a BTP fleet actually holds, the
 * third is transcribed for completeness, the fourth is the explicit "no".
 */
export const FAMILIES = [
  "Appareils de levage (arrêté du 1er mars 2004)",
  "Machines mobiles de chantier (arrêté du 5 mars 1993)",
  "Machines de production (arrêté du 5 mars 1993)",
  "Hors champ de ces deux textes",
] as const;

export type Family = (typeof FAMILIES)[number];

export type PeriodicityRow = {
  /** Label as it appears in the spreadsheet dropdown. */
  label: string;
  family: Family;
  /** Null when the equipment falls outside both arrêtés. */
  months: 3 | 6 | 12 | null;
  /** Short regulatory basis, one line, for the reference sheet. */
  basis: string;
  source: Source | null;
  /** Slug in FICHES, when a fiche covers this row. */
  ficheSlug?: string;
  /** Condition or limit specific to this row. */
  caveat?: string;
  /**
   * A scope condition the row shares with its neighbours. Kept per row because
   * the spreadsheet is a flat filterable list where a row must stand alone,
   * and hoisted to the group heading for display, where eleven repetitions of
   * one sentence read as noise rather than as emphasis.
   */
  scopeNote?: string;
};

const LEVAGE: Family = FAMILIES[0];
const CHANTIER: Family = FAMILIES[1];
const PRODUCTION: Family = FAMILIES[2];
const HORS: Family = FAMILIES[3];

const BASIS_6 = "Art. 20-II et 23, arrêté du 1er mars 2004";
const BASIS_12 = "Art. 23, règle générale, arrêté du 1er mars 2004";
const BASIS_1993_ART_1 = "Art. 1er, arrêté du 5 mars 1993";
const BASIS_1993_ART_2 = "Art. 2, arrêté du 5 mars 1993";

/**
 * Article 1er conditions its own scope, and the condition decides whether the
 * equipment is subject at all rather than how often. It therefore belongs on
 * every row of that article, not in a footnote.
 */
const ART_1_CONDITIONS =
  "Sous les deux conditions cumulatives de l'article 1er : machine mue par une énergie autre que la force humaine employée directement, et chargement ou déchargement manuel en phase de production.";

/** Equipment outside both texts, kept in the table so the answer is explicit. */
const HORS_CHAMP = null;

export const PERIODICITES: PeriodicityRow[] = [
  // The eleven categories enumerated at II of article 20, in the order the
  // text lists them, each brought to six months by article 23.
  {
    label: "Grue auxiliaire de chargement sur véhicule",
    family: LEVAGE,
    months: 6,
    basis: BASIS_6,
    source: ARRETE_2004,
    ficheSlug: "grue-auxiliaire-chargement",
  },
  {
    label: "Grue à tour à montage rapide ou automatisé, sur stabilisateurs",
    family: LEVAGE,
    months: 6,
    basis: BASIS_6,
    source: ARRETE_2004,
    caveat:
      "Le II de l'article 20 vise les grues à tour à montage rapide ou automatisé, sur stabilisateurs. Une grue à tour montée par éléments n'y figure pas.",
  },
  {
    label: "Bras ou portique de levage pour bennes amovibles",
    family: LEVAGE,
    months: 6,
    basis: BASIS_6,
    source: ARRETE_2004,
  },
  {
    label: "Hayon élévateur",
    family: LEVAGE,
    months: 6,
    basis: BASIS_6,
    source: ARRETE_2004,
    ficheSlug: "hayon-elevateur",
  },
  {
    label: "Monte-meubles",
    family: LEVAGE,
    months: 6,
    basis: BASIS_6,
    source: ARRETE_2004,
  },
  {
    label: "Monte-matériaux de chantier",
    family: LEVAGE,
    months: 6,
    basis: BASIS_6,
    source: ARRETE_2004,
  },
  {
    label: "Engin de terrassement équipé pour le levage",
    family: LEVAGE,
    months: 6,
    basis: BASIS_6,
    source: ARRETE_2004,
    ficheSlug: "engin-terrassement-levage",
    caveat:
      "C'est l'équipement de levage qui fait entrer l'engin dans cette ligne. Sans lui, voir « engin de terrassement à conducteur porté ».",
  },
  {
    label: "Grue mobile automotrice ou sur véhicule porteur",
    family: LEVAGE,
    months: 6,
    basis: BASIS_6,
    source: ARRETE_2004,
    caveat:
      "Le II de l'article 20 vise les grues mobiles ne nécessitant pas de montage ou de démontage de parties importantes.",
  },
  {
    label: "Chariot élévateur",
    family: LEVAGE,
    months: 6,
    basis: BASIS_6,
    source: ARRETE_2004,
    ficheSlug: "chariot-elevateur",
  },
  {
    label: "Tracteur poseur de canalisations",
    family: LEVAGE,
    months: 6,
    basis: BASIS_6,
    source: ARRETE_2004,
  },
  {
    label: "Nacelle élévatrice (PEMP)",
    family: LEVAGE,
    months: 6,
    basis: BASIS_6,
    source: ARRETE_2004,
    ficheSlug: "nacelle-pemp",
  },

  // Everything else under the 2004 arrêté stays on the general rule.
  {
    label: "Pont roulant, palan ou potence",
    family: LEVAGE,
    months: 12,
    basis: BASIS_12,
    source: ARRETE_2004,
    ficheSlug: "pont-roulant-palan",
  },
  {
    label: "Autre appareil de levage non énuméré au II de l'article 20",
    family: LEVAGE,
    months: 12,
    basis: BASIS_12,
    source: ARRETE_2004,
    caveat:
      "La périodicité de six mois est l'exception. Un appareil de levage qui ne figure pas dans l'énumération du II de l'article 20 relève de la règle générale de douze mois.",
  },

  // Article 2 of the 1993 arrêté, split by machine because the four operations
  // it names are four different machines on a yard.
  {
    label: "Engin de terrassement à conducteur porté (sans levage)",
    family: CHANTIER,
    months: 12,
    basis: BASIS_1993_ART_2,
    source: ARRETE_1993_ART_2,
    ficheSlug: "engin-terrassement-conducteur-porte",
    caveat:
      "Le texte vise les machines à conducteur porté. Le compactage ne figure pas dans les quatre opérations énumérées.",
  },
  {
    label:
      "Machine mobile d'excavation ou de forage du sol à conducteur porté",
    family: CHANTIER,
    months: 12,
    basis: BASIS_1993_ART_2,
    source: ARRETE_1993_ART_2,
    caveat:
      "Citée dans la même énumération que les machines de terrassement, et soumise au même qualificatif « à conducteur porté ».",
  },
  {
    label: "Machine mobile d'extraction à conducteur porté",
    family: CHANTIER,
    months: 12,
    basis: BASIS_1993_ART_2,
    source: ARRETE_1993_ART_2,
  },
  {
    label: "Machine à battre les palplanches",
    family: CHANTIER,
    months: 12,
    basis: BASIS_1993_ART_2,
    source: ARRETE_1993_ART_2,
    ficheSlug: "machine-battre-palplanches",
  },

  // Article 1er of the 1993 arrêté, transcribed in full. Most of these are
  // industrial rather than BTP, and they are here because a reference that
  // omits them is one the reader has to leave.
  {
    label: "Compacteur à déchets",
    family: PRODUCTION,
    months: 3,
    basis: BASIS_1993_ART_1,
    source: ARRETE_1993_ART_1,
    ficheSlug: "compacteur-dechets",
    scopeNote: ART_1_CONDITIONS,
  },
  {
    label: "Système de compactage des véhicules de collecte d'ordures",
    family: PRODUCTION,
    months: 3,
    basis: BASIS_1993_ART_1,
    source: ARRETE_1993_ART_1,
    scopeNote: ART_1_CONDITIONS,
  },
  {
    label: "Presse à balles",
    family: PRODUCTION,
    months: 3,
    basis: BASIS_1993_ART_1,
    source: ARRETE_1993_ART_1,
    scopeNote: ART_1_CONDITIONS,
  },
  {
    label:
      "Presse mécanique ou hydraulique pour le travail à froid des métaux",
    family: PRODUCTION,
    months: 3,
    basis: BASIS_1993_ART_1,
    source: ARRETE_1993_ART_1,
    scopeNote: ART_1_CONDITIONS,
  },
  {
    label: "Presse à vis",
    family: PRODUCTION,
    months: 3,
    basis: BASIS_1993_ART_1,
    source: ARRETE_1993_ART_1,
    scopeNote: ART_1_CONDITIONS,
  },
  {
    label: "Presse à mouler les métaux",
    family: PRODUCTION,
    months: 3,
    basis: BASIS_1993_ART_1,
    source: ARRETE_1993_ART_1,
    scopeNote: ART_1_CONDITIONS,
  },
  {
    label:
      "Presse à mouler par injection ou compression les plastiques ou le caoutchouc",
    family: PRODUCTION,
    months: 3,
    basis: BASIS_1993_ART_1,
    source: ARRETE_1993_ART_1,
    scopeNote: ART_1_CONDITIONS,
  },
  {
    label: "Presse à platine (à dorer, à gaufrer, à découper)",
    family: PRODUCTION,
    months: 3,
    basis: BASIS_1993_ART_1,
    source: ARRETE_1993_ART_1,
    scopeNote: ART_1_CONDITIONS,
  },
  {
    label: "Presse à façonner au moyen d'un emporte-pièce",
    family: PRODUCTION,
    months: 3,
    basis: BASIS_1993_ART_1,
    source: ARRETE_1993_ART_1,
    caveat:
      "L'article vise les presses à façonner les cuirs, peaux, papiers, cartons ou matières plastiques en feuille au moyen d'un emporte-pièce.",
    scopeNote: ART_1_CONDITIONS,
  },
  {
    label: "Massicot (papier, carton, bois, plastique en feuille)",
    family: PRODUCTION,
    months: 3,
    basis: BASIS_1993_ART_1,
    source: ARRETE_1993_ART_1,
    scopeNote: ART_1_CONDITIONS,
  },
  {
    label: "Machine à cylindres pour l'industrie du caoutchouc",
    family: PRODUCTION,
    months: 3,
    basis: BASIS_1993_ART_1,
    source: ARRETE_1993_ART_1,
    scopeNote: ART_1_CONDITIONS,
  },
  {
    label: "Centrifugeuse",
    family: PRODUCTION,
    months: 12,
    basis: BASIS_1993_ART_2,
    source: ARRETE_1993_ART_2,
    caveat:
      "Citée à l'article 2, et donc à douze mois, contrairement aux autres machines de production listées ici.",
  },

  {
    label: "Compresseur",
    family: HORS,
    months: HORS_CHAMP,
    basis: "Hors VGP levage. Régime des équipements sous pression",
    source: null,
    caveat:
      "Ne relève ni de l'arrêté du 1er mars 2004 ni de celui du 5 mars 1993. Périodicité à établir sur le régime applicable.",
  },
  {
    label: "Groupe électrogène",
    family: HORS,
    months: HORS_CHAMP,
    basis: "Hors VGP levage. Vérification des installations électriques",
    source: null,
    caveat:
      "Ne relève ni de l'arrêté du 1er mars 2004 ni de celui du 5 mars 1993. Périodicité à établir sur le régime applicable.",
  },
  {
    label: "Autre (à qualifier)",
    family: HORS,
    months: HORS_CHAMP,
    basis: "À qualifier par la personne qualifiée",
    source: null,
    caveat:
      "Aucune périodicité n'est proposée tant que l'équipement n'est pas rattaché à un texte.",
  },
];

/**
 * Rows grouped for display, families in declaration order, empties dropped.
 *
 * When every row in a family that carries a scope note carries the same one,
 * it is returned as the group's note and the rows drop it. Derived rather than
 * declared, so the sentence exists in exactly one place.
 */
export function byFamily() {
  return FAMILIES.map((family) => {
    const rows = PERIODICITES.filter((row) => row.family === family);
    const notes = new Set(
      rows.map((row) => row.scopeNote).filter((note): note is string => !!note),
    );
    return { family, rows, sharedNote: notes.size === 1 ? [...notes][0] : undefined };
  }).filter((group) => group.rows.length > 0);
}

/** What to print under a row, once its group has taken the shared note. */
export function rowNote(row: PeriodicityRow, sharedNote?: string) {
  return [row.scopeNote === sharedNote ? null : row.scopeNote, row.caveat]
    .filter(Boolean)
    .join(" ");
}
