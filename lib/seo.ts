import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

/**
 * Single source of truth for locales, the canonical origin, and the route map.
 *
 * Before this module the locale array was duplicated in five places
 * (middleware.ts, i18n.ts, layout.tsx, sitemap.ts, navigation.tsx) and the
 * origin in five more. The sitemap kept its own hardcoded page list, which had
 * already drifted: legal-notice existed as a route but was never listed.
 */

export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";
export const BASE_URL = "https://travixosystems.com";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

type RouteDef = {
  /**
   * Namespace in messages/{locale}.json holding title and description.
   * Landing routes leave this null: their copy lives in content/landing,
   * because it is long form, locale specific, and would both bloat the
   * message files and force a French page to exist in en.json to satisfy
   * key parity.
   */
  namespace: string | null;
  /**
   * Path segment per locale. Empty string means the locale root.
   * A locale may be absent, which means the route does not exist in that
   * locale: it is not generated, not in the sitemap, and not offered as an
   * hreflang alternate. The three landing routes are FR only until the
   * English copy is written and reviewed.
   */
  slugs: Partial<Record<Locale, string>>;
  changeFrequency: "weekly" | "monthly";
  priority: number;
};

export const ROUTES = {
  home: {
    namespace: "metadata.home",
    slugs: { en: "", fr: "" },
    changeFrequency: "weekly",
    priority: 1,
  },
  features: {
    namespace: "metadata.features",
    slugs: { en: "features", fr: "features" },
    changeFrequency: "weekly",
    priority: 0.8,
  },
  pricing: {
    namespace: "metadata.pricing",
    slugs: { en: "pricing", fr: "pricing" },
    changeFrequency: "weekly",
    priority: 0.8,
  },
  about: {
    namespace: "metadata.about",
    slugs: { en: "about", fr: "about" },
    changeFrequency: "monthly",
    priority: 0.8,
  },
  contact: {
    namespace: "metadata.contact",
    slugs: { en: "contact", fr: "contact" },
    changeFrequency: "monthly",
    priority: 0.8,
  },
  privacy: {
    namespace: "metadata.privacy",
    slugs: { en: "privacy", fr: "privacy" },
    changeFrequency: "monthly",
    priority: 0.3,
  },
  terms: {
    namespace: "metadata.terms",
    slugs: { en: "terms", fr: "terms" },
    changeFrequency: "monthly",
    priority: 0.3,
  },
  legalNotice: {
    namespace: "metadata.legalNotice",
    slugs: { en: "legal-notice", fr: "legal-notice" },
    changeFrequency: "monthly",
    priority: 0.3,
  },

  // Keyword landing pages. FR only for now, served by app/[locale]/[slug].
  // English slugs go here once the EN copy is approved, and everything else
  // (sitemap, hreflang, static params) follows automatically.
  softwareVgp: {
    namespace: null,
    slugs: { fr: "logiciel-vgp" },
    changeFrequency: "monthly",
    priority: 0.9,
  },
  softwareFleet: {
    namespace: null,
    slugs: { fr: "logiciel-gestion-parc-materiel" },
    changeFrequency: "monthly",
    priority: 0.9,
  },
  softwareRental: {
    namespace: null,
    slugs: { fr: "logiciel-loueur-materiel" },
    changeFrequency: "monthly",
    priority: 0.9,
  },
} satisfies Record<string, RouteDef>;

export type RouteKey = keyof typeof ROUTES;

export const ROUTE_KEYS = Object.keys(ROUTES) as RouteKey[];

/**
 * `satisfies` above keeps the literal shape of each entry, which is what makes
 * authoring mistakes visible, but it also means `slugs` is a union of object
 * types where only some have an `en` key. Widening once here keeps every call
 * site indexable by Locale.
 */
function slugsFor(routeKey: RouteKey): Partial<Record<Locale, string>> {
  return ROUTES[routeKey].slugs;
}

