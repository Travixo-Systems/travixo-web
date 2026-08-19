import type { Locale, RouteKey } from "@/lib/seo";
import type { LandingPage } from "./types";

import logicielVgp from "./fr/logiciel-vgp";
import logicielGestionParcMateriel from "./fr/logiciel-gestion-parc-materiel";
import logicielLoueurMateriel from "./fr/logiciel-loueur-materiel";

/**
 * Registry of landing pages, keyed by locale then route.
 *
 * English pages are absent on purpose. The route manifest in lib/seo.ts lists
 * no English slug for these routes either, so the two stay in step: no English
 * URL is generated, sitemapped, or offered as an hreflang alternate until the
 * English copy exists here.
 */
const LANDING_PAGES: Partial<Record<Locale, Partial<Record<RouteKey, LandingPage>>>> =
  {
    fr: {
      softwareVgp: logicielVgp,
      softwareFleet: logicielGestionParcMateriel,
      softwareRental: logicielLoueurMateriel,
    },
  };

export function getLandingPage(
  locale: Locale,
  routeKey: RouteKey,
): LandingPage | undefined {
  return LANDING_PAGES[locale]?.[routeKey];
}

export function landingRouteKeys(locale: Locale): RouteKey[] {
  return Object.keys(LANDING_PAGES[locale] ?? {}) as RouteKey[];
}

export type { LandingPage };
