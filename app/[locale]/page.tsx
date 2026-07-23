import Link from "next/link";
import Image from "next/image";
import { Search, FileText, ClipboardCheck } from "lucide-react";
import Navigation from "./components/navigation";
import ProblemSolutionCarousel from "./components/ProblemSolutionCarousel";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(props: Props) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  return { title: t("title"), description: t("description") };
}

export default async function Home(props: Props) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "homepage" });

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-[#0a2730] pb-32 pt-16">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-center text-white mb-6 whitespace-pre-line">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-center text-white/80 max-w-3xl mx-auto mb-8">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={`/${locale}/contact`}
                className="bg-[#e8600a] hover:bg-[#d05508] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors text-center"
              >
                {t("hero.ctaPrimary")}
              </Link>
              <button className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-lg text-lg transition-colors">
                {t("hero.ctaSecondary")}
              </button>
            </div>
          </div>
        </section>

        {/* Product Screenshot */}
        <section className="bg-[#f6f8fd] pt-0 pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto -mt-20">
              <Image
                src="/screenshots/dashboard-preview.png"
                alt="TraviXO dashboard"
                width={1200}
                height={750}
                className="rounded-lg shadow-2xl w-full h-auto"
                priority
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[#f6f8fd] py-8">
          <div className="container mx-auto px-2">
            <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-2xl font-bold text-[#0a2730] mb-1">
                    {t(`values.${i}.title`)}
                  </h3>
                  <p className="text-gray-600">{t(`values.${i}.text`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Depot Scene */}
        <section className="py-12 bg-[#0a2730]">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-4xl font-bold text-center text-white mb-6">
              {t("depotScene.title")}
            </h2>
            <div className="border-l-[3px] border-[#e8600a] pl-6 mb-8">
              <p className="text-lg text-white font-medium">
                {t("depotScene.trigger")}
              </p>
            </div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/70 mb-4">
              {t("depotScene.search.title")}
            </p>
            <ul className="space-y-3 mb-8">
              {[1, 2, 3].map((i) => {
                const icons = [Search, FileText, ClipboardCheck];
                const Icon = icons[i - 1];
                return (
                  <li key={i} className="flex items-start gap-3 text-white">
                    <Icon className="w-5 h-5 mt-0.5 text-white/50 shrink-0" />
                    <span>{t(`depotScene.search.item${i}`)}</span>
                  </li>
                );
              })}
            </ul>
            <p className="text-lg text-white mb-4">
              {t("depotScene.result")}
            </p>
            <p className="text-lg font-bold text-[#e8600a]">
              {t("depotScene.insight")}
            </p>
          </div>
        </section>

        <ProblemSolutionCarousel />

        {/* ERP Positioning */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="border-l-[3px] border-[#e8600a] pl-6">
              <h2 className="text-3xl font-bold text-[#0a2730] mb-3">
                {t("erpPositioning.title")}
              </h2>
              <p className="text-lg text-gray-700">
                {t("erpPositioning.body")}
              </p>
            </div>
          </div>
        </section>

        {/* Handover Proof */}
        <section className="py-12 bg-[#f6f8fd]">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl font-bold text-center text-[#0a2730] mb-12">
              {t("handover.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border border-gray-200 rounded-lg bg-white">
                <h3 className="text-xl font-bold text-[#0a2730] mb-3">
                  {t("handover.scanOut.title")}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t("handover.scanOut.body")}
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg bg-white">
                <h3 className="text-xl font-bold text-[#0a2730] mb-3">
                  {t("handover.scanReturn.title")}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t("handover.scanReturn.body")}
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg bg-white">
                <h3 className="text-xl font-bold text-[#0a2730] mb-3">
                  {t("handover.chain.title")}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t("handover.chain.body")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VGP Recall */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-[#0a2730] mb-6">
              {t("recall.title")}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              {t("recall.body")}
            </p>
            <p className="text-sm font-semibold text-[#e8600a]">
              {t("recall.cta")}
            </p>
          </div>
        </section>

        {/* Exceptions Panel */}
        <section className="py-12 bg-[#f6f8fd]">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl font-bold text-center text-[#0a2730] mb-12">
              {t("exceptions.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border border-gray-200 rounded-lg bg-white">
                <h3 className="text-xl font-bold text-[#0a2730] mb-3">
                  {t("exceptions.overdueReturn.title")}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t("exceptions.overdueReturn.body")}
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg bg-white">
                <h3 className="text-xl font-bold text-[#0a2730] mb-3">
                  {t("exceptions.missingAudit.title")}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t("exceptions.missingAudit.body")}
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg bg-white">
                <h3 className="text-xl font-bold text-[#0a2730] mb-3">
                  {t("exceptions.vgpExpiring.title")}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t("exceptions.vgpExpiring.body")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl font-bold text-center text-[#0a2730] mb-12">
              {t("useCases.title")}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-bold text-[#0a2730] mb-3">
                  {t("useCases.btp.title")}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t("useCases.btp.body")}
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-bold text-[#0a2730] mb-3">
                  {t("useCases.multiDepot.title")}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t("useCases.multiDepot.body")}
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-bold text-[#0a2730] mb-3">
                  {t("useCases.excel.title")}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {t("useCases.excel.body")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Credibility */}
        <section className="py-10 bg-[#0a2730]">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              {t("credibility.title")}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="inline-block border border-white/30 text-white text-sm font-medium px-5 py-2 rounded-full"
                >
                  {t(`credibility.item${i}`)}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 bg-[#f6f8fd]">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-[#0a2730] mb-4">{t("finalCta.title")}</h2>
            <p className="text-xl text-gray-600 mb-6">{t("finalCta.subtitle")}</p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <Link
                href={`/${locale}/contact`}
                className="bg-[#e8600a] hover:bg-[#d05508] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors text-center"
              >
                {t("finalCta.primary")}
              </Link>
              <button className="border-2 border-[#0a2730] text-[#0a2730] hover:bg-[#0a2730] hover:text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors">
                {t("finalCta.secondary")}
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 max-w-2xl mx-auto">
              {t.raw("finalCta.badges").map((b: string, i: number) => (
                <div key={i}>&#10003; {b}</div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0a2730] text-white/60 py-4">
          <div className="container mx-auto px-4 text-center">
            <p>{t("finalCta.footer.copyright")}</p>
            <p className="mt-2 text-sm">
              <a href="mailto:contact@travixosystems.com" className="hover:text-white">
                {t("finalCta.footer.email")}
              </a>
              {" \u00B7 "}
              <span>+33 7 83 35 75 35</span>
            </p>
            <p className="mt-2 text-sm">
              <Link href={`/${locale}/privacy`} className="hover:text-white">
                {t("finalCta.footer.privacy")}
              </Link>
              {" \u00B7 "}
              <Link href={`/${locale}/terms`} className="hover:text-white">
                {t("finalCta.footer.terms")}
              </Link>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
