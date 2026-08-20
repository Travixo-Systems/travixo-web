/**
 * Fiches VGP par type d'engin.
 *
 * Accuracy gate: every regulatory statement carries a Source, and Source is a
 * required field rather than an optional one. An unsourced periodicity is a
 * type error, not a review miss.
 *
 * Scope rule from content/reference/vgp-reglementation.md: fiches cover only
 * the rows marked "Vérifié texte primaire". Compressors and generating sets are
 * in the fleet vocabulary but fall under other verification regimes, so a fiche
 * implying otherwise would be wrong. They are excluded, not guessed.
 */

export type Source = {
  label: string;
  url: string;
  /** ISO date the source was consulted. */
  consultedOn: string;
};

/**
 * Which text puts the machine under a VGP obligation. Two live regimes, and
 * they are not interchangeable: the rental documents of art. 15-II belong to
 * the 2004 arrêté and concern appareils de levage only, so rendering that
 * section on a 1993 machine would state an obligation that does not exist.
 */
export type Regime = "levage-2004" | "machines-1993";

export type Periodicity = {
  months: 3 | 6 | 12;
  /** Why this equipment falls in this band, in plain French. */
  basis: string;
  source: Source;
};

/**
 * Points de contrôle, only where a text actually lists them.
 *
 * The arrêté du 5 mars 1993 does list them, at article 3, for the equipment of
 * its articles 1 and 2. The arrêté du 1er mars 2004 does not list them in the
 * same enumerated form, so fiches under the levage-2004 regime carry no
 * checkpoints rather than a plausible-looking invention.
 */
export type Checkpoints = {
  /** The scope limit the text states for itself, before the list. */
  scope: string;
  groups: { heading: string; items: string[] }[];
  source: Source;
};

export type Fiche = {
  /** URL segment under /fr/vgp/. */
  slug: string;
  /** Equipment name as an operator would say it. */
  name: string;
  /** Fleet category, aligned with the app's import vocabulary. */
  category: "nacelle" | "chariot" | "engin" | "levage" | "divers";
  regime: Regime;
  title: string;
  description: string;
  h1: string;
  intro: string;
  periodicity: Periodicity;
  checkpoints?: Checkpoints;
  /** Equipment-specific notes. Regulatory ones need their own source. */
  notes?: { text: string; source?: Source }[];
  /** Slugs of sibling fiches, rendered as in-cluster links. */
  related?: string[];
  faq: { question: string; answer: string }[];
};
