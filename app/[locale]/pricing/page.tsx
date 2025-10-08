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

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8 max-w-5xl">
          <h1 className="text-5xl font-bold text-center text-gray-900 mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </section>

        {/* Comparison Table Section */}
        <section className="bg-gray-50 py-6">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-4">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                {t('comparison.title')}
              </h2>
              <p className="text-xl text-gray-600">
                {t('comparison.subtitle')}
              </p>
            </div>

            {/* Responsive table wrapper */}
            <div className="overflow-x-auto">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm min-w-[900px]">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 w-[20%]">
                        {locale === 'fr' ? 'Fonctionnalité' : 'Feature'}
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 w-[25%]">
                        {locale === 'fr' ? 'Outils Traditionnels' : 'Traditional Tools'}
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-orange-600 w-[25%]">
                        TraviXO
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 w-[30%]">
                        {locale === 'fr' ? 'Pourquoi c\'est important' : 'Why It Matters'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {/* Setup Time Row */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-5 text-sm font-semibold text-gray-900">
                        {locale === 'fr' ? 'Temps de Configuration' : 'Setup Time'}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600">
                        <span className="text-red-600 font-bold mr-2">✗</span>
                        {locale === 'fr' ? '2-4 semaines de saisie' : '2-4 weeks of data entry'}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-900 font-semibold">
                        <span className="text-green-600 font-bold mr-2">✓</span>
                        {locale === 'fr' ? '15 minutes avec import Excel' : '15 minutes with Excel import'}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-700 italic">
                        {locale === 'fr' ? 'Commencez à suivre immédiatement' : 'Start tracking immediately'}
                      </td>
                    </tr>

                    {/* Excel Import Row */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-5 text-sm font-semibold text-gray-900">
                        {locale === 'fr' ? 'Import Excel' : 'Excel Import'}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600">
                        <span className="text-red-600 font-bold mr-2">✗</span>
                        {locale === 'fr' ? 'Non supporté' : 'Not supported'}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-900 font-semibold">
                        <span className="text-green-600 font-bold mr-2">✓</span>
                        {locale === 'fr' ? '500 actifs en 5 minutes' : '500 assets in 5 minutes'}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-700 italic">
                        {locale === 'fr' ? 'Éliminez 40+ heures de saisie manuelle' : 'Eliminate 40+ hours of manual entry'}
                      </td>
                    </tr>

                    {/* QR Generation Row */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-5 text-sm font-semibold text-gray-900">
                        {locale === 'fr' ? 'Génération QR' : 'QR Generation'}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600">
                        <span className="text-red-600 font-bold mr-2">✗</span>
                        {locale === 'fr' ? 'Manuel, un par un' : 'Manual, one at a time'}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-900 font-semibold">
                        <span className="text-green-600 font-bold mr-2">✓</span>
                        {locale === 'fr' ? 'En masse: 500 codes en 30 secondes' : 'Bulk: 500 codes in 30 seconds'}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-700 italic">
                        {locale === 'fr' ? 'Imprimez les étiquettes le jour même' : 'Print labels same day'}
                      </td>
                    </tr>

                    {/* Learning Curve Row */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-5 text-sm font-semibold text-gray-900">
                        {locale === 'fr' ? 'Courbe d\'apprentissage' : 'Learning Curve'}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600">
                        <span className="text-red-600 font-bold mr-2">✗</span>
                        {locale === 'fr' ? '2 semaines de formation' : '2 weeks training required'}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-900 font-semibold">
                        <span className="text-green-600 font-bold mr-2">✓</span>
                        {locale === 'fr' ? 'Utilisation immédiate' : 'Start using immediately'}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-700 italic">
                        {locale === 'fr' ? 'Aucune formation nécessaire' : 'Zero training needed'}
                      </td>
                    </tr>

                    {/* Mobile App Row */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-5 text-sm font-semibold text-gray-900">
                        {locale === 'fr' ? 'Application Mobile' : 'Mobile App'}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-600">
                        <span className="text-red-600 font-bold mr-2">✗</span>
                        {locale === 'fr' ? 'Téléchargement requis' : 'Must download and install'}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-900 font-semibold">
                        <span className="text-green-600 font-bold mr-2">✓</span>
                        {locale === 'fr' ? 'Scan direct avec téléphone' : 'No app needed, scan with phone'}
                      </td>
                      <td className="px-6 py-5 text-sm text-gray-700 italic">
                        {locale === 'fr' ? 'Fonctionne sur tous les téléphones' : 'Works on any phone instantly'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile scroll hint */}
            <p className="text-center text-sm text-gray-500 mt-4 md:hidden">
              ← {locale === 'fr' ? 'Faites défiler pour voir toutes les colonnes' : 'Scroll to see all columns'} →
            </p>
          </div>
        </section>

        {/* Pricing Cards Section - CORRECTED PRICES */}
        <section className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Starter - €250/mo */}
            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900">
                {locale === 'fr' ? 'Démarrage' : 'Starter'}
              </h3>
              <div className="mb-2">
                <span className="text-4xl font-bold text-gray-900">€250</span>
                <span className="text-lg text-gray-600">{t('plans.suffix')}</span>
              </div>
              <p className="text-gray-600 mb-2">
                {locale === 'fr' ? 'Parfait pour petites flottes' : 'Perfect for small fleets'}
              </p>
              <ul className="space-y-2 mb-8 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{locale === 'fr' ? 'Jusqu\'à 100 équipements' : 'Up to 100 assets'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{locale === 'fr' ? 'Import Excel intelligent' : 'Smart Excel import'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{locale === 'fr' ? 'Génération de QR en masse' : 'Bulk QR generation'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{locale === 'fr' ? 'Scan mobile (sans app)' : 'Mobile scanning (no app)'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{locale === 'fr' ? 'Support par email' : 'Email support'}</span>
                </li>
              </ul>
              <Link
                href={`/${locale}/contact`}
                className="block text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                {t('cta.start')}
              </Link>
            </div>

            {/* Professional - €750/mo - MOST POPULAR */}
            <div className="border-2 border-orange-500 rounded-lg p-6 relative transform lg:scale-105 shadow-xl">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                {t('plans.popular')}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {locale === 'fr' ? 'Professionnel' : 'Professional'}
              </h3>
              <div className="mb-2">
                <span className="text-4xl font-bold text-gray-900">€750</span>
                <span className="text-lg text-gray-600">{t('plans.suffix')}</span>
              </div>
              <p className="text-gray-600 mb-2">
                {locale === 'fr' ? 'Pour équipes en croissance' : 'For growing teams'}
              </p>
              <ul className="space-y-2 mb-8 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{locale === 'fr' ? 'Jusqu\'à 500 équipements' : 'Up to 500 assets'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{locale === 'fr' ? 'Tout du Starter, plus:' : 'Everything in Starter, plus:'}</span>
                </li>
                {locale === 'fr' && (
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                    <span className="text-sm">Conformité VGP automatisée</span>
                  </li>
                )}
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{locale === 'fr' ? 'Support multi-sites' : 'Multi-location support'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{locale === 'fr' ? 'Module d\'audit numérique' : 'Digital audit module'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{locale === 'fr' ? 'Intégration Zapier' : 'Zapier integration'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{locale === 'fr' ? 'Support prioritaire' : 'Priority support'}</span>
                </li>
              </ul>
              <Link
                href={`/${locale}/contact`}
                className="block text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                {t('cta.start')}
              </Link>
            </div>

            {/* Business - €2,500/mo */}
            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900">
                Business
              </h3>
              <div className="mb-2">
                <span className="text-3xl font-bold text-gray-900">€2 500</span>
                <span className="text-lg text-gray-600">{t('plans.suffix')}</span>
              </div>
              <p className="text-gray-600 mb-2">
                {locale === 'fr' ? 'Pour opérations moyennes' : 'For mid-size operations'}
              </p>
              <ul className="space-y-2 mb-8 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{locale === 'fr' ? 'Jusqu\'à 2 000 équipements' : 'Up to 2,000 assets'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{locale === 'fr' ? 'Tout du Professionnel +' : 'Everything in Professional +'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">ServiceNow</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">QuickBooks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{locale === 'fr' ? 'Gestionnaire dédié' : 'Dedicated manager'}</span>
                </li>
              </ul>
              <Link
                href={`/${locale}/contact`}
                className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                {t('cta.demo')}
              </Link>
            </div>

            {/* Enterprise - Custom pricing */}
            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900">
                Enterprise
              </h3>
              <div className="mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  {locale === 'fr' ? 'Sur mesure' : 'Custom'}
                </span>
              </div>
              <p className="text-gray-600 mb-2">
                {locale === 'fr' ? 'Pour grandes flottes' : 'For large fleets'}
              </p>
              <ul className="space-y-2 mb-8 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{locale === 'fr' ? 'Équipements illimités' : 'Unlimited assets'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{locale === 'fr' ? 'Intégrations sur mesure' : 'Custom integrations'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{locale === 'fr' ? 'Déploiement sur site' : 'On-premise option'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">SLA 99.9%+</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{locale === 'fr' ? 'Support 24/7' : '24/7 support'}</span>
                </li>
              </ul>
              <Link
                href={`/${locale}/contact`}
                className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                {t('cta.contact')}
              </Link>
            </div>

          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
              {t('faq.title')}
            </h2>
            <div className="space-y-4">
              {faq.map((item: { question: string; answer: string }, i: number) => (
                <div key={i} className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-6 bg-gray-900 text-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-4xl font-bold mb-6">{t('finalCta.title')}</h2>
            <p className="text-xl mb-8 opacity-90">{t('finalCta.subtitle')}</p>
            <Link
              href={`/${locale}/contact`}
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-4 rounded-lg text-lg transition-colors"
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