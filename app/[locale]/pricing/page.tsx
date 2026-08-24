import FaqSection, { type FaqItem } from "../components/FaqSection";
import Footer from "../components/Footer";
import { buildPageMetadata, type Locale , SIGNUP_URL } from "@/lib/seo";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Navigation from '../components/navigation';
import Link from 'next/link';

type Props = {
  params: Promise<{ locale: string }>;
};

/**
 * The comparison rows, in display order.
 *
 * Drives both the stacked cards below md and the table above it. The four rows
 * were previously hand duplicated in the markup, so the two views would have
 * had to be kept in step by hand.
 *
 * Keys index into pricing.comparison.rows in messages/*.json.
 */
const COMPARISON_ROWS = [
  { key: "vgp", highlight: true },
  { key: "setup", highlight: false },
  { key: "excel", highlight: false },
  { key: "qr", highlight: false },
] as const;

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  return buildPageMetadata({ locale: locale as Locale, routeKey: "pricing" });
}

export default async function PricingPage(props: Props) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'pricing' });
  const faq = t.raw('faq.questions') as FaqItem[];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">

        {/* Hero Section */}
        <section className="bg-ink py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h1 className="text-5xl font-bold text-center text-white mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-center text-white/80 max-w-3xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="bg-surface-tint py-6">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-4">
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                {t('comparison.title')}
              </h2>
            </div>

            {/* Below lg the table becomes one card per row: 900px could not be
                made to fit a phone (an iPhone 14 was 542px short), and the four
                rows are four before/after arguments rather than data anyone
                scans across, so stacking them loses nothing.

                lg rather than md because the table's natural width is 771px:
                at exactly 768px it rendered but overflowed by 47px, since the
                container's own padding comes out of that. Cards carry the
                whole tablet range instead.

                Both views render from COMPARISON_ROWS above, so the card copy
                and the table copy cannot drift apart. */}
            <div className="space-y-4 lg:hidden">
              {COMPARISON_ROWS.map((row) => (
                <div
                  key={row.key}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm p-5"
                >
                  <h3 className="text-base font-bold text-gray-900 mb-4">
                    {t(`comparison.rows.${row.key}.label`)}
                  </h3>

                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                    {t('comparison.headers.traditional')}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="text-red-600 font-bold mr-2">✗</span>
                    {t(`comparison.rows.${row.key}.traditional`)}
                  </p>

                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-ink mb-1">
                    TraviXO
                  </p>
                  <p className="text-sm text-gray-900 font-semibold">
                    <span className="text-green-700 font-bold mr-2">✓</span>
                    {t(`comparison.rows.${row.key}.travixo`)}
                  </p>

                  <p className="text-sm text-gray-700 italic border-t border-gray-200 mt-4 pt-3">
                    {t(`comparison.rows.${row.key}.whyItMatters`)}
                  </p>
                </div>
              ))}
            </div>

            {/* Tightened cell padding took the table's natural width from 900px
                down to 771px, measured in the browser. min-w is 768 rather than
                the old 820, which was padding beyond what the content needs and
                put a scrollbar back at 820px. overflow-x-auto stays as the
                backstop for longer translated strings. */}
            <div className="hidden lg:block overflow-x-auto">
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm min-w-[768px]">
                <table className="w-full">
                  <thead className="bg-surface-tint border-b-2 border-gray-200">
                    <tr>
                      <th className="px-4 py-4 text-left text-sm font-bold text-gray-900 w-[20%]">
                        {t('comparison.headers.feature')}
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-bold text-gray-900 w-[25%]">
                        {t('comparison.headers.traditional')}
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-bold text-brand-ink w-[25%]">
                        TraviXO
                      </th>
                      <th className="px-4 py-4 text-left text-sm font-bold text-gray-900 w-[30%]">
                        {t('comparison.headers.whyItMatters')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {COMPARISON_ROWS.map((row) => (
                      <tr
                        key={row.key}
                        className={`hover:bg-surface-tint transition-colors ${
                          row.highlight ? "bg-orange-50" : ""
                        }`}
                      >
                        <td className="px-4 py-5 text-sm font-semibold text-gray-900">
                          {t(`comparison.rows.${row.key}.label`)}
                        </td>
                        <td className="px-4 py-5 text-sm text-gray-600">
                          <span className="text-red-600 font-bold mr-2">✗</span>
                          {t(`comparison.rows.${row.key}.traditional`)}
                        </td>
                        <td className="px-4 py-5 text-sm text-gray-900 font-semibold">
                          <span className="text-green-700 font-bold mr-2">✓</span>
                          {t(`comparison.rows.${row.key}.travixo`)}
                        </td>
                        <td className="px-4 py-5 text-sm text-gray-700 italic">
                          {t(`comparison.rows.${row.key}.whyItMatters`)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>

        {/* Pricing Cards Section - ANNUAL FIRST */}
        <section className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Starter - €5,880/yr (€490/mo) */}
            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900">
                {t('plans.starter.name')}
              </h3>
              <div className="mb-2">
                <div className="mb-1">
                  <span className="text-4xl font-bold text-gray-900">€5 880</span>
                  <span className="text-lg text-gray-600">/{t('billing.year')}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {t('billing.or')} <span className="font-medium">€490</span>/{t('billing.month')}
                </p>
              </div>
              <p className="text-gray-600 mb-2">
                {t('plans.starter.subtitle')}
              </p>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-700 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{t('plans.starter.features.assets')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{t('plans.starter.features.excel')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{t('plans.starter.features.qr')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{t('plans.starter.features.scan')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{t('plans.starter.features.support')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-ink mr-2 flex-shrink-0">→</span>
                  <span className="text-sm text-orange-700">{t('plans.starter.features.noVgp')}</span>
                </li>
              </ul>

              {/* Available Extensions - Collapsible */}
              <details className="mb-6 text-sm">
                <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                  {t('plans.extensions.title')}
                </summary>
                <ul className="mt-2 pl-4 space-y-1 text-gray-700">
                  <li>• {t('plans.extensions.starterAssets')}</li>
                </ul>
              </details>
              <a
                href={SIGNUP_URL}
                className="block text-center bg-brand hover:bg-brand-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                {t('cta.start')}
              </a>
            </div>

            {/* Professional - €14,400/yr (€1,200/mo) - MOST POPULAR */}
            <div className="border-2 border-brand rounded-lg p-6 relative transform lg:scale-105 shadow-xl">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand text-white px-4 py-1 rounded-full text-sm font-semibold">
                {t('plans.popular')}
              </div>
              {/* VGP Badge */}
              <div className="absolute -top-3 right-4 bg-brand-tint text-orange-700 px-3 py-1 rounded-full text-xs font-bold border-2 border-brand">
                {t('plans.vgpIncluded')}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                {t('plans.professional.name')}
              </h3>
              <div className="mb-2">
                <div className="mb-1">
                  <span className="text-4xl font-bold text-gray-900">€14 400</span>
                  <span className="text-lg text-gray-600">/{t('billing.year')}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {t('billing.or')} <span className="font-medium">€1 200</span>/{t('billing.month')}
                </p>
              </div>
              <p className="text-gray-600 mb-2">
                {t('plans.professional.subtitle')}
              </p>
              <ul className="space-y-2 mb-6 text-gray-700">
                {/* VGP FIRST */}
                <li className="flex items-start bg-orange-50 p-2 rounded -mx-2">
                  <span className="text-brand-ink mr-2 flex-shrink-0 font-bold">✓</span>
                  <span className="text-sm font-semibold text-orange-900">{t('plans.professional.features.vgp')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{t('plans.professional.features.assets')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{t('plans.professional.features.starter')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{t('plans.professional.features.multiSite')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{t('plans.professional.features.audit')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{t('plans.professional.features.integration')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{t('plans.professional.features.support')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{t('plans.professional.features.emailAlerts')}</span>
                </li>
              </ul>

              {/* Available Extensions - Collapsible */}
              <details className="mb-6 text-sm">
                <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                  {t('plans.extensions.title')}
                </summary>
                <ul className="mt-2 pl-4 space-y-1 text-gray-700">
                  <li>• {t('plans.extensions.predictive')}</li>
                  <li>• {t('plans.extensions.erp')}</li>
                  <li>• {t('plans.extensions.sla')}</li>
                </ul>
              </details>
              <a
                href={SIGNUP_URL}
                className="block text-center bg-brand hover:bg-brand-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                {t('cta.start')}
              </a>
            </div>

            {/* Business - €28,800/yr (€2,400/mo) */}
            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900">
                {t('plans.business.name')}
              </h3>
              <div className="mb-2">
                <div className="mb-1">
                  <span className="text-3xl font-bold text-gray-900">€28 800</span>
                  <span className="text-lg text-gray-600">/{t('billing.year')}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {t('billing.or')} <span className="font-medium">€2 400</span>/{t('billing.month')}
                </p>
              </div>
              <p className="text-gray-600 mb-2">
                {t('plans.business.subtitle')}
              </p>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-700 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{t('plans.business.features.assets')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{t('plans.business.features.professional')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{t('plans.business.features.vgpPriority')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{t('plans.business.features.integrations')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{t('plans.business.features.manager')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{t('plans.business.features.sla')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{t('plans.business.features.advancedReporting')}</span>
                </li>


              </ul>

              {/* Available Extensions - Collapsible */}
              <details className="mb-6 text-sm">
                <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                  {t('plans.extensions.title')}
                </summary>
                <ul className="mt-2 pl-4 space-y-1 text-gray-700">
                  <li>• {t('plans.extensions.advancedAnalytics')}</li>
                  <li>• {t('plans.extensions.multiErp')}</li>
                </ul>
              </details>
              <Link
                href={`/${locale}/contact`}
                className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                {t('cta.demo')}
              </Link>
            </div>

            {/* Enterprise - Custom */}
            <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900">
                {t('plans.enterprise.name')}
              </h3>
              <div className="mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  {t('plans.enterprise.price')}
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                {t('plans.enterprise.annual')}
              </p>
              <p className="text-gray-600 mb-2">
                {t('plans.enterprise.subtitle')}
              </p>
              <ul className="space-y-2 mb-8 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-700 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{t('plans.enterprise.features.unlimited')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{t('plans.enterprise.features.vgpDedicated')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-700 mr-2 flex-shrink-0">✓</span>
                  <span className="text-sm">{t('plans.enterprise.features.support')}</span>
                </li>
                {/* Enterprise Custom Features */}
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 flex-shrink-0">•</span>
                  <div className="text-sm">
                    {t('plans.enterprise.features.customIntegrations')}
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {t('status.builtOnDemand')}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 flex-shrink-0">•</span>
                  <div className="text-sm">
                    {t('plans.enterprise.features.whiteLabel')}
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {t('status.builtOnDemand')}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 flex-shrink-0">•</span>
                  <div className="text-sm">
                    {t('plans.enterprise.features.onPremise')}
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {t('status.builtOnDemand')}
                    </span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2 flex-shrink-0">•</span>
                  <div className="text-sm">
                    {t('plans.enterprise.features.sla')}
                  </div>
                </li>
              </ul>
              <p className="text-xs text-gray-500 mb-4 italic">
                {t('plans.enterprise.note')}
              </p>
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
        <FaqSection title={t('faq.title')} items={faq} id="pricing-faq" />

        {/* Final CTA */}
        <section className="py-6 bg-ink text-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-4xl font-bold mb-6">{t('finalCta.title')}</h2>
            <p className="text-xl mb-8 opacity-90">{t('finalCta.subtitle')}</p>
            <a
              href={SIGNUP_URL}
              className="inline-block bg-brand hover:bg-brand-hover text-white font-semibold px-10 py-4 rounded-lg text-lg transition-colors"
            >
              {t('finalCta.button')}
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer locale={locale as Locale} />
    </>
  );
}