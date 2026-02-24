import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getTranslations, setRequestLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Script from "next/script";
import { ReactNode } from "react";
import StructuredData from "./components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const locales = ["en", "fr"];

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });

  const baseUrl = 'https://travixosystems.com';
  const currentUrl = `${baseUrl}/${locale}`;
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description: description,
    keywords: ['TraviXO', 'VGP', 'Vehicle Guard Pro', 'fleet management', 'GPS tracking', 'vehicle tracking', 'telematics'],
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
    openGraph: {
      type: 'website',
      locale: locale,
      alternateLocale: locale === 'en' ? ['fr'] : ['en'],
      url: currentUrl,
      title: title,
      description: description,
      siteName: 'TraviXO',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [`${baseUrl}/og-image.png`],
      creator: '@TraviXO',
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        'en': `${baseUrl}/en`,
        'fr': `${baseUrl}/fr`,
      },
    },
    verification: {
      google: 'your-google-verification-code',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
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
    "description": "Advanced GPS fleet management and vehicle tracking solutions with TraviXO Vehicle Guard Pro (VGP)",
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
    "description": "Advanced GPS fleet management and vehicle tracking solutions",
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
