/**
 * Fiches VGP par type d'engin.
 *
 * Accuracy gate: every regulatory statement carries a Source, and Source is a
 * required field rather than an optional one. An unsourced periodicity is a
 * type error, not a review miss.
 *
 * Scope rule from content/reference/vgp-reglementation.md: v1 fiches cover only
 * the rows marked "Vérifié texte primaire". Compressors and generating sets are
 * in the fleet vocabulary but fall under other verification regimes, so a fiche
 * implying otherwise would be wrong. They are excluded, not guessed.
 *
 * Note there is no `checkpoints` field. Points de contrôle per equipment type
 * are not in the sourced reference, so they are not published. Add the field
 * when the underlying text has been read, not before.
 */

export type Source = {
  label: string;
  url: string;
  /** ISO date the source was consulted. */
  consultedOn: string;
};

export type Periodicity = {
  months: 3 | 6 | 12;
  /** Why this equipment falls in this band, in plain French. */
  basis: string;
  source: Source;
};

export type Fiche = {
  /** URL segment under /fr/vgp/. */
  slug: string;
  /** Equipment name as an operator would say it. */
  name: string;
  /** Fleet category, aligned with the app's import vocabulary. */
  category: "nacelle" | "chariot" | "engin" | "levage";
  title: string;
  description: string;
  h1: string;
  intro: string;
  periodicity: Periodicity;
  /** Equipment-specific notes. Regulatory ones need their own source. */
  notes?: { text: string; source?: Source }[];
  faq: { question: string; answer: string }[];
};
