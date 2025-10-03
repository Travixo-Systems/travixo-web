import Navigation from "../components/navigation";
import Link from "next/link";
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ _locale: string }>;
};

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const t = await getTranslations({ _locale: params._locale, namespace: 'metadata.pricing' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function PricingPage(props: Props) {
  const params = await props.params;
  setRequestLocale(params._locale);
  
  const t = await getTranslations({ _locale: params._locale, namespace: 'pricing' });

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="container mx-auto px-4 pb-20">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Starter Plan */}
            <div className="border border-gray-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-2">{t('plans.starter.name')}</h3>
              <div className="text-4xl font-bold mb-4">
                {t('plans.starter.price')}
                <span className="text-lg text-gray-600 font-normal">{t('plans.suffix')}</span>
              </div>
              <p className="text-gray-600 mb-6">{t('plans.starter.description')}</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{t('plans.starter.features.0')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{t('plans.starter.features.1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{t('plans.starter.features.2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{t('plans.starter.features.3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{t('plans.starter.features.4')}</span>
                </li>
              </ul>
              <Link 
                href={`/${params._locale}/contact`}
                className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {t('cta.contact')}
              </Link>
            </div>

            {/* Professional Plan (Popular) */}
            <div className="border-2 border-orange-500 rounded-xl p-8 relative shadow-lg">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                {t('plans.popular')}
              </div>
              <h3 className="text-2xl font-bold mb-2">{t('plans.professional.name')}</h3>
              <div className="text-4xl font-bold mb-4">
                {t('plans.professional.price')}
                <span className="text-lg text-gray-600 font-normal">{t('plans.suffix')}</span>
              </div>
              <p className="text-gray-600 mb-6">{t('plans.professional.description')}</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{t('plans.professional.features.0')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{t('plans.professional.features.1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{t('plans.professional.features.2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{t('plans.professional.features.3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{t('plans.professional.features.4')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{t('plans.professional.features.5')}</span>
                </li>
              </ul>
              <Link 
                href={`/${params._locale}/contact`}
                className="block text-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {t('cta.start')}
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="border border-gray-200 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-2">{t('plans.enterprise.name')}</h3>
              <div className="text-4xl font-bold mb-4">
                {t('plans.enterprise.price')}
              </div>
              <p className="text-gray-600 mb-6">{t('plans.enterprise.description')}</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{t('plans.enterprise.features.0')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{t('plans.enterprise.features.1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{t('plans.enterprise.features.2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{t('plans.enterprise.features.3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{t('plans.enterprise.features.4')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{t('plans.enterprise.features.5')}</span>
                </li>
              </ul>
              <Link 
                href={`/${params._locale}/contact`}
                className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {t('cta.contact')}
              </Link>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}