import { getTranslations } from "next-intl/server";
import Navigation from "../components/navigation";
import Link from "next/link";

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
          <p className="text-gray-600 mb-8">
            <strong>{t('effective')}</strong> {t('effectiveDate')}
            <br />
            <strong>{t('lastUpdated')}</strong> {t('lastUpdatedDate')}
          </p>

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
                {t('section2.address')}
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
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>
                  <strong>{t('section4.item1.title')}</strong> {t('section4.item1.description')}
                </li>
                <li>
                  <strong>{t('section4.item2.title')}</strong> {t('section4.item2.description')}
                </li>
                <li>
                  <strong>{t('section4.item3.title')}</strong> {t('section4.item3.description')}
                </li>
                <li>
                  <strong>{t('section4.item4.title')}</strong> {t('section4.item4.description')}
                </li>
                <li>
                  <strong>{t('section4.item5.title')}</strong> {t('section4.item5.description')}
                </li>
              </ul>
              <p className="mt-3 mb-2">
                <strong>{t('section4.legalBasis.title')}</strong> {t('section4.legalBasis.intro')}
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>{t('section4.legalBasis.item1')}</li>
                <li>{t('section4.legalBasis.item2')}</li>
                <li>{t('section4.legalBasis.item3')}</li>
                <li>{t('section4.legalBasis.item4')}</li>
              </ul>
            </section>

            {/* Section 5: Data Sharing and Disclosure */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section5.title')}
              </h2>
              <p className="mb-2">
                {t('section5.intro')}
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>
                  <strong>{t('section5.item1.title')}</strong> {t('section5.item1.description')}
                </li>
                <li>
                  <strong>{t('section5.item2.title')}</strong> {t('section5.item2.description')}
                </li>
                <li>
                  <strong>{t('section5.item3.title')}</strong> {t('section5.item3.description')}
                </li>
              </ul>
              <p className="mt-3">
                {t('section5.footer')}
              </p>
            </section>

            {/* Section 6: Data Storage and Security */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section6.title')}
              </h2>
              <p className="mb-2">
                <strong>{t('section6.storage.title')}</strong> {t('section6.storage.description')}
              </p>
              <p className="mb-2">
                <strong>{t('section6.security.title')}</strong> {t('section6.security.intro')}
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>{t('section6.security.item1')}</li>
                <li>{t('section6.security.item2')}</li>
                <li>{t('section6.security.item3')}</li>
                <li>{t('section6.security.item4')}</li>
                <li>{t('section6.security.item5')}</li>
              </ul>
              <p className="mt-3">
                {t('section6.disclaimer')}
              </p>
            </section>

            {/* Section 7: Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section7.title')}
              </h2>
              <p className="mb-2">
                {t('section7.intro')}
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>
                  <strong>{t('section7.item1.title')}</strong> {t('section7.item1.duration')}
                </li>
                <li>
                  <strong>{t('section7.item2.title')}</strong> {t('section7.item2.duration')}
                </li>
                <li>
                  <strong>{t('section7.item3.title')}</strong> {t('section7.item3.duration')}
                </li>
                <li>
                  <strong>{t('section7.item4.title')}</strong> {t('section7.item4.duration')}
                </li>
              </ul>
              <p className="mt-3">
                {t('section7.footer')}
              </p>
            </section>

            {/* Section 8: Your Rights Under GDPR */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section8.title')}
              </h2>
              <p className="mb-2">{t('section8.intro')}</p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>
                  <strong>{t('section8.right1.title')}</strong> {t('section8.right1.description')}
                </li>
                <li>
                  <strong>{t('section8.right2.title')}</strong> {t('section8.right2.description')}
                </li>
                <li>
                  <strong>{t('section8.right3.title')}</strong> {t('section8.right3.description')}
                </li>
                <li>
                  <strong>{t('section8.right4.title')}</strong> {t('section8.right4.description')}
                </li>
                <li>
                  <strong>{t('section8.right5.title')}</strong> {t('section8.right5.description')}
                </li>
                <li>
                  <strong>{t('section8.right6.title')}</strong> {t('section8.right6.description')}
                </li>
                <li>
                  <strong>{t('section8.right7.title')}</strong> {t('section8.right7.description')}
                </li>
              </ul>
              <p className="mt-3 mb-2">
                {t('section8.contact.intro')} <strong>contact@travixosystems.com</strong>
              </p>
              <p>
                {t('section8.contact.response')}
              </p>
            </section>

            {/* Section 9: Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section9.title')}
              </h2>
              <p>
                {t('section9.content')}
              </p>
            </section>

            {/* Section 10: International Data Transfers */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section10.title')}
              </h2>
              <p>
                {t('section10.content')}
              </p>
            </section>

            {/* Section 11: Changes to This Policy */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section11.title')}
              </h2>
              <p className="mb-2">
                {t('section11.intro')}
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>{t('section11.method1')}</li>
                <li>{t('section11.method2')}</li>
              </ul>
              <p className="mt-3">
                {t('section11.footer')}
              </p>
            </section>

            {/* Section 12: Contact Us */}
            <section>
              <h2 className="text-2xl font-bold text-[#00252b] mb-3">
                {t('section12.title')}
              </h2>
              <p className="mb-4">
                {t('section12.intro')}
              </p>
              <p>
                <strong>{t('section12.email')}</strong> contact@travixosystems.com
                <br />
                <strong>{t('section12.phone')}</strong> +33 78 335 75 35
                <br />
                <strong>{t('section12.address')}</strong> {t('section12.addressValue')}
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