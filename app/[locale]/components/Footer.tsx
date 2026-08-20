import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { hasRoute, pathFor, type Locale, type RouteKey } from "@/lib/seo";
import { getLandingPage } from "@/content/landing";

/**
 * One footer, replacing eight hand-copied blocks.
 *
 * The duplication had already drifted: the features page inlined its own
 * English/French ternaries and still read "2025 Deralis Digital" while every
 * other page said "2026 TraviXO Systems", and only three of the eight linked
 * to legal-notice.
 *
 * Contact details are shown on every page so the name, address and phone stay
 * consistent with the directory listings planned for acquisition.
 *
 * The solutions row exists for crawlability as much as for navigation. The
 * landing pages and the VGP fiches were reachable only from the sitemap and
 * from each other, which makes them orphans: Google discovers pages and passes
 * authority through internal links, and a sitemap entry alone is a weak
 * signal. A site-wide footer link puts every page one hop from the cluster.
 *
 * The row renders only in locales where those routes exist, so the English
 * footer does not offer links that would 404.
 */
export default async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "footer" });

  const legalLinks = [
    { href: pathFor(locale, "privacy"), label: t("privacy") },
    { href: pathFor(locale, "terms"), label: t("terms") },
    { href: pathFor(locale, "legalNotice"), label: t("legalNotice") },
  ];

  const landingKeys: RouteKey[] = [
    "softwareVgp",
    "softwareFleet",
    "softwareRental",
  ];

  const solutionLinks = landingKeys
    .filter((key) => hasRoute(locale, key))
    .map((key) => ({
      href: pathFor(locale, key),
      label: getLandingPage(locale, key)?.shortLabel ?? "",
    }))
    .filter((link) => link.label);

  if (hasRoute(locale, "vgpHub")) {
    solutionLinks.push({
      href: pathFor(locale, "vgpHub"),
      label: "Périodicité des VGP",
    });
  }

  return (
    <footer className="bg-[#0a2730] text-gray-400 py-10">
      <div className="container mx-auto px-4 text-center">
        {solutionLinks.length > 0 ? (
          <nav
            aria-label="Solutions"
            className="mb-8 pb-8 border-b border-white/10"
          >
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              {solutionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <p>{t("copyright")}</p>

        <p className="mt-2 text-sm">
          <a
            href={`mailto:${t("email")}`}
            className="hover:text-white transition-colors"
          >
            {t("email")}
          </a>
          {" · "}
          <a
            href={`tel:${t("phone").replace(/\s/g, "")}`}
            className="hover:text-white transition-colors"
          >
            {t("phone")}
          </a>
        </p>

        <p className="mt-2 text-sm">
          {legalLinks.map((link, i) => (
            <span key={link.href}>
              {i > 0 && " · "}
              <Link
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
