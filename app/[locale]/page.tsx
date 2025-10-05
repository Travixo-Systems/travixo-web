import Link from "next/link";
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
        <section className="container mx-auto px-4 py-8">
          <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-900 mb-6 whitespace-pre-line">
            {t("hero.title")}
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-4">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors text-center"
            >
              {t("hero.ctaPrimary")}
            </Link>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-8 py-4 rounded-lg text-lg transition-colors">
              {t("hero.ctaSecondary")}
            </button>
          </div>
        </section>

        {/* Values */}
        <section className="bg-gray-50 py-8">
          <div className="container mx-auto px-2">
            <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {t(`values.${i}.title`)}
                  </h3>
                  <p className="text-gray-600">{t(`values.${i}.text`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ProblemSolutionCarousel />

        {/* Final CTA */}
        <section className="py-6 bg-gray-900 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-4">{t("finalCta.title")}</h2>
            <p className="text-xl text-gray-300 mb-4">{t("finalCta.subtitle")}</p>

            <div className="flex flex-col sm:flex-row gap-2 justify-center mb-6">
              <Link
                href={`/${locale}/contact`}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors text-center"
              >
                {t("finalCta.primary")}
              </Link>
              <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors">
                {t("finalCta.secondary")}
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400 max-w-2xl mx-auto">
              {t.raw("finalCta.badges").map((b: string, i: number) => (
                <div key={i}>✓ {b}</div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-gray-400 py-2">
          <div className="container mx-auto px-4 text-center">
            <p>{t("finalCta.footer.copyright")}</p>
            <p className="mt-2 text-sm">
              <a href="mailto:contact.travixosystems.com" className="hover:text-white">
                {t("finalCta.footer.email")}
              </a>
              {" • "}
              <span>+33 78 335 75 35</span>
            </p>
            <p className="mt-2 text-sm">
              <Link href={`/${locale}/privacy`} className="hover:text-white">
                {t("finalCta.footer.privacy")}
              </Link>
              {" • "}
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
