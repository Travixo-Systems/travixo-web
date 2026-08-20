import { buildPageMetadata, type Locale } from "@/lib/seo";
import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import Footer from "../components/Footer";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  return buildPageMetadata({ locale: locale as Locale, routeKey: "contact" });
}

export default async function ContactPage(props: Props) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  
  // Footer lives here rather than inside ContactForm: ContactForm is a client
  // component and Footer is a server component that reads translations.
  return (
    <>
      <ContactForm />
      <Footer locale={locale as Locale} />
    </>
  );
}
