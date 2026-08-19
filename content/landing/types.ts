import type { Locale, RouteKey } from "@/lib/seo";

/**
 * Landing page copy as data.
 *
 * Deliberately not in messages/{locale}.json. Those files are 1000+ lines of
 * interface strings with strict FR/EN key parity, and long form marketing copy
 * in one locale would either double their size or force a French page to be
 * mirrored in en.json to keep parity. Typed modules also let the build catch a
 * malformed page rather than failing at render.
 */

/** A named block inside a section: a feature, a scenario, a bullet. */
export type Block = {
  title: string;
  body: string;
};

export type Section =
  | { kind: "prose"; heading: string; lead?: string; paragraphs: string[] }
  | { kind: "bullets"; heading: string; lead?: string; items: Block[] }
  | { kind: "blocks"; heading: string; lead?: string; items: Block[] }
  | {
      kind: "quote";
      heading: string;
      lead?: string;
      quote: string;
      citation: string;
      paragraphs: string[];
    }
  | {
      kind: "pricing";
      heading: string;
      paragraphs: string[];
      linkLabel: string;
    };

export type LandingPage = {
  routeKey: RouteKey;
  locale: Locale;
  /** Full <title>. Rendered absolute, so it carries the brand itself. */
  title: string;
  description: string;
  h1: string;
  subtitle: string;
  sections: Section[];
  faq: { question: string; answer: string }[];
  /** Internal links to the sibling landing pages. */
  related: { label: string; routeKey: RouteKey }[];
  cta: { heading: string; label: string };
};
