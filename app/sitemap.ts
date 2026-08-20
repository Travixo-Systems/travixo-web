import { MetadataRoute } from "next";
import {
  BASE_URL,
  ROUTES,
  ROUTE_KEYS,
  languageAlternates,
  localesFor,
  pathFor,
  urlFor,
} from "@/lib/seo";
import { FICHES } from "@/content/vgp/fiches";

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
  const fixed = ROUTE_KEYS.flatMap((routeKey) =>
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

  // Fiches are data, not manifest entries, so they come from the registry.
  // Same source the route's generateStaticParams uses, so the two cannot drift.
  const ficheBase = `${BASE_URL}${pathFor("fr", "vgpHub")}`;
  const fiches = FICHES.map((fiche) => ({
    url: `${ficheBase}/${fiche.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: {
      languages: {
        fr: `${ficheBase}/${fiche.slug}`,
        "x-default": `${ficheBase}/${fiche.slug}`,
      },
    },
  }));

  return [...fixed, ...fiches];
}