/** Locales in which a route actually exists. */
export function localesFor(routeKey: RouteKey): Locale[] {
  const slugs = slugsFor(routeKey);
  return LOCALES.filter((locale) => slugs[locale] !== undefined);
}

export function hasRoute(locale: Locale, routeKey: RouteKey): boolean {
  return slugsFor(routeKey)[locale] !== undefined;
}

export function pathFor(locale: Locale, routeKey: RouteKey): string {
  const slug = slugsFor(routeKey)[locale];
  if (slug === undefined) {
    throw new Error(`Route "${routeKey}" has no slug for locale "${locale}"`);
  }
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

export function urlFor(locale: Locale, routeKey: RouteKey): string {
  return `${BASE_URL}${pathFor(locale, routeKey)}`;
}

/** Resolve a URL slug back to its route key, per locale. Used by [slug]. */
export function routeKeyForSlug(
  locale: Locale,
  slug: string,
): RouteKey | undefined {
  return ROUTE_KEYS.find((key) => slugsFor(key)[locale] === slug);
}

/**
 * The generated share card for a locale.
 *
 * app/[locale]/opengraph-image.tsx renders it, but Next applies that file
 * convention only to the segment it sits in, so /fr and /en picked it up while
 * /fr/pricing and the rest did not. Referencing the prerendered route
 * explicitly gives every page the same card.
 */
export function ogImageFor(locale: Locale) {
  return {
    url: `${BASE_URL}/${locale}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: "TraviXO",
  };
}

/**
 * hreflang map for a route, including the x-default the site never had.
 */
export function languageAlternates(routeKey: RouteKey): Record<string, string> {
  const available = localesFor(routeKey);
  const languages: Record<string, string> = {};
  for (const locale of available) {
    languages[locale] = urlFor(locale, routeKey);
  }
  // x-default points at the default locale when the route exists there, and
  // otherwise at the only locale that has it. A FR only page must not offer an
  // English alternate that would 404.
  const fallback = available.includes(DEFAULT_LOCALE)
    ? DEFAULT_LOCALE
    : available[0];
  if (fallback) {
    languages["x-default"] = urlFor(fallback, routeKey);
  }
  return languages;
}

/**
 * Per-page metadata with a self-referential canonical.
 *
 * Pages previously returned only { title, description }. Because they omitted
 * alternates, Next merged the parent value from the locale layout, which
 * hardcoded canonical to the locale root, so every commercial page declared
 * itself a duplicate of the homepage.
 *
 * Titles are returned as absolute: the copy in messages/*.json already carries
 * the brand ("Tarifs - Suivi de materiel TraviXO"), so letting the layout
 * template append a second brand string produced ~100 character titles.
 *
 * openGraph.images points at the generated card explicitly rather than relying
 * on the file convention, which does not reach nested segments. See
 * ogImageFor.
 */
export async function buildPageMetadata({
  locale,
  routeKey,
  title: titleOverride,
  description: descriptionOverride,
}: {
  locale: Locale;
  routeKey: RouteKey;
  /** Supplied by landing routes, whose copy is not in messages/*.json. */
  title?: string;
  description?: string;
}): Promise<Metadata> {
  const { namespace } = ROUTES[routeKey];

  let title = titleOverride;
  let description = descriptionOverride;

  if (title === undefined || description === undefined) {
    if (namespace === null) {
      throw new Error(
        `Route "${routeKey}" has no messages namespace, so title and description must be passed in`,
      );
    }
    const t = await getTranslations({ locale, namespace });
    title ??= t("title");
    description ??= t("description");
  }

  const url = urlFor(locale, routeKey);
  const image = ogImageFor(locale);

  return {
    title: { absolute: title },
    description,
    openGraph: {
      type: "website",
      locale,
      alternateLocale: localesFor(routeKey).filter((l) => l !== locale),
      url,
      title,
      description,
      siteName: "TraviXO",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
      creator: "@TraviXO",
    },
    alternates: {
      canonical: url,
      languages: languageAlternates(routeKey),
    },
  };
}
