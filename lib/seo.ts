import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import {
  ROUTES,
  localesFor,
  ogImageFor,
  urlFor,
  languageAlternates,
  type Locale,
  type RouteKey,
} from "./routes";

/**
 * Metadata construction, which needs next-intl/server. Everything else lives
 * in lib/routes.ts and is re-exported here so callers see one module.
 */
export * from "./routes";

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
