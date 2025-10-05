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
        <section className="container mx-auto px-4 py-10 max-w-5xl">
          <h1 className="text-5xl font-bold text-center text-gray-900 mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-center text-gray-600 mb-4">
            {t('hero.subtitle')}
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="container mx-auto px-4 pb-16 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {(['starter', 'professional', 'business', 'enterprise'] as const).map((planKey, index) => {
              const plan = t.raw(`plans.${planKey}`);
              const isPopular = planKey === 'professional';

              return (
                <div
                  key={planKey}
                  className={`border-2 rounded-lg p-4 relative transition-colors ${isPopular
                      ? 'border-orange-500'
                      : 'border-gray-200 hover:border-orange-500'
                    }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {t('plans.popular')}
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {plan.name}
                  </h3>
                  <div className="mb-3">
                    <span className="text-2xl font-bold">{plan.price}</span>
                    {planKey !== 'enterprise' && (
                      <span className="text-sm text-gray-600">{t('plans.suffix')}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                  <ul className="space-y-1 mb-4 text-sm text-gray-600">
                    {plan.features.map((feature: string, i: number) => (
                      <li key={i}>✓ {feature}</li>
                    ))}
                  </ul>
                  {planKey === 'starter' || planKey === 'professional' ? (
                    <Link
                      href={`/${locale}/contact`}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors inline-block text-center"
                    >
                      {t('cta.start')}
                    </Link>
                  ) : planKey === 'business' ? (
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                      {t('cta.demo')}
                    </button>
                  ) : (
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                      {t('cta.contact')}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-10">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {t('faq.title')}
            </h2>
            <div className="space-y-8">
              {faq.map((item: { question: string; answer: string }, i: number) => (
                <div key={i}>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-4xl font-bold mb-6">{t('finalCta.title')}</h2>
            <Link
              href={`/${locale}/contact`}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors inline-block text-center"
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
