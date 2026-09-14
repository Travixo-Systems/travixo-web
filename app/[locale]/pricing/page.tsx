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

/**
 * The graduated rate bands above the 100 assets the base rate includes, and
 * the worked examples below the card.
 *
 * Both read out of messages/*.json rather than being written into the markup,
 * which is what the four hardcoded tier cards did before: a price edited on
 * one card was invisible to any parity check, and scripts/check-pricing.mjs
 * had to parse euro figures back out of this file to catch drift. The figures
 * now live in one place per locale and the checker validates them from there.
 */
type RateBand = { range: string; rate: string };
type PriceExample = { assets: string; monthly: string; annual: string };

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
  const bands = t.raw('tiers') as RateBand[];
  const examples = t.raw('examples.items') as PriceExample[];
  const included = t.raw('included.items') as string[];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">

        {/* Hero Section */}
        <section className="bg-ink py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <p className="text-center text-sm font-semibold uppercase tracking-wide text-brand mb-3">
              {t('hero.category')}
            </p>
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

        {/*
          Order: entry price, what it includes, how it scales, worked
          examples, then the full rate card. The bands moved off the primary
          card into a collapsed disclosure below: on the card they turned the
          headline offer into a rate table, which is the opposite of "one
          product, one price".
        */}
        <section className="container mx-auto px-4 py-6 max-w-7xl">
          {/*
            One product, so one card rather than a tier grid. Keeps the
            styling the highlighted card carried: border-2, the orange
            border-brand, rounded-lg p-6 and the same CTA block.
          */}
          <div className="mx-auto max-w-2xl border-2 border-brand rounded-lg p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900">
              {t('card.name')}
            </h2>

            <div className="mt-2 mb-2">
              <div className="mb-1">
                <span className="text-4xl font-bold text-gray-900">
                  {t('card.monthly')}
                </span>
                <span className="text-lg text-gray-600">/{t('billing.month')}</span>
              </div>
              <p className="text-gray-600">{t('card.included')}</p>
            </div>

            {/* Inclusions sit on the card itself: they are what the entry
                price buys, so separating them from it made the price read as
                unqualified. */}
            <div className="border-t border-gray-200 mt-4 pt-4">
              <h3 className="text-base font-bold text-gray-900 mb-3">
                {t('included.title')}
              </h3>
              <ul className="space-y-2">
                {included.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <span className="text-green-700 mr-2 flex-shrink-0">✓</span>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Annual sits under the monthly figure rather than beside it:
                inline after a 4xl price it wrapped mid-phrase. */}
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 border-t border-gray-200 mt-4 pt-4">
              <span className="text-2xl font-bold text-gray-900">
                {t('card.annual')}
              </span>
              <span className="text-base text-gray-600">/{t('billing.year')}</span>
              <span className="inline-flex items-center rounded-full bg-brand-tint px-3 py-1 text-xs font-bold text-orange-700 border-2 border-brand">
                {t('card.annualBadge')}
              </span>
            </div>

            <a
              href={SIGNUP_URL}
              className="mt-6 block text-center bg-brand hover:bg-brand-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              {t('cta.start')}
            </a>
            <Link
              href={`/${locale}/contact`}
              className="mt-3 block text-center bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              {t('cta.contact')}
            </Link>

            <p className="mt-4 text-sm text-gray-600">
              {t('card.noCommitment')}
            </p>
          </div>

          {/* How it scales, stated before the numbers that demonstrate it. */}
          <div className="mx-auto max-w-2xl mt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {t('scale.title')}
            </h2>
            <p className="text-gray-700">{t('scale.body')}</p>

            {/* Worked examples, deliberately not styled as cards: they are
                the same product at four fleet sizes, and a bordered grid
                would read as the tier grid this page replaced. */}
            <h3 className="mt-6 text-base font-bold text-gray-900">
              {t('examples.title')}
            </h3>
            <p className="mb-1 text-sm text-gray-600">
              {t('examples.note')}
            </p>
            <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {examples.map((example) => (
                <li
                  key={example.assets}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3"
                >
                  <span className="text-sm text-gray-700">{example.assets}</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {example.monthly}
                  </span>
                </li>
              ))}
            </ul>

            {/* Collapsed by default and visually secondary: the full rate
                card answers a question most visitors do not have, and open
                on the page it competes with the single headline price. */}
            <details className="mt-4 text-sm">
              <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                {t('scale.link')}
              </summary>
              <div className="mt-3 pl-4">
                <h4 className="sr-only">{t('bareme.title')}</h4>
                <p className="mb-2 text-xs text-gray-500">{t('bareme.unit')}</p>
                <ul className="space-y-2">
                  {bands.map((band) => (
                    <li
                      key={band.range}
                      className="flex items-baseline justify-between"
                    >
                      <span className="text-gray-700">{band.range}</span>
                      <span className="font-semibold text-gray-900">
                        {band.rate}
                      </span>
                    </li>
                  ))}
                  <li className="flex items-baseline justify-between">
                    <span className="text-gray-700">{t('bareme.quoteLabel')}</span>
                    <span className="font-semibold text-gray-900">
                      {t('bareme.quoteValue')}
                    </span>
                  </li>
                </ul>
              </div>
            </details>
          </div>

          {/* States the absence of upsells outright: the retired model gated
              VGP behind a higher tier, and silence about that reads as the
              gate still being there. */}
          <div className="mx-auto max-w-2xl mt-10 bg-surface-tint rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {t('allIn.title')}
            </h2>
            <p className="text-gray-700">{t('allIn.body')}</p>
            <p className="mt-2 text-gray-700">{t('allIn.note')}</p>
          </div>

          {/*
            Below the card rather than on it: it qualifies every price, and
            repeating it would read as a disclaimer rather than a statement
            of fact.
          */}
          <p className="mt-8 text-center text-sm text-gray-500">
            {t('billing.note')}
          </p>
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