import Link from "next/link";
import Navigation from "../components/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(props: Props) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata.features" });
  return { title: t("title"), description: t("description") };
}

export default async function FeaturesPage(props: Props) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "features" });

  const coreFeatures = [
    {
      key: "qrTracking",
      items: ["oneClick", "weatherproof", "staticUrls", "batchGeneration"]
    },
    {
      key: "mobileScanning",
      items: ["pwa", "cameraScanner", "offlineSync", "gpsLocation"]
    },
    {
      key: "dashboards",
      items: ["statusBreakdown", "utilizationRates", "customAlerts", "exportData"]
    },
    {
      key: "audits",
      items: ["mobileChecklist", "progressTracking", "missingAlerts", "complianceExports"]
    },
    {
      key: "integrations",
      items: ["serviceNow", "accounting", "zapier", "api"]
    },
    {
      key: "teamSecurity",
      items: ["roles", "twoFactor", "auditLogs", "multiLocation"]
    }
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="container mx-auto px-4 py-6 max-w-4xl">
          <h1 className="text-md font-bold text-center text-gray-900 mb-2">
            {t("hero.title")}
          </h1>
          <p className="text-xl text-center text-gray-600 mb-2">
            {t("hero.subtitle")}
          </p>
        </section>

        {/* Core Features */}
        <section className="bg-[#2d3a39] py-8">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center text-white mb-6">
              {t("coreFeatures.title")}
            </h2>

            <div className="space-y-12">
              {coreFeatures.map((feature) => (
                <div key={feature.key} className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {t(`coreFeatures.${feature.key}.title`)}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {t(`coreFeatures.${feature.key}.description`)}
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    {feature.items.map((item) => (
                      <li key={item}>✓ {t(`coreFeatures.${feature.key}.${item}`)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-10 bg-gray-900 text-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-4xl font-bold mb-4">
              {t("cta.title")}
            </h2>
            <Link
              href={`/${locale}/contact`}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors inline-block"
            >
              {t("cta.button")}
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-black text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>{t("footer.copyright")}</p>
          <p className="mt-2 text-sm">
            <Link href={`/${locale}/privacy`} className="hover:text-white">
              {t("footer.privacy")}
            </Link>
            {" • "}
            <Link href={`/${locale}/terms`} className="hover:text-white">
              {t("footer.terms")}
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}