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
 * enough to say to justify a page of its own. This file holds the lookup: every
 * row of content/reference/vgp-reglementation.md that is marked "Vérifié texte
 * primaire", including the ones with no fiche behind them.
 *
 * It exists because the Excel tracker needs a machine-readable table, and a
 * second hand-maintained copy of the periodicities would drift from the fiches
 * within one correction. Entries that do have a fiche carry its slug, and
 * scripts/generate-vgp-tracker.ts fails the build if the two disagree.
 *
 * Nothing unverified belongs here. Equipment outside both arrêtés is listed
 * with months: null and an explicit reason, because "not in the table" reads as
 * an oversight while "hors champ, autre régime" is an answer.
 */
export type PeriodicityRow = {
  /** Label as it appears in the spreadsheet dropdown. */
  label: string;
  /** Null when the equipment falls outside both arrêtés. */
  months: 3 | 6 | 12 | null;
  /** Short regulatory basis, one line, for the reference sheet. */
  basis: string;
  source: Source | null;
  /** Slug in FICHES, when a fiche covers this row. */
  ficheSlug?: string;
  /** Condition or limit the reader must not miss. */
  caveat?: string;
};

/** Equipment outside both texts, kept in the table so the answer is explicit. */
const HORS_CHAMP = null;

export const PERIODICITES: PeriodicityRow[] = [
  {
    label: "Nacelle élévatrice (PEMP)",
    months: 6,
    basis: "Art. 20-II et 23, arrêté du 1er mars 2004",
    source: ARRETE_2004,
    ficheSlug: "nacelle-pemp",
  },
  {
    label: "Chariot élévateur",
    months: 6,
    basis: "Art. 20-II et 23, arrêté du 1er mars 2004",
    source: ARRETE_2004,
    ficheSlug: "chariot-elevateur",
  },
  {
    label: "Grue auxiliaire de chargement sur véhicule",
    months: 6,
    basis: "Art. 20-II et 23, arrêté du 1er mars 2004",
    source: ARRETE_2004,
    ficheSlug: "grue-auxiliaire-chargement",
  },
  {
    label: "Engin de terrassement équipé pour le levage",
    months: 6,
    basis: "Art. 20-II et 23, arrêté du 1er mars 2004",
    source: ARRETE_2004,
    ficheSlug: "engin-terrassement-levage",
    caveat:
      "C'est l'équipement de levage qui fait entrer l'engin dans cette ligne. Sans lui, voir la ligne « engin de terrassement à conducteur porté ».",
  },
  {
    label: "Hayon élévateur",
    months: 6,
    basis: "Art. 20-II et 23, arrêté du 1er mars 2004",
    source: ARRETE_2004,
    ficheSlug: "hayon-elevateur",
  },
  {
    label: "Monte-matériaux de chantier",
    months: 6,
    basis: "Art. 20-II et 23, arrêté du 1er mars 2004",
    source: ARRETE_2004,
  },
  {
    label: "Grue mobile automotrice ou sur porteur",
    months: 6,
    basis: "Art. 20-II et 23, arrêté du 1er mars 2004",
    source: ARRETE_2004,
    caveat:
      "La ligne du II de l'article 20 vise les grues mobiles ne nécessitant pas de montage ou de démontage de parties importantes.",
  },
  {
    label: "Pont roulant, palan ou potence",
    months: 12,
    basis: "Art. 23, règle générale, arrêté du 1er mars 2004",
    source: ARRETE_2004,
    ficheSlug: "pont-roulant-palan",
  },
  {
    label: "Engin de terrassement à conducteur porté (sans levage)",
    months: 12,
    basis: "Art. 2, arrêté du 5 mars 1993",
    source: ARRETE_1993_ART_2,
    ficheSlug: "engin-terrassement-conducteur-porte",
    caveat:
      "Le texte vise les machines à conducteur porté. Le compactage ne figure pas dans les quatre opérations énumérées.",
  },
  {
    label: "Machine à battre les palplanches",
    months: 12,
    basis: "Art. 2, arrêté du 5 mars 1993",
    source: ARRETE_1993_ART_2,
    ficheSlug: "machine-battre-palplanches",
  },
  {
    label: "Compacteur à déchets",
    months: 3,
    basis: "Art. 1er, arrêté du 5 mars 1993",
    source: ARRETE_1993_ART_1,
    ficheSlug: "compacteur-dechets",
    caveat:
      "Deux conditions cumulatives : machine mue par une énergie autre que la force humaine employée directement, et chargement ou déchargement manuel en phase de production.",
  },
  {
    label: "Compresseur",
    months: HORS_CHAMP,
    basis: "Hors VGP levage. Régime des équipements sous pression",
    source: null,
    caveat:
      "Ne relève ni de l'arrêté du 1er mars 2004 ni de celui du 5 mars 1993. Périodicité à établir sur le régime applicable.",
  },
  {
    label: "Groupe électrogène",
    months: HORS_CHAMP,
    basis: "Hors VGP levage. Vérification des installations électriques",
    source: null,
    caveat:
      "Ne relève ni de l'arrêté du 1er mars 2004 ni de celui du 5 mars 1993. Périodicité à établir sur le régime applicable.",
  },
  {
    label: "Autre (à qualifier)",
    months: HORS_CHAMP,
    basis: "À qualifier par la personne qualifiée",
    source: null,
    caveat:
      "Aucune périodicité n'est proposée tant que l'équipement n'est pas rattaché à un texte.",
  },
];
