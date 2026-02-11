import { useTranslations } from 'next-intl'
import Navigation from "../components/navigation";
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
    const t = await getTranslations({ locale, namespace: 'metadata.about' })
    
    return {
        title: t('title'),
        description: t('description'),
    }
}

export default function AboutPage({ params }: { params: { locale: string } }) {
    const t = useTranslations('about')  // Keep single namespace
    const { locale } = params


    return (
        <>
            <Navigation />
            <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-[#00252b] to-[#2d3a39] text-white py-10">
                    <div className="container mx-auto px-4 max-w-4xl text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">
                            {t('hero.title')}
                        </h1>
                        <p className="text-xl text-gray-200">
                            {t('hero.subtitle')}
                        </p>
                    </div>
                </section>

                {/* Story Section */}
                <section className="py-8">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="prose prose-lg max-w-none">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                {t('story.title')}
                            </h2>

                            <div className="text-gray-700 space-y-4 leading-relaxed">
                                <p>
                                    {t('story.paragraph1')}
                                </p>

                                <p>
                                    {t('story.paragraph2')}
                                </p>

                                <p>
                                    {t('story.paragraph3')}
                                </p>

                                <ul className="list-disc list-inside space-y-2 ml-2">
                                    <li>{t('story.list.item1')}</li>
                                    <li>{t('story.list.item2')}</li>
                                    <li>{t('story.list.item3')}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="bg-orange-50 py-6">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">
                            {t('mission.title')}
                        </h2>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            {t('mission.description')}
                        </p>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-6">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                            {t('values.title')}
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Value 1 */}
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-orange-600 mb-2">
                                    {t('values.efficiency.title')}
                                </h3>
                                <p className="text-gray-700">
                                    {t('values.efficiency.description')}
                                </p>
                            </div>

                            {/* Value 2 */}
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-orange-600 mb-2">
                                    {t('values.realWorld.title')}
                                </h3>
                                <p className="text-gray-700">
                                    {t('values.realWorld.description')}
                                </p>
                            </div>

                            {/* Value 3 */}
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-orange-600 mb-2">
                                    {t('values.transparency.title')}
                                </h3>
                                <p className="text-gray-700">
                                    {t('values.transparency.description')}
                                </p>
                            </div>

                            {/* Value 4 */}
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-orange-600 mb-2">
                                    {t('values.customerFirst.title')}
                                </h3>
                                <p className="text-gray-700">
                                    {t('values.customerFirst.description')}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Founders Section */}
                <section className="bg-gray-50 py-6">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {t('founders.title')}
                        </h2>

                        <div className="text-gray-700 space-y-4 leading-relaxed">
                            <p>
                                {t('founders.description')}
                            </p>

                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>{t('founders.list.item1')}</li>
                                <li>{t('founders.list.item2')}</li>
                            </ul>

                            <p className="mt-6">
                                {t('founders.conclusion')}
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-4">
                    <div className="container mx-auto px-4 max-w-4xl text-center">
                        <h2 className="text-3xl font-bold mb-2">
                            {t('cta.title')}
                        </h2>
                        <p className="text-xl mb-">
                            {t('cta.description')}
                        </p>
                        <a
                            href="https://app.travixosystems.com/signup"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
                        >
                            {t('cta.button')}
                        </a>
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
    )
}