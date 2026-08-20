import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { pathFor, type Locale } from "@/lib/seo";

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
 */
export default async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "footer" });

  const links = [
    { href: pathFor(locale, "privacy"), label: t("privacy") },
    { href: pathFor(locale, "terms"), label: t("terms") },
    { href: pathFor(locale, "legalNotice"), label: t("legalNotice") },
  ];

  return (
    <footer className="bg-[#0a2730] text-gray-400 py-8">
      <div className="container mx-auto px-4 text-center">
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
          {links.map((link, i) => (
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
