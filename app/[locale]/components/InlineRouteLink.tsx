import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { hasRoute, pathFor, type Locale, type RouteKey } from "@/lib/seo";

/**
 * An in-content link into the landing page cluster.
 *
 * In-body links carry more weight than footer links, both for crawling and
 * for the topical signal the anchor text sends, so each landing page gets one
 * from the section already discussing its subject.
 *
 * Copy comes from the `inlineLinks` namespace keyed by `routeKey`, never from
 * the call site. It used to be passed in as literal props, on the reasoning
 * that every target route was French-only and so the component would return
 * null in English anyway. That reasoning expired: softwareFleet and
 * softwareRental later gained English slugs, which flipped `hasRoute` to true
 * in English and started rendering French sentences mid-page on /en. Reading
 * the copy from messages makes that failure structurally impossible rather
 * than something a reviewer has to notice.
 *
 * Renders nothing where the target route does not exist in this locale, which
 * today means softwareVgp disappears in English: "VGP" is a French regulatory
 * term with no English search volume.
 *
 * Anchors should read naturally and carry the target page's keyword. Avoid
 * "click here", which tells a crawler nothing about the destination.
 */
export default async function InlineRouteLink({
  locale,
  routeKey,
}: {
  locale: Locale;
  routeKey: RouteKey;
}) {
  if (!hasRoute(locale, routeKey)) return null;

  const t = await getTranslations({ locale, namespace: "inlineLinks" });

  return (
    <p className="mt-6 text-base">
      <span className="text-gray-600">{t(`${routeKey}.lead`)} : </span>
      <Link
        href={pathFor(locale, routeKey)}
        className="text-brand hover:underline font-medium"
      >
        {t(`${routeKey}.anchor`)}
      </Link>
    </p>
  );
}
