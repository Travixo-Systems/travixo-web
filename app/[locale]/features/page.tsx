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

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
          </div>
        </section>

        {/* Differentiators Section */}
        <section className="bg-gray-50 py-8">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="text-center">
                <div className="text-5xl font-bold text-orange-500 mb-3">{t("differentiators.import.time")}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t("differentiators.import.title")}
                </h3>
                <p className="text-gray-600">
                  {t("differentiators.import.description")}
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl font-bold text-orange-500 mb-3">{t("differentiators.bulk.time")}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t("differentiators.bulk.title")}
                </h3>
                <p className="text-gray-600">
                  {t("differentiators.bulk.description")}
                </p>
              </div>

              <div className="text-center">
                <div className="text-5xl font-bold text-orange-500 mb-3">{t("differentiators.deploy.time")}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t("differentiators.deploy.title")}
                </h3>
                <p className="text-gray-600">
                  {t("differentiators.deploy.description")}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Section 1: Available Now - DETAILED */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                {t("availableNow.title")}
              </h2>
              <p className="text-lg text-gray-600">
                {t("availableNow.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Feature 1: QR Asset Tracking */}
              <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {t("availableNow.features.qrTracking.title")}
                  </h3>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 flex-shrink-0">
                    {t("status.availableNow")}
                  </span>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {t("availableNow.features.qrTracking.description")}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.qrTracking.items.0")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.qrTracking.items.1")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.qrTracking.items.2")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.qrTracking.items.3")}</span>
                  </li>
                </ul>
              </div>

              {/* Feature 2: VGP Compliance - HIGHLIGHTED */}
              <div className="border-2 border-orange-500 bg-orange-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {t("availableNow.features.vgp.title")}
                  </h3>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 flex-shrink-0">
                    {t("status.availableNow")}
                  </span>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {t("availableNow.features.vgp.description")}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start text-gray-700">
                    <span className="text-orange-600 mr-2 flex-shrink-0 mt-1 font-bold">✓</span>
                    <span>{t("availableNow.features.vgp.items.0")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-orange-600 mr-2 flex-shrink-0 mt-1 font-bold">✓</span>
                    <span>{t("availableNow.features.vgp.items.1")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-orange-600 mr-2 flex-shrink-0 mt-1 font-bold">✓</span>
                    <span>{t("availableNow.features.vgp.items.2")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-orange-600 mr-2 flex-shrink-0 mt-1 font-bold">✓</span>
                    <span>{t("availableNow.features.vgp.items.3")}</span>
                  </li>
                </ul>
              </div>

              {/* Feature 3: Excel Import */}
              <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {t("availableNow.features.excelImport.title")}
                  </h3>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 flex-shrink-0">
                    {t("status.availableNow")}
                  </span>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {t("availableNow.features.excelImport.description")}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.excelImport.items.0")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.excelImport.items.1")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.excelImport.items.2")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.excelImport.items.3")}</span>
                  </li>
                </ul>
              </div>

              {/* Feature 4: Mobile Scanning */}
              <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {t("availableNow.features.mobileScanning.title")}
                  </h3>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 flex-shrink-0">
                    {t("status.availableNow")}
                  </span>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {t("availableNow.features.mobileScanning.description")}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.mobileScanning.items.0")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.mobileScanning.items.1")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.mobileScanning.items.2")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.mobileScanning.items.3")}</span>
                  </li>
                </ul>
              </div>

              {/* Feature 5: DIRECCTE Reporting */}
              <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {t("availableNow.features.direccte.title")}
                  </h3>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 flex-shrink-0">
                    {t("status.availableNow")}
                  </span>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {t("availableNow.features.direccte.description")}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.direccte.items.0")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.direccte.items.1")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.direccte.items.2")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.direccte.items.3")}</span>
                  </li>
                </ul>
              </div>

              {/* Feature 6: Real-Time Dashboard */}
              <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {t("availableNow.features.dashboard.title")}
                  </h3>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 flex-shrink-0">
                    {t("status.availableNow")}
                  </span>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {t("availableNow.features.dashboard.description")}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.dashboard.items.0")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.dashboard.items.1")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.dashboard.items.2")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.dashboard.items.3")}</span>
                  </li>
                </ul>
              </div>

              {/* Feature 7: Email Alerts */}
              <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {t("availableNow.features.emailAlerts.title")}
                  </h3>
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 flex-shrink-0">
                    {t("status.availableNow")}
                  </span>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {t("availableNow.features.emailAlerts.description")}
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.emailAlerts.items.0")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.emailAlerts.items.1")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.emailAlerts.items.2")}</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-green-600 mr-2 flex-shrink-0 mt-1">✓</span>
                    <span>{t("availableNow.features.emailAlerts.items.3")}</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* Section 2: Coming Soon - SPARSE */}
        <section className="bg-gray-50 py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                {t("comingSoon.title")}
              </h2>
              <p className="text-lg text-gray-600">
                {t("comingSoon.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

              {/* Roadmap Feature 1: Team Management */}
              <div className="bg-white rounded-lg p-6 border-2 border-orange-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t("comingSoon.features.teamManagement.title")}</h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800 mb-3">
                  {t("status.comingQ1")}
                </span>
                <p className="text-gray-700 mb-4">{t("comingSoon.features.teamManagement.description")}</p>
              </div>

              {/* Roadmap Feature 2: API Access */}
              <div className="bg-white rounded-lg p-6 border-2 border-orange-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t("comingSoon.features.apiAccess.title")}</h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800 mb-3">
                  {t("status.comingQ2")}
                </span>
                <p className="text-gray-700 mb-4">{t("comingSoon.features.apiAccess.description")}</p>
              </div>

            </div>
          </div>
        </section>

        {/* Section 3: Enterprise Custom - SPARSE */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                {t("enterprise.title")}
              </h2>
              <p className="text-lg text-gray-600">
                {t("enterprise.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Enterprise Feature 1: Custom Integrations */}
              <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t("enterprise.features.customIntegrations.title")}</h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mb-3">
                  {t("status.builtOnDemand")}
                </span>
                <p className="text-gray-700 mb-2">{t("enterprise.features.customIntegrations.description")}</p>
                <p className="text-sm text-gray-600">{t("enterprise.features.customIntegrations.examples")}</p>
              </div>

              {/* Enterprise Feature 2: White-Label */}
              <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t("enterprise.features.whiteLabel.title")}</h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mb-3">
                  {t("status.builtOnDemand")}
                </span>
                <p className="text-gray-700">{t("enterprise.features.whiteLabel.description")}</p>
              </div>

              {/* Enterprise Feature 3: On-Premise */}
              <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t("enterprise.features.onPremise.title")}</h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mb-3">
                  {t("status.builtOnDemand")}
                </span>
                <p className="text-gray-700">{t("enterprise.features.onPremise.description")}</p>
              </div>

            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6 italic">
                {t("enterprise.note")}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                {t("enterprise.cta")}
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 bg-gray-900 text-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-4xl font-bold mb-6">{t("finalCta.title")}</h2>
            <p className="text-xl mb-8 opacity-90">{t("finalCta.subtitle")}</p>
            <Link
              href={`/${locale}/contact`}
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-4 rounded-lg text-lg transition-colors"
            >
              {t("finalCta.button")}
            </Link>
          </div>
        </section>

      </main>

      <footer className="bg-black text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Deralis Digital. {locale === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}</p>
          <p className="mt-2 text-sm">
            <Link href={`/${locale}/privacy`} className="hover:text-white">
              {locale === 'fr' ? 'Confidentialité' : 'Privacy'}
            </Link>
            {" • "}
            <Link href={`/${locale}/terms`} className="hover:text-white">
              {locale === 'fr' ? 'Conditions d\'utilisation' : 'Terms of Service'}
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}