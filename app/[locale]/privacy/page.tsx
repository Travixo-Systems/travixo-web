import { getTranslations } from "next-intl/server";
import Navigation from "../components/navigation";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.privacy" });

  const baseUrl = 'https://travixosystems.com';
  const currentUrl = `${baseUrl}/${locale}/privacy`;
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
        'en': `${baseUrl}/en/privacy`,
        'fr': `${baseUrl}/fr/privacy`,
      },
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("privacy");

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        <div className="container border-l-4 border-[#f26f00] mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold text-center text-[#00252b] mb-4">
            {t('title')}
          </h1>
          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            {/* Section 1: Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section1.title')}
              </h2>
              <p className="mb-4">
                {t('section1.paragraph1')}
              </p>
              <p>
                {t('section1.paragraph2')}
              </p>
            </section>

            {/* Section 2: Data Controller */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section2.title')}
              </h2>
              <p className="mb-4">{t('section2.intro')}</p>
              <p>
                <strong>{t('section2.companyName')}</strong>
                <br />
                {t('section2.email')} contact@travixosystems.com
                <br />
                {t('section2.phone')} +33 78 335 75 35
              </p>
            </section>

            {/* Section 3: Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section3.title')}
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('section3.subsection1.title')}
              </h3>
              <p className="mb-2">{t('section3.subsection1.intro')}</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>{t('section3.subsection1.item1')}</li>
                <li>{t('section3.subsection1.item2')}</li>
                <li>{t('section3.subsection1.item3')}</li>
                <li>{t('section3.subsection1.item4')}</li>
                <li>{t('section3.subsection1.item5')}</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                {t('section3.subsection2.title')}
              </h3>
              <p className="mb-2">{t('section3.subsection2.intro')}</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>{t('section3.subsection2.item1')}</li>
                <li>{t('section3.subsection2.item2')}</li>
                <li>{t('section3.subsection2.item3')}</li>
                <li>{t('section3.subsection2.item4')}</li>
                <li>{t('section3.subsection2.item5')}</li>
                <li>{t('section3.subsection2.item6')}</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                {t('section3.subsection3.title')}
              </h3>
              <p>
                {t('section3.subsection3.content')}
              </p>
            </section>

            {/* Section 4: How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section4.title')}
              </h2>
              <p className="mb-2">{t('section4.intro')}</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{t('section4.item1')}</li>
                <li>{t('section4.item2')}</li>
                <li>{t('section4.item3')}</li>
                <li>{t('section4.item4')}</li>
                <li>{t('section4.item5')}</li>
                <li>{t('section4.item6')}</li>
              </ul>
            </section>

            {/* Section 5: Legal Basis for Processing (GDPR) */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section5.title')}
              </h2>
              <p className="mb-2">{t('section5.intro')}</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{t('section5.item1')}</li>
                <li>{t('section5.item2')}</li>
                <li>{t('section5.item3')}</li>
                <li>{t('section5.item4')}</li>
              </ul>
            </section>

            {/* Section 6: Data Sharing and Disclosure */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section6.title')}
              </h2>
              <p className="mb-4">{t('section6.paragraph1')}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('section6.subsection1.title')}
              </h3>
              <p className="mb-4">{t('section6.subsection1.content')}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                {t('section6.subsection2.title')}
              </h3>
              <p className="mb-4">{t('section6.subsection2.content')}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                {t('section6.subsection3.title')}
              </h3>
              <p>{t('section6.subsection3.content')}</p>
            </section>

            {/* Section 7: Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section7.title')}
              </h2>
              <p>{t('section7.content')}</p>
            </section>

            {/* Section 8: Your Rights (GDPR) */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section8.title')}
              </h2>
              <p className="mb-2">{t('section8.intro')}</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>{t('section8.item1')}</li>
                <li>{t('section8.item2')}</li>
                <li>{t('section8.item3')}</li>
                <li>{t('section8.item4')}</li>
                <li>{t('section8.item5')}</li>
                <li>{t('section8.item6')}</li>
                <li>{t('section8.item7')}</li>
                <li>{t('section8.item8')}</li>
              </ul>
              <p className="mt-3">{t('section8.footer')}</p>
              <p className="mt-2 text-sm text-gray-600">{t('section8.dpo')}</p>
            </section>

            {/* Section 9: Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section9.title')}
              </h2>
              <p className="mb-4">{t('section9.paragraph1')}</p>
              <p>{t('section9.paragraph2')}</p>
            </section>

            {/* Section 10: International Data Transfers */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section10.title')}
              </h2>
              <p>{t('section10.content')}</p>
            </section>

            {/* Section 11: Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section11.title')}
              </h2>
              <p>{t('section11.content')}</p>
            </section>

            {/* Section 12: Cookies and Tracking */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section12.title')}
              </h2>
              <p className="mb-4">{t('section12.paragraph1')}</p>
              <p className="mb-2"><strong>{t('section12.types.title')}</strong></p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>{t('section12.types.essential')}</li>
                <li>{t('section12.types.analytics')}</li>
                <li>{t('section12.types.marketing')}</li>
              </ul>
              <p className="mt-3">{t('section12.footer')}</p>
            </section>

            {/* Section 13: Third-Party Links */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section13.title')}
              </h2>
              <p>{t('section13.content')}</p>
            </section>

            {/* Section 13b: Automated Decision-Making */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section13b.title')}
              </h2>
              <p>{t('section13b.content')}</p>
            </section>

            {/* Section 13c: Data Protection Officer */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section13c.title')}
              </h2>
              <p>{t('section13c.content')}</p>
            </section>

            {/* Section 14: Changes to This Privacy Policy */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section14.title')}
              </h2>
              <p className="mb-4">{t('section14.paragraph1')}</p>
              <p>{t('section14.paragraph2')}</p>
            </section>

            {/* Section 15: Contact Us */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section15.title')}
              </h2>
              <p className="mb-4">{t('section15.intro')}</p>
              <p>
                <strong>{t('section15.companyName')}</strong>
                <br />
                {t('section15.email')} {t('section15.emailValue')}
                <br />
                {t('section15.phone')} +33 78 335 75 35
              </p>
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