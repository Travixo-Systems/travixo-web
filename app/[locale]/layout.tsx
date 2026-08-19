import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getTranslations, setRequestLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Script from "next/script";
import { ReactNode } from "react";
import StructuredData from "./components/StructuredData";
import { BASE_URL, LOCALES, isLocale, ogImageFor, type Locale } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });

  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL(BASE_URL),
    // Fallback only. Pages set an absolute title through buildPageMetadata,
    // because the copy in messages/*.json already carries the brand. The old
    // template appended the full 54 character homepage title to every page.
    title: {
      default: title,
      template: "%s | TraviXO",
    },
    description: description,
    keywords: ['TraviXO', 'VGP', 'suivi équipement', 'equipment tracking', 'QR tracking', 'fleet management', 'conformité VGP', 'DREETS', 'location matériel', 'equipment rental'],
    authors: [{ name: 'TraviXO' }],
    creator: 'TraviXO',
    publisher: 'TraviXO',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/icon.png',
      shortcut: '/favicon333ild.ico',
      apple: '/icon.png',
    },
    // Fallback card. Pages set their own through buildPageMetadata. Both point
    // at the generated route rather than the /og-image.png that never existed.
    openGraph: {
      type: 'website',
      locale: locale,
      alternateLocale: LOCALES.filter((l) => l !== locale),
      title: title,
      description: description,
      siteName: 'TraviXO',
      images: [ogImageFor(locale as Locale)],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [ogImageFor(locale as Locale).url],
      creator: '@TraviXO',
    },
    // Deliberately no `alternates` here. Next merges parent metadata into any
    // child that omits a key, so a canonical set at this level was inherited by
    // every page that did not set its own, pointing them all at the locale
    // root. Each page now sets its own through buildPageMetadata.
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  // Structured Data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Deralis Digital",
    "alternateName": "TraviXO",
    "url": "https://travixosystems.com",
    "logo": "https://travixosystems.com/icon.png",
    "description": "QR-based equipment tracking and VGP compliance automation for French equipment rental companies",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "FR",
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+33-78-335-75-35",
      "email": "contact@travixosystems.com",
      "contactType": "customer service",
      "areaServed": ["FR", "US", "GB"],
      "availableLanguage": ["English", "French"]
    },
    "sameAs": [
      // Add social media profiles here when available
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TraviXO",
    "url": `https://travixosystems.com/${locale}`,
    "description": "QR-based equipment tracking and VGP compliance automation for rental companies",
    "inLanguage": locale,
    "publisher": {
      "@type": "Organization",
      "name": "Deralis Digital"
    }
  };

  return (
    <html lang={locale}>
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N679J3PH');
          `}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N679J3PH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager */}

        {/* Structured Data */}
        <StructuredData data={organizationSchema} />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
