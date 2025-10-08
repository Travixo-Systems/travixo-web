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
        
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-10 max-w-5xl">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </div>
        </section>

        {/* Key Differentiators - Simple 3 Column */}
        <section className="bg-gray-50 py-6">
          <div className="container mx-auto px-2 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500 mb-">5 min</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Smart Excel Import
                </h3>
                <p className="text-gray-600">
                  Import 500 assets in 5 minutes. Smart column detection works with any spreadsheet format.
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500 mb-">30 sec</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Bulk QR Generation
                </h3>
                <p className="text-gray-600">
                  Generate 500 QR codes as print-ready PDF in 30 seconds. No clicking through assets one by one.
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500 mb-">Same day</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Deploy Immediately
                </h3>
                <p className="text-gray-600">
                  Start tracking equipment the same day you sign up. No weeks of training or setup required.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Core Features - Clean Grid */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-6">
              Complete Asset Tracking Platform
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {coreFeatures.map((feature) => (
                <div key={feature.key} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {t(`coreFeatures.${feature.key}.title`)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t(`coreFeatures.${feature.key}.description`)}
                  </p>
                  <ul className="space-y-2">
                    {feature.items.map((item) => (
                      <li key={item} className="flex items-start text-gray-700">
                        <span className="text-green-600 mr-2 flex-shrink-0 mt-1">°</span>
                        <span>{t(`coreFeatures.${feature.key}.${item}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Simple CTA */}
        <section className="py-8 bg-gray-900 text-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-4xl font-bold mb-6">
              {t("cta.title")}
            </h2>
            <Link
              href={`/${locale}/contact`}
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-4 rounded-lg text-lg transition-colors"
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