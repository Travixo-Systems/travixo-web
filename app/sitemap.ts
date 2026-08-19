import { MetadataRoute } from "next";
import {
  ROUTES,
  ROUTE_KEYS,
  languageAlternates,
  localesFor,
  urlFor,
} from "@/lib/seo";

/**
 * Derived from the route manifest in lib/seo.ts rather than a hardcoded list,
 * so a new route cannot be added without appearing here. The previous
 * hardcoded array had already lost legal-notice.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Stable across builds. The previous `new Date()` made every URL claim to
  // have changed on every deploy, which is noise for crawl scheduling.
  const lastModified = new Date("2026-08-19");

  // localesFor, not LOCALES: a route that exists only in French must not
  // advertise an English URL that would 404.
  return ROUTE_KEYS.flatMap((routeKey) =>
    localesFor(routeKey).map((locale) => ({
      url: urlFor(locale, routeKey),
      lastModified,
      changeFrequency: ROUTES[routeKey].changeFrequency,
      priority: ROUTES[routeKey].priority,
      alternates: {
        languages: languageAlternates(routeKey),
      },
    })),
  );
}
