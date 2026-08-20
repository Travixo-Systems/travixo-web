import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import Navigation from "../../components/navigation";
import Footer from "../../components/Footer";
import FaqSection from "../../components/FaqSection";
import JsonLd from "../../components/JsonLd";
import { BASE_URL, pathFor, ogImageFor, type Locale } from "@/lib/seo";
import { FICHES, getFiche, ARRETE_2004_ART_15, ART_15_QUOTE, CODE_TRAVAIL_R4323_24 } from "@/content/vgp/fiches";
import type { Fiche, Source } from "@/content/vgp/types";

type Props = { params: Promise<{ locale: string; engin: string }> };

export function generateStaticParams() {
  return FICHES.map((fiche) => ({ locale: "fr", engin: fiche.slug }));
}

function ficheUrl(slug: string) {
  return `${BASE_URL}${pathFor("fr", "vgpHub")}/${slug}`;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, engin } = await props.params;
  const fiche = locale === "fr" ? getFiche(engin) : undefined;
  if (!fiche) return {};

  const url = ficheUrl(fiche.slug);
  const image = ogImageFor("fr");

  return {
    title: { absolute: fiche.title },
    description: fiche.description,
    openGraph: {
      type: "article",
      locale: "fr",
      url,
      title: fiche.title,
      description: fiche.description,
      siteName: "TraviXO",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fiche.title,
      description: fiche.description,
      images: [image.url],
    },
    alternates: {
      canonical: url,
      languages: { fr: url, "x-default": url },
    },
  };
}

export default async function FichePage(props: Props) {
  const { locale, engin } = await props.params;
  const fiche = locale === "fr" ? getFiche(engin) : undefined;
  if (!fiche) notFound();
  setRequestLocale(locale);

  return (
    <>
      <Navigation />
      <JsonLd id="fiche-breadcrumb" data={breadcrumb(fiche)} />

      <main className="min-h-screen bg-white">
        <section className="bg-[#0a2730] py-14">
          <div className="container mx-auto px-4 max-w-3xl">
            <Link
              href={pathFor("fr", "vgpHub")}
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              Périodicité des VGP
            </Link>
            <h1 className="text-4xl font-bold text-white mt-3 mb-4">
              {fiche.h1}
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              {fiche.intro}
            </p>
          </div>
        </section>

        {/* The answer, stated once and immediately. */}
        <section className="py-10 bg-[#f6f8fd]">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-white border-l-[3px] border-[#e8600a] rounded-lg p-6 shadow-sm">
              <div className="text-sm uppercase tracking-wide text-gray-500 mb-1">
                Périodicité
              </div>
              {/* div, not p: globals.css sets an unlayered `p { font-size }`
                  that overrides Tailwind's layered text-* utilities. */}
              <div className="text-4xl font-bold text-[#0a2730] mb-4">
                Tous les {fiche.periodicity.months} mois
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                {fiche.periodicity.basis}
              </p>
              <SourceLine source={fiche.periodicity.source} />
            </div>
          </div>
        </section>

        {fiche.notes?.length ? (
          <section className="py-10 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-[#0a2730] mb-4">
                À noter
              </h2>
              {fiche.notes.map((note) => (
                <div key={note.text} className="mb-4">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {note.text}
                  </p>
                  {note.source ? <SourceLine source={note.source} /> : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="py-10 bg-[#f6f8fd]">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-[#0a2730] mb-4">
              Qui peut réaliser la vérification
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Les vérifications générales périodiques sont réalisées par des
              personnes qualifiées, appartenant ou non à l&apos;établissement,
              dont la liste est tenue à disposition de l&apos;inspection du
              travail. Le recours à un organisme accrédité n&apos;est pas
              imposé par le texte.
            </p>
            <SourceLine source={CODE_TRAVAIL_R4323_24} />
          </div>
        </section>

        <section className="py-10 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-[#0a2730] mb-4">
              En location : ce qui doit accompagner la machine
            </h2>
            <blockquote className="border-l-[3px] border-[#e8600a] pl-6 my-6">
              <p className="text-lg text-gray-800 italic leading-relaxed">
                {ART_15_QUOTE}
              </p>
            </blockquote>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Quatre pièces, sur l&apos;appareil ou à proximité : la notice
              d&apos;instructions, le rapport de première mise en service, le
              dernier rapport de vérification périodique et l&apos;historique
              des vérifications.
            </p>
            <SourceLine source={ARRETE_2004_ART_15} />
          </div>
        </section>

        <FaqSection
          title="Questions fréquentes"
          items={fiche.faq}
          id={`fiche-${fiche.slug}-faq`}
        />

        <section className="py-12 bg-[#0a2730]">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Suivre cette échéance sur tout le parc
            </h2>
            <p className="text-white/80 mb-8">
              Les échéances, les rapports et l&apos;historique reliés à chaque
              machine, consultables par QR code.
            </p>
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

function SourceLine({ source }: { source: Source }) {
  return (
    <p className="text-sm text-gray-600">
      Source :{" "}
      <a
        href={source.url}
        className="text-[#e8600a] hover:underline"
        rel="nofollow noopener"
        target="_blank"
      >
        {source.label}
      </a>
      , consulté le{" "}
      {new Date(source.consultedOn).toLocaleDateString("fr-FR")}
    </p>
  );
}

function breadcrumb(fiche: Fiche) {
  return {
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
      {
        "@type": "ListItem",
        position: 3,
        name: fiche.name,
        item: ficheUrl(fiche.slug),
      },
    ],
  };
}
