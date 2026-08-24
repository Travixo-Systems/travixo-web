import { BASE_URL, LOCALES, ROUTE_KEYS, hasRoute, urlFor } from "@/lib/routes";
import { FICHES } from "@/content/vgp/fiches";

/**
 * llms.txt, the Markdown index large language models read to understand what a
 * site contains and how it is organised.
 *
 * Lighthouse's Agentic Browsing category flagged this as "Failed with HTTP
 * status 500": the path did not exist, and an unmatched top level path here
 * errors rather than 404s. It also has to be a Markdown document with at least
 * one H1.
 *
 * Built from the route manifest rather than a hand written list, for the same
 * reason the sitemap is: the previous hardcoded page list had already drifted
 * and silently omitted a real route.
 */

export const dynamic = "force-static";

/** Human readable label per route, kept next to nothing else that needs it. */
const LABELS: Record<string, { en: string; fr: string }> = {
  home: { en: "Home", fr: "Accueil" },
  features: { en: "Features", fr: "Fonctionnalités" },
  pricing: { en: "Pricing", fr: "Tarifs" },
  about: { en: "About", fr: "À propos" },
  contact: { en: "Contact", fr: "Contact" },
  privacy: { en: "Privacy policy", fr: "Politique de confidentialité" },
  terms: { en: "Terms of service", fr: "Conditions d'utilisation" },
  legalNotice: { en: "Legal notice", fr: "Mentions légales" },
  softwareVgp: { en: "VGP software", fr: "Logiciel VGP" },
  softwareFleet: { en: "Fleet management software", fr: "Logiciel de gestion de parc" },
  softwareRental: { en: "Equipment rental software", fr: "Logiciel pour loueur de matériel" },
  vgpHub: { en: "VGP periodicity by machine type", fr: "Périodicité des VGP par type d'engin" },
  vgpTracker: { en: "VGP tracking spreadsheet (Excel)", fr: "Tableau de suivi VGP (Excel)" },
};

/** Routes that are reference material rather than product or company pages. */
const OPTIONAL = new Set(["privacy", "terms", "legalNotice"]);

function section(locale: (typeof LOCALES)[number], keys: string[]) {
  return keys
    .filter((key) => hasRoute(locale, key as never))
    .map((key) => {
      const label = LABELS[key]?.[locale] ?? key;
      return `- [${label}](${urlFor(locale, key as never)})`;
    })
    .join("\n");
}

export function GET() {
  const primary = ROUTE_KEYS.filter((k) => !OPTIONAL.has(k));
  const optional = ROUTE_KEYS.filter((k) => OPTIONAL.has(k));

  // name, not title: title carries the " | TraviXO" search suffix.
  const fiches = FICHES.map(
    (fiche) => `- [${fiche.name}](${BASE_URL}/fr/vgp/${fiche.slug})`,
  ).join("\n");

  const body = `# TraviXO

> QR based equipment tracking and VGP compliance for construction and equipment
> rental fleets. Each machine is linked to its QR code, its regulatory
> inspections, its documents and its history, so the record stays in one place
> instead of spread across an ERP, a shared drive and email.

Operated by Deralis Digital under the TraviXO brand. The site is published in
English and French; the French tree carries the VGP reference material, which
covers a French regulatory obligation (the *vérification générale périodique*).

## English

${section("en", primary)}

## Français

${section("fr", primary)}

## VGP reference sheets (French)

Periodicity and obligations per machine type, cited to the governing arrêtés.

${fiches}

## Legal

${section("en", optional)}
${section("fr", optional)}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
