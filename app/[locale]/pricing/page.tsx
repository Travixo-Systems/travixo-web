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
type CapabilityGroup = { title: string; body: string };
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
  const groups = t.raw('groups') as CapabilityGroup[];

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

            {/* The promise states what the price buys before the capability
                groups enumerate it: the four groups alone read as a feature
                list, which is what the retired tier cards did. */}
            <p className="border-t border-gray-200 mt-4 pt-4 text-gray-700">
              {t('card.promise')}
            </p>

            {/* Four capability groups, title plus one line, rather than a
                flat checkmark list. The list ran to fifteen items and read as
                a spec sheet; grouped, it reads as one product with a single
                history per asset. */}
            <div className="mt-4">
              <h3 className="text-base font-bold text-gray-900 mb-3">
                {t('card.groupsTitle')}
              </h3>
              <ul className="space-y-3">
                {groups.map((group) => (
                  <li key={group.title}>
                    <p className="text-sm font-semibold text-gray-900">
                      {group.title}
                    </p>
                    <p className="text-sm text-gray-700">{group.body}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-gray-600">{t('card.reach')}</p>
            </div>

            {/* Annual sits under the monthly figure rather than beside it:
                inline after a 4xl price it wrapped mid-phrase. */}
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 border-t border-gray-200 mt-4 pt-4">
              <span className="text-2xl font-bold text-gray-900">
                {t('card.annual')}
              </span>
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

          {/* Worked examples, deliberately not styled as cards: they are the
              same product at four fleet sizes, and a bordered grid would read
              as the tier grid this page replaced. */}
          <div className="mx-auto max-w-2xl mt-10">
            <h2 className="text-xl font-bold text-gray-900">
              {t('examples.title')}
            </h2>
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

            <p className="mt-4 text-gray-700">{t('examples.growth')}</p>

            {/* Collapsed by default and visually secondary: the full rate
                card answers a question most visitors do not have, and open
                on the page it competes with the single headline price. */}
            <details className="mt-4 text-sm">
              <summary className="cursor-pointer text-gray-600 hover:text-gray-800">
                {t('bareme.link')}
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
              gate still being there. Deliberately does not re-list the four
              capability groups; the card already carries them. */}
          <div className="mx-auto max-w-2xl mt-10 bg-surface-tint rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {t('differentiator.title')}
            </h2>
            <p className="text-gray-700">{t('differentiator.body')}</p>
          </div>

          {/* Onboarding answers the objection the price does not: what it
              costs to get started, in effort rather than euros. No speed or
              volume claims. */}
          <div className="mx-auto max-w-2xl mt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {t('onboarding.title')}
            </h2>
            <p className="text-gray-700">{t('onboarding.body')}</p>
            <p className="mt-2 text-sm text-gray-600">{t('onboarding.note')}</p>
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