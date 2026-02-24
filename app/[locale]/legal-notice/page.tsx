import { getTranslations } from "next-intl/server";
import Navigation from "../components/navigation";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.legalNotice" });

  const baseUrl = 'https://travixosystems.com';
  const currentUrl = `${baseUrl}/${locale}/legal-notice`;
  const title = t("title");
  const description = t("description");

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: currentUrl,
      type: 'website',
      locale: locale,
      alternateLocale: locale === 'en' ? ['fr'] : ['en'],
      siteName: 'TraviXO',
    },
    twitter: {
      card: 'summary',
      title: title,
      description: description,
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        'en': `${baseUrl}/en/legal-notice`,
        'fr': `${baseUrl}/fr/legal-notice`,
      },
    },
  };
}

export default async function LegalNoticePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("legalNotice");

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        <div className="container border-l-4 border-[#f26f00] mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold text-center text-[#00252b] mb-8">
            {t('title')}
          </h1>

          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            {/* Section 1: Site Publisher */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section1.title')}
              </h2>
              <p>
                <strong>{t('section1.companyName')}</strong>
                <br />
                {t('section1.legalForm')}
                <br />
                {t('section1.capital')}
                <br />
                {t('section1.registeredAddress')}
                <br />
                {t('section1.registration')}
                <br />
                {t('section1.vatNumber')}
                <br />
                {t('section1.director')}
                <br />
                {t('section1.email')}
                <br />
                {t('section1.phone')}
              </p>
            </section>

            {/* Section 2: Hosting Provider */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section2.title')}
              </h2>
              <p>{t('section2.content')}</p>
            </section>

            {/* Section 3: Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section3.title')}
              </h2>
              <p>{t('section3.content')}</p>
            </section>

            {/* Section 4: Personal Data */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section4.title')}
              </h2>
              <p>{t('section4.content')}</p>
            </section>

            {/* Section 5: Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section5.title')}
              </h2>
              <p>{t('section5.content')}</p>
            </section>

            {/* Section 6: Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section6.title')}
              </h2>
              <p>{t('section6.content')}</p>
            </section>

            {/* Section 7: Hyperlinks */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section7.title')}
              </h2>
              <p>{t('section7.content')}</p>
            </section>

            {/* Section 8: Applicable Law */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section8.title')}
              </h2>
              <p>{t('section8.content')}</p>
            </section>
          </div>
        </div>
      </main>

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
            {" • "}
            <Link href={`/${locale}/legal-notice`} className="hover:text-white">
              {t('footer.legalNotice')}
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}
