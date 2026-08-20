import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DEFAULT_LOCALE, isLocale } from "@/lib/seo";
import Navigation from "./components/navigation";

/**
 * Previously nothing handled notFound(), so it rendered Next's unstyled
 * default with no nav and no locale.
 *
 * This boundary cannot read route params, so the locale is not available here.
 * Copy comes from the default locale and links are locale-less, letting the
 * middleware resolve them by Accept-Language.
 */

export const metadata: Metadata = {
  title: { absolute: "Page introuvable | TraviXO" },
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const locale = isLocale(DEFAULT_LOCALE) ? DEFAULT_LOCALE : "en";
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "navigation" });

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        <section className="bg-[#0a2730] py-24">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-sm font-semibold tracking-widest text-[#e8600a] mb-4">
              404
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Page introuvable / Page not found
            </h1>
            <p className="text-lg text-white/80 mb-10">
              Cette page n&apos;existe pas ou a été déplacée. This page does not
              exist or has moved.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="bg-[#e8600a] hover:bg-[#d05508] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors text-center"
              >
                {t("home")}
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-lg text-lg transition-colors text-center"
              >
                {t("contact")}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
