import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navigation from '../components/navigation';
import Link from 'next/link';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'metadata.pricing' });

  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function PricingPage(props: Props) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'pricing' });
  const faq = await t.raw('faq.questions');

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">

        {/* Hero Section - COMPACT, SALES-FIRST */}
        <section className="container mx-auto px-4 pt-12 pb-6 max-w-4xl">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-3">
            {t('hero.title')}
          </h1>
          <p className="text-lg text-center text-gray-600 mb-2">
            {t('hero.subtitle')}
          </p>
          <p className="text-base text-center text-gray-500 max-w-2xl mx-auto">
            {t('hero.supporting')}
          </p>
        </section>

        {/* Comparison Table Section - TIGHT, FACTUAL */}
        <section className="bg-gray-50 py-8">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {t('comparison.title')}
              </h2>
              <p className="text-base text-gray-600">
                {t('comparison.subtitle')}
              </p>
            </div>

            {/* Compact table */}
            <div className="overflow-x-auto">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm min-w-[900px]">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 w-[18%]">
                        {locale === 'fr' ? 'Fonctionnalité' : 'Feature'}
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 w-[27%]">
                        {locale === 'fr' ? 'Outils Traditionnels' : 'Traditional Tools'}
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 w-[27%]">
                        TraviXO
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 w-[28%]">
                        {locale === 'fr' ? 'Pourquoi c\'est important' : 'Why It Matters'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {/* VGP Compliance Row - Subtle emphasis */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {locale === 'fr' ? 'Conformité VGP' : 'VGP Compliance'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <span className="text-red-600 text-xs mr-1">✗</span>
                        {locale === 'fr' ? 'Suivi manuel, risque d\'amendes €15K+' : 'Manual tracking, €15K+ fine risk'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <span className="text-green-600 text-xs mr-1">✓</span>
                        {locale === 'fr' ? 'Automatisé, zéro risque de non-conformité' : 'Fully automated, zero compliance risk'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 italic">
                        {locale === 'fr' ? 'Obligatoire pour location d\'équipement en France' : 'Mandatory for French equipment rental'}
                      </td>
                    </tr>

                    {/* Setup Time */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {locale === 'fr' ? 'Temps de Configuration' : 'Setup Time'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <span className="text-red-600 text-xs mr-1">✗</span>
                        {locale === 'fr' ? '2-4 semaines de saisie' : '2-4 weeks of data entry'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <span className="text-green-600 text-xs mr-1">✓</span>
                        {locale === 'fr' ? '15 minutes avec import Excel' : '15 minutes with Excel import'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 italic">
                        {locale === 'fr' ? 'Commencez à suivre immédiatement' : 'Start tracking immediately'}
                      </td>
                    </tr>

                    {/* Excel Import */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {locale === 'fr' ? 'Import Excel' : 'Excel Import'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <span className="text-red-600 text-xs mr-1">✗</span>
                        {locale === 'fr' ? 'Non supporté' : 'Not supported'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <span className="text-green-600 text-xs mr-1">✓</span>
                        {locale === 'fr' ? '500 actifs en 5 minutes' : '500 assets in 5 minutes'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 italic">
                        {locale === 'fr' ? 'Éliminez 40+ heures de saisie manuelle' : 'Eliminate 40+ hours of manual entry'}
                      </td>
                    </tr>

                    {/* QR Generation */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {locale === 'fr' ? 'Génération QR' : 'QR Generation'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <span className="text-red-600 text-xs mr-1">✗</span>
                        {locale === 'fr' ? 'Manuel, un par un' : 'Manual, one at a time'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <span className="text-green-600 text-xs mr-1">✓</span>
                        {locale === 'fr' ? 'En masse: 500 codes en 30 secondes' : 'Bulk: 500 codes in 30 seconds'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 italic">
                        {locale === 'fr' ? 'Imprimez les étiquettes le jour même' : 'Print labels same day'}
                      </td>
                    </tr>

                    {/* Learning Curve */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {locale === 'fr' ? 'Courbe d\'apprentissage' : 'Learning Curve'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <span className="text-red-600 text-xs mr-1">✗</span>
                        {locale === 'fr' ? '2 semaines de formation' : '2 weeks training required'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <span className="text-green-600 text-xs mr-1">✓</span>
                        {locale === 'fr' ? 'Utilisation immédiate' : 'Start using immediately'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 italic">
                        {locale === 'fr' ? 'Aucune formation nécessaire' : 'Zero training needed'}
                      </td>
                    </tr>

                    {/* Mobile App */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {locale === 'fr' ? 'Application Mobile' : 'Mobile App'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <span className="text-red-600 text-xs mr-1">✗</span>
                        {locale === 'fr' ? 'Téléchargement requis' : 'Must download and install'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        <span className="text-green-600 text-xs mr-1">✓</span>
                        {locale === 'fr' ? 'Scan direct avec téléphone' : 'No app needed, scan with phone'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 italic">
                        {locale === 'fr' ? 'Fonctionne sur tous les téléphones' : 'Works on any phone instantly'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 mt-3 md:hidden">
              ← {locale === 'fr' ? 'Faites défiler pour voir toutes les colonnes' : 'Scroll to see all columns'} →
            </p>
          </div>
        </section>

        {/* Pricing Cards Section - PREMIUM, COMPOSED */}
        <section className="container mx-auto px-4 py-10 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* Starter - €5,880/yr */}
            <div className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors bg-white">
              <h3 className="text-xl font-bold text-gray-900">
                {t('plans.starter.name')}
              </h3>
              <div className="my-3">
                <div className="mb-1">
                  <span className="text-3xl font-bold text-gray-900">€5 880</span>
                  <span className="text-base text-gray-600">/an</span>
                </div>
                <div className="text-sm text-gray-600">
                  {t('billing.orMonthly')} <span className="font-medium">€490</span>
                </div>
                <p className="text-xs text-green-700 mt-1">
                  {t('billing.savingsHint')}
                </p>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {t('plans.starter.subtitle')}
              </p>
              <ul className="space-y-2 mb-6 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xs">✓</span>
                  <span>{t('plans.starter.features.assets')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xs">✓</span>
                  <span>{t('plans.starter.features.excel')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xs">✓</span>
                  <span>{t('plans.starter.features.qr')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xs">✓</span>
                  <span>{t('plans.starter.features.scan')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 text-xs">✗</span>
                  <span className="text-gray-500">{t('plans.starter.features.noVgp')}</span>
                </li>
              </ul>
              <Link
                href={`/${locale}/contact`}
                className="block text-center border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors text-sm"
              >
                {t('cta.start')}
              </Link>
            </div>

            {/* Professional - €14,400/yr - SOFT HIGHLIGHT */}
            <div className="border-2 border-gray-300 rounded-lg p-5 bg-gray-50 relative">
              <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white px-3 py-0.5 rounded-full text-xs font-medium">
                {t('plans.popular')}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-1">
                {t('plans.professional.name')}
              </h3>
              <div className="my-3">
                <div className="mb-1">
                  <span className="text-3xl font-bold text-gray-900">€14 400</span>
                  <span className="text-base text-gray-600">/an</span>
                </div>
                <div className="text-sm text-gray-600">
                  {t('billing.orMonthly')} <span className="font-medium">€1 200</span>
                </div>
                <p className="text-xs text-green-700 mt-1">
                  {t('billing.savingsHint')}
                </p>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {t('plans.professional.subtitle')}
              </p>
              <ul className="space-y-2 mb-6 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xs">✓</span>
                  <span className="font-medium">{t('plans.professional.features.vgp')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xs">✓</span>
                  <span>{t('plans.professional.features.assets')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xs">✓</span>
                  <span>{t('plans.professional.features.multiSite')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xs">✓</span>
                  <span>{t('plans.professional.features.audit')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xs">✓</span>
                  <span>{t('plans.professional.features.integration')}</span>
                </li>
              </ul>
              <Link
                href={`/${locale}/contact`}
                className="block text-center bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm"
              >
                {t('cta.start')}
              </Link>
            </div>

            {/* Business - €28,800/yr */}
            <div className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors bg-white">
              <h3 className="text-xl font-bold text-gray-900">
                {t('plans.business.name')}
              </h3>
              <div className="my-3">
                <div className="mb-1">
                  <span className="text-3xl font-bold text-gray-900">€28 800</span>
                  <span className="text-base text-gray-600">/an</span>
                </div>
                <div className="text-sm text-gray-600">
                  {t('billing.orMonthly')} <span className="font-medium">€2 400</span>
                </div>
                <p className="text-xs text-green-700 mt-1">
                  {t('billing.savingsHint')}
                </p>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {t('plans.business.subtitle')}
              </p>
              <ul className="space-y-2 mb-6 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xs">✓</span>
                  <span>{t('plans.business.features.assets')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xs">✓</span>
                  <span>{t('plans.business.features.vgpPriority')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xs">✓</span>
                  <span>{t('plans.business.features.integrations')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xs">✓</span>
                  <span>{t('plans.business.features.manager')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xs">✓</span>
                  <span>{t('plans.business.features.sla')}</span>
                </li>
              </ul>
              <Link
                href={`/${locale}/contact`}
                className="block text-center border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors text-sm"
              >
                {t('cta.demo')}
              </Link>
            </div>

            {/* Enterprise - €40K+/yr */}
            <div className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 transition-colors bg-white">
              <h3 className="text-xl font-bold text-gray-900">
                {t('plans.enterprise.name')}
              </h3>
              <div className="my-3">
                <div className="mb-1">
                  <span className="text-2xl font-bold text-gray-900">
                    {t('plans.enterprise.price')}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {t('plans.enterprise.annualNote')}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {t('plans.enterprise.subtitle')}
              </p>
              <ul className="space-y-2 mb-6 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xs">✓</span>
                  <span>{t('plans.enterprise.features.unlimited')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xs">✓</span>
                  <span>{t('plans.enterprise.features.vgpDedicated')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xs">✓</span>
                  <span>{t('plans.enterprise.features.custom')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xs">✓</span>
                  <span>{t('plans.enterprise.features.onPremise')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 text-xs">✓</span>
                  <span>{t('plans.enterprise.features.support')}</span>
                </li>
              </ul>
              <Link
                href={`/${locale}/contact`}
                className="block text-center border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-4 py-2 rounded-lg transition-colors text-sm"
              >
                {t('cta.contact')}
              </Link>
            </div>

          </div>
        </section>

        {/* Optional Modules - UNDERSTATED, MODULAR */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                {t('extensions.title')}
              </h3>
              <p className="text-sm text-gray-600">
                {t('extensions.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Add-on 1 */}
              <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors">
                <h4 className="text-base font-semibold text-gray-900 mb-1">
                  {t('extensions.extraAssets.title')}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {t('extensions.extraAssets.description')}
                </p>
                <p className="text-xs text-gray-500">
                  {t('extensions.extraAssets.price')}
                </p>
              </div>

              {/* Add-on 2 */}
              <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors">
                <h4 className="text-base font-semibold text-gray-900 mb-1">
                  {t('extensions.predictive.title')}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {t('extensions.predictive.description')}
                </p>
                <p className="text-xs text-gray-500">
                  {t('extensions.predictive.price')}
                </p>
              </div>

              {/* Add-on 3 */}
              <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors">
                <h4 className="text-base font-semibold text-gray-900 mb-1">
                  {t('extensions.erp.title')}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {t('extensions.erp.description')}
                </p>
                <p className="text-xs text-gray-500">
                  {t('extensions.erp.price')}
                </p>
              </div>

              {/* Add-on 4 */}
              <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors">
                <h4 className="text-base font-semibold text-gray-900 mb-1">
                  {t('extensions.sla.title')}
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  {t('extensions.sla.description')}
                </p>
                <p className="text-xs text-gray-500">
                  {t('extensions.sla.price')}
                </p>
              </div>

            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600 mb-3">
                {t('extensions.cta.text')}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-block border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-6 py-2 rounded-lg transition-colors text-sm"
              >
                {t('extensions.cta.button')}
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-10 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              {t('faq.title')}
            </h2>
            <div className="space-y-5">
              {faq.map((item: { question: string; answer: string }, i: number) => (
                <div key={i} className="border-b border-gray-200 pb-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.question}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-8 bg-gray-900 text-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">{t('finalCta.title')}</h2>
            <p className="text-lg mb-6 opacity-90">{t('finalCta.subtitle')}</p>
            <Link
              href={`/${locale}/contact`}
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              {t('finalCta.button')}
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>{t('footer.copyright')}</p>
          <p className="mt-2 text-sm">
            <Link href={`/${locale}/privacy`} className="hover:text-white">
              {t('footer.privacy')}
            </Link>
            {" • "}
            <Link href={`/${locale}/terms`} className="hover:text-white">
              {t('footer.terms')}
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}