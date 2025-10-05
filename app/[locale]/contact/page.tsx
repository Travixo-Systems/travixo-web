import ContactForm from "./ContactForm";
import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(props: Props) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata.contact" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage(props: Props) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  
  return <ContactForm locale={locale} />;
}