/**
 * Server-rendered JSON-LD.
 *
 * Replaces StructuredData.tsx, which was a client component wrapping
 * next/script with a hardcoded id="structured-data". next/script dedupes by
 * id, so a second block on the same page was silently dropped, which blocked
 * per-page FAQPage and SoftwareApplication schema entirely.
 *
 * Plain script tag, no client boundary: the markup is in the server-rendered
 * HTML rather than injected after hydration.
 */
export default function JsonLd({ id, data }: { id: string; data: object }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // Content is built server side from typed objects, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
