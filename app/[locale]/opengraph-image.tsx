import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { LOCALES } from "@/lib/seo";

/**
 * Replaces the /og-image.png that metadata referenced but that never existed
 * in public/, so every share card and link preview 404'd.
 *
 * File convention: Next wires this into openGraph.images and twitter.images
 * for every route under [locale], which is why neither the layout nor
 * buildPageMetadata sets an images key. An explicit value there would win over
 * this file.
 */

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "TraviXO";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });

  // Brand palette as used by the post-rehaul pages.
  const navy = "#0a2730";
  const orange = "#e8600a";

  // Titles in messages/*.json are brand prefixed ("TraviXO - Votre materiel
  // ..."). The wordmark sits above the headline on the card, so drop the
  // prefix rather than showing it twice.
  const headline = t("title").replace(/^TraviXO\s*[-:]\s*/, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: navy,
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "20px",
              height: "64px",
              backgroundColor: orange,
              borderRadius: "3px",
            }}
          />
          <div
            style={{
              fontSize: 46,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            TraviXO
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 62,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            maxWidth: "960px",
          }}
        >
          {headline}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          travixosystems.com
        </div>
      </div>
    ),
    size,
  );
}
