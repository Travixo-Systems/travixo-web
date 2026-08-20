import type { Locale, RouteKey } from "@/lib/seo";
import type { LandingPage } from "./types";

import logicielVgp from "./fr/logiciel-vgp";
import logicielGestionParcMateriel from "./fr/logiciel-gestion-parc-materiel";
import logicielLoueurMateriel from "./fr/logiciel-loueur-materiel";

import equipmentFleetManagementSoftware from "./en/equipment-fleet-management-software";
import equipmentRentalSoftware from "./en/equipment-rental-software";

/**
 * Registry of landing pages, keyed by locale then route.
 *
 * softwareVgp is French only, on purpose. "VGP" is a French regulatory term
 * with no English equivalent and effectively no English search volume, so an
 * English page built on it would target a phrase nobody types. The equivalent
 * British market searches around LOLER and PUWER, which is different
 * regulation and a rewrite rather than a translation.
 *
 * The route manifest in lib/seo.ts must stay in step with this file: a locale
 * listed there without an entry here would 404.
 */
const LANDING_PAGES: Partial<Record<Locale, Partial<Record<RouteKey, LandingPage>>>> =
  {
    fr: {
      softwareVgp: logicielVgp,
      softwareFleet: logicielGestionParcMateriel,
      softwareRental: logicielLoueurMateriel,
    },
    en: {
      softwareFleet: equipmentFleetManagementSoftware,
      softwareRental: equipmentRentalSoftware,
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
