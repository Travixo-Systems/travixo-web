import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import Navigation from "../components/navigation";
import Footer from "../components/Footer";
import FaqSection from "../components/FaqSection";
import JsonLd from "../components/JsonLd";
import {
  BASE_URL,
  LOCALES,
  buildPageMetadata,
  hasRoute,
  isLocale,
  pathFor,
  routeKeyForSlug,
  urlFor,
  type Locale,
} from "@/lib/seo";
import { getLandingPage, landingRouteKeys } from "@/content/landing";
import type { LandingPage, Section } from "@/content/landing/types";

/**
 * Keyword landing pages, one dynamic segment serving every locale.
 *
 * Slugs differ per locale by design (/fr/logiciel-vgp pairs with an English
 * slug once that copy exists), which physical directories cannot express. A
 * dynamic segment can: static route segments take precedence over dynamic ones
 * in the App Router, so the eight existing physical routes are unaffected, and
 * middleware, i18n and every hardcoded Link stay untouched.
 */

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    landingRouteKeys(locale).map((routeKey) => ({
      locale,
      // pathFor returns /{locale}/{slug}; the segment is the last part.
      slug: pathFor(locale, routeKey).split("/").pop() as string,
    })),
  );
}

function resolve(locale: string, slug: string) {
  if (!isLocale(locale)) return undefined;
  const routeKey = routeKeyForSlug(locale, slug);
  if (!routeKey) return undefined;
  const page = getLandingPage(locale, routeKey);
  if (!page) return undefined;
  return { locale, routeKey, page } as const;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const resolved = resolve(locale, slug);
  if (!resolved) return {};

  return buildPageMetadata({
    locale: resolved.locale,
    routeKey: resolved.routeKey,
    title: resolved.page.title,
    description: resolved.page.description,
  });
}

export default async function LandingRoute(props: Props) {
  const { locale, slug } = await props.params;
  const resolved = resolve(locale, slug);

  // Unknown slug under [locale]: hand back to the 404 rather than render an
  // empty shell. The physical routes never reach here.
  if (!resolved) notFound();

  const { page } = resolved;
  setRequestLocale(resolved.locale);

  return (
    <>
      <Navigation />
      <JsonLd id="breadcrumb-schema" data={breadcrumbSchema(page)} />

      <main className="min-h-screen bg-white">
        <section className="bg-[#0a2730] py-16">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {page.h1}
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              {page.subtitle}
            </p>
          </div>
        </section>

        {page.sections.map((section, i) => (
          <SectionBlock
            key={section.heading}
            section={section}
            locale={page.locale}
            // Alternate the background so consecutive sections stay separable.
            tinted={i % 2 === 0}
          />
        ))}

        <FaqSection
          title={page.faqTitle}
          items={page.faq}
          id={`${slug}-faq`}
        />

        <section className="py-10 bg-[#f6f8fd]">
          <div className="container mx-auto px-4 max-w-4xl">
            <ul className="space-y-2 text-gray-700">
              {page.related
                .filter((link) => hasRoute(page.locale, link.routeKey))
                .map((link) => (
                <li key={link.routeKey}>
                  {link.label}{" "}
                  <Link
                    href={pathFor(page.locale, link.routeKey)}
                    className="text-[#e8600a] hover:underline font-medium"
                  >
                    {page.readMoreLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-12 bg-[#0a2730]">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              {page.cta.heading}
            </h2>
            <Link
              href={pathFor(page.locale, "contact")}
              className="inline-block bg-[#e8600a] hover:bg-[#d05508] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              {page.cta.label}
            </Link>
          </div>
        </section>
      </main>

      <Footer locale={page.locale} />
    </>
  );
}

function SectionBlock({
  section,
  locale,
  tinted,
}: {
  section: Section;
  locale: Locale;
  tinted: boolean;
}) {
  const bg = tinted ? "bg-[#f6f8fd]" : "bg-white";

  return (
    <section className={`py-12 ${bg}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-[#0a2730] mb-4">
          {section.heading}
        </h2>

        {"lead" in section && section.lead ? (
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            {section.lead}
          </p>
        ) : null}

        {section.kind === "prose" &&
          section.paragraphs.map((p) => (
            <p key={p} className="text-lg text-gray-700 leading-relaxed mb-4">
              {p}
            </p>
          ))}

        {section.kind === "bullets" && (
          <ul className="space-y-4">
            {section.items.map((item) => (
              <li
                key={item.title}
                className="border-l-[3px] border-[#e8600a] pl-6"
              >
                <span className="font-bold text-[#0a2730]">{item.title}</span>{" "}
                <span className="text-gray-700">{item.body}</span>
              </li>
            ))}
          </ul>
        )}

        {section.kind === "blocks" && (
          <div className="grid md:grid-cols-2 gap-6">
            {section.items.map((item) => (
              <div
                key={item.title}
                className="p-6 border border-gray-200 rounded-lg bg-white"
              >
                <h3 className="text-xl font-bold text-[#0a2730] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        )}

        {section.kind === "quote" && (
          <>
            <blockquote className="border-l-[3px] border-[#e8600a] pl-6 my-6">
              <p className="text-lg text-gray-800 italic leading-relaxed">
                {section.quote}
              </p>
              <cite className="block mt-3 text-sm text-gray-600 not-italic">
                {section.citation}
              </cite>
            </blockquote>
            {section.paragraphs.map((p) => (
              <p key={p} className="text-lg text-gray-700 leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </>
        )}

        {section.kind === "screenshot" && (
          <figure className={section.portrait ? "max-w-sm mx-auto" : ""}>
            <Image
              src={section.src}
              alt={section.alt}
              width={section.width}
              height={section.height}
              className="rounded-lg border border-gray-200 shadow-sm w-full h-auto"
              sizes={
                section.portrait
                  ? "(max-width: 640px) 100vw, 384px"
                  : "(max-width: 896px) 100vw, 896px"
              }
            />
            {section.caption ? (
              <figcaption className="mt-3 text-sm text-gray-600 text-center">
                {section.caption}
              </figcaption>
            ) : null}
          </figure>
        )}

        {section.kind === "pricing" && (
          <>
            {section.paragraphs.map((p) => (
              <p key={p} className="text-lg text-gray-700 leading-relaxed mb-4">
                {p}
              </p>
            ))}
            <Link
              href={pathFor(locale, "pricing")}
              className="text-[#e8600a] hover:underline font-medium"
            >
              {section.linkLabel}
            </Link>
          </>
        )}
      </div>
    </section>
  );
}

function breadcrumbSchema(page: LandingPage) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "TraviXO",
        item: `${BASE_URL}/${page.locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.h1,
        item: urlFor(page.locale, page.routeKey),
      },
    ],
  };
}
