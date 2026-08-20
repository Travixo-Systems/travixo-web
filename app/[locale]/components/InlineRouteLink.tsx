import Link from "next/link";
import { hasRoute, pathFor, type Locale, type RouteKey } from "@/lib/seo";

/**
 * An in-content link into the landing page cluster.
 *
 * In-body links carry more weight than footer links, both for crawling and
 * for the topical signal the anchor text sends, so each landing page gets one
 * from the section already discussing its subject.
 *
 * Renders nothing where the target route does not exist, which today means it
 * disappears in English. That is why the surrounding copy is French at the
 * call site rather than a message key: an English string here would never be
 * shown, and adding one only to satisfy FR/EN key parity would be dead weight.
 *
 * `anchor` should read naturally and carry the target page's keyword. Avoid
 * "cliquez ici", which tells a crawler nothing about the destination.
 */
export default function InlineRouteLink({
  locale,
  routeKey,
  lead,
  anchor,
}: {
  locale: Locale;
  routeKey: RouteKey;
  /** Sentence introducing the link, ending without punctuation. */
  lead: string;
  /** The linked words themselves. */
  anchor: string;
}) {
  if (!hasRoute(locale, routeKey)) return null;

  return (
    <p className="mt-6 text-base">
      <span className="text-gray-600">{lead} : </span>
      <Link
        href={pathFor(locale, routeKey)}
        className="text-[#e8600a] hover:underline font-medium"
      >
        {anchor}
      </Link>
    </p>
  );
}
