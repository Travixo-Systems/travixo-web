import { getTranslations } from "next-intl/server";
import Navigation from "../components/navigation";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.terms" });

  const baseUrl = 'https://travixo.com';
  const currentUrl = `${baseUrl}/${locale}/terms`;
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
        'en': `${baseUrl}/en/terms`,
        'fr': `${baseUrl}/fr/terms`,
      },
    },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("terms");

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        <div className="container border-l-4 border-[#f26f00] mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold text-center text-[#00252b] mb-4">
            {t('title')}
          </h1>
          <p className="text-gray-600 mb-8">
            <strong>{t('effective')}</strong> {t('effectiveDate')}
            <br />
            <strong>{t('lastUpdated')}</strong> {t('lastUpdatedDate')}
          </p>

          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            {/* Section 1: Agreement to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section1.title')}
              </h2>
              <p className="mb-4">{t('section1.paragraph1')}</p>
              <p>{t('section1.paragraph2')}</p>
            </section>

            {/* Section 2: Description of Services */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section2.title')}
              </h2>
              <p className="mb-2">{t('section2.intro')}</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>{t('section2.item1')}</li>
                <li>{t('section2.item2')}</li>
                <li>{t('section2.item3')}</li>
                <li>{t('section2.item4')}</li>
                <li>{t('section2.item5')}</li>
              </ul>
              <p className="mt-3">{t('section2.footer')}</p>
            </section>

            {/* Section 3: User Accounts and Registration */}
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
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                {t('section3.subsection2.title')}
              </h3>
              <p>{t('section3.subsection2.content')}</p>
            </section>

            {/* Section 4: Subscription Plans and Billing */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section4.title')}
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('section4.subsection1.title')}
              </h3>
              <p className="mb-2">{t('section4.subsection1.paragraph1')}</p>
              <p className="mb-4">{t('section4.subsection1.paragraph2')}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                {t('section4.subsection2.title')}
              </h3>
              <p className="mb-4">{t('section4.subsection2.content')}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                {t('section4.subsection3.title')}
              </h3>
              <p className="mb-4">{t('section4.subsection3.content')}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                {t('section4.subsection4.title')}
              </h3>
              <p>{t('section4.subsection4.content')}</p>
            </section>

            {/* Section 5: Cancellation and Termination */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section5.title')}
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('section5.subsection1.title')}
              </h3>
              <p className="mb-4">{t('section5.subsection1.content')}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                {t('section5.subsection2.title')}
              </h3>
              <p className="mb-2">{t('section5.subsection2.intro')}</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>{t('section5.subsection2.item1')}</li>
                <li>{t('section5.subsection2.item2')}</li>
                <li>{t('section5.subsection2.item3')}</li>
                <li>{t('section5.subsection2.item4')}</li>
              </ul>
              <p className="mt-3 mb-4">{t('section5.subsection2.footer')}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                {t('section5.subsection3.title')}
              </h3>
              <p>{t('section5.subsection3.content')}</p>
            </section>

            {/* Section 6: Acceptable Use Policy */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section6.title')}
              </h2>
              <p className="mb-2">{t('section6.intro')}</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{t('section6.item1')}</li>
                <li>{t('section6.item2')}</li>
                <li>{t('section6.item3')}</li>
                <li>{t('section6.item4')}</li>
                <li>{t('section6.item5')}</li>
                <li>{t('section6.item6')}</li>
                <li>{t('section6.item7')}</li>
                <li>{t('section6.item8')}</li>
              </ul>
            </section>

            {/* Section 7: Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section7.title')}
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('section7.subsection1.title')}
              </h3>
              <p className="mb-4">{t('section7.subsection1.content')}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                {t('section7.subsection2.title')}
              </h3>
              <p className="mb-2">{t('section7.subsection2.paragraph1')}</p>
              <p className="mb-4">{t('section7.subsection2.paragraph2')}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                {t('section7.subsection3.title')}
              </h3>
              <p>{t('section7.subsection3.content')}</p>
            </section>

            {/* Section 8: Data Protection and Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section8.title')}
              </h2>
              <p className="mb-2">{t('section8.paragraph1')}</p>
              <p>{t('section8.paragraph2')}</p>
            </section>

            {/* Section 9: Service Level and Availability */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section9.title')}
              </h2>
              <p className="mb-2">{t('section9.paragraph1')}</p>
              <p>
                <strong>{t('section9.sla.title')}</strong> {t('section9.sla.content')}
              </p>
            </section>

            {/* Section 10: Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section10.title')}
              </h2>
              <p className="mb-2">
                <strong>{t('section10.intro')}</strong>
              </p>
              <p className="mb-2">{t('section10.paragraph1')}</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>{t('section10.item1')}</li>
                <li>{t('section10.item2')}</li>
                <li>{t('section10.item3')}</li>
                <li>{t('section10.item4')}</li>
              </ul>
              <p className="mt-3 mb-2">{t('section10.paragraph2')}</p>
              <p className="mt-3">{t('section10.paragraph3')}</p>
            </section>

            {/* Section 11: Indemnification */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section11.title')}
              </h2>
              <p className="mb-2">{t('section11.intro')}</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{t('section11.item1')}</li>
                <li>{t('section11.item2')}</li>
                <li>{t('section11.item3')}</li>
                <li>{t('section11.item4')}</li>
              </ul>
            </section>

            {/* Section 12: Dispute Resolution */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section12.title')}
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('section12.subsection1.title')}
              </h3>
              <p className="mb-4">{t('section12.subsection1.content')}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                {t('section12.subsection2.title')}
              </h3>
              <p className="mb-4">{t('section12.subsection2.content')}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                {t('section12.subsection3.title')}
              </h3>
              <p>{t('section12.subsection3.content')}</p>
            </section>

            {/* Section 13: Changes to These Terms */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section13.title')}
              </h2>
              <p className="mb-2">{t('section13.intro')}</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>{t('section13.method1')}</li>
                <li>{t('section13.method2')}</li>
              </ul>
              <p className="mt-3">{t('section13.footer')}</p>
            </section>

            {/* Section 14: General Provisions */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section14.title')}
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('section14.subsection1.title')}
              </h3>
              <p className="mb-4">{t('section14.subsection1.content')}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                {t('section14.subsection2.title')}
              </h3>
              <p className="mb-4">{t('section14.subsection2.content')}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                {t('section14.subsection3.title')}
              </h3>
              <p className="mb-4">{t('section14.subsection3.content')}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                {t('section14.subsection4.title')}
              </h3>
              <p className="mb-4">{t('section14.subsection4.content')}</p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                {t('section14.subsection5.title')}
              </h3>
              <p>{t('section14.subsection5.content')}</p>
            </section>

            {/* Section 15: Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section15.title')}
              </h2>
              <p className="mb-4">{t('section15.intro')}</p>
              <p>
                <strong>{t('section15.companyName')}</strong>
                <br />
                {t('section15.email')} contact@travixosystems.com
                <br />
                {t('section15.phone')} +33 78 335 75 35
                <br />
                {t('section15.address')} {t('section15.addressValue')}
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
          </p>
        </div>
      </footer>
    </>
  );
}