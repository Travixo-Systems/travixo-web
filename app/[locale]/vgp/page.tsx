import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import Navigation from "../components/navigation";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import { BASE_URL, buildPageMetadata, pathFor, type Locale } from "@/lib/seo";
import { FICHES } from "@/content/vgp/fiches";

type Props = { params: Promise<{ locale: string }> };

// FR only, like the landing pages. A physical `vgp` segment also takes
// precedence over [slug], which keeps the fiche tree out of that resolver.
function guard(locale: string) {
  return locale === "fr";
}

// Narrow the locales inherited from the layout, so /en/vgp is never
// prerendered as a 404 shell.
export function generateStaticParams() {
  return [{ locale: "fr" }];
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  if (!guard(locale)) return {};
  return buildPageMetadata({
    locale: "fr",
    routeKey: "vgpHub",
    title: "Périodicité des VGP par type d'engin | TraviXO",
    description:
      "Périodicité de la vérification générale périodique par type d'appareil de levage, avec le fondement réglementaire de chaque cas.",
  });
}

export default async function VgpHubPage(props: Props) {
  const { locale } = await props.params;
  if (!guard(locale)) notFound();
  setRequestLocale(locale);

  const bySix = FICHES.filter((f) => f.periodicity.months === 6);
  const byTwelve = FICHES.filter((f) => f.periodicity.months === 12);

  return (
    <>
      <Navigation />
      <JsonLd
        id="vgp-hub-breadcrumb"
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "TraviXO",
              item: `${BASE_URL}/fr`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Périodicité des VGP",
              item: `${BASE_URL}${pathFor("fr", "vgpHub")}`,
            },
          ],
        }}
      />

      <main className="min-h-screen bg-white">
        <section className="bg-[#0a2730] py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Périodicité des VGP par type d&apos;engin
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              La règle générale est de douze mois. Elle descend à six mois pour
              les appareils énumérés au II de l&apos;article 20 de
              l&apos;arrêté du 1er mars 2004, et à trois mois pour les appareils
              mus par la force humaine déplaçant un poste de travail en
              élévation.
            </p>
          </div>
        </section>

        <section className="py-12 bg-[#f6f8fd]">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-[#0a2730] mb-6">
              Périodicité de six mois
            </h2>
            <FicheList fiches={bySix} />

            <h2 className="text-3xl font-bold text-[#0a2730] mt-12 mb-6">
              Périodicité de douze mois
            </h2>
            <FicheList fiches={byTwelve} />
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-[#0a2730] mb-4">
              Portée de ces fiches
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Ces fiches couvrent les appareils de levage relevant de
              l&apos;arrêté du 1er mars 2004, pour lesquels la périodicité a été
              vérifiée sur le texte. Les équipements relevant d&apos;autres
              régimes de vérification, comme les compresseurs au titre des
              équipements sous pression ou les groupes électrogènes au titre des
              installations électriques, ne sont pas traités ici.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Chaque fiche indique le texte sur lequel elle se fonde. Elle ne
              remplace pas la lecture du texte lui-même ni l&apos;avis de la
              personne qualifiée qui réalise la vérification.
            </p>
          </div>
        </section>

        <section className="py-12 bg-[#0a2730]">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Suivre ces échéances sans tableur
            </h2>
            <Link
              href={pathFor("fr", "softwareVgp")}
              className="inline-block bg-[#e8600a] hover:bg-[#d05508] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              Voir le logiciel de suivi VGP
            </Link>
          </div>
        </section>
      </main>

      <Footer locale={locale as Locale} />
    </>
  );
}

function FicheList({ fiches }: { fiches: typeof FICHES }) {
  return (
    <ul className="grid md:grid-cols-2 gap-4">
      {fiches.map((fiche) => (
        <li key={fiche.slug}>
          <Link
            href={`${pathFor("fr", "vgpHub")}/${fiche.slug}`}
            className="block p-5 bg-white border border-gray-200 rounded-lg hover:border-[#e8600a] transition-colors"
          >
            <span className="block font-bold text-[#0a2730] mb-1">
              {fiche.name}
            </span>
            <span className="text-sm text-gray-600">
              Tous les {fiche.periodicity.months} mois
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
