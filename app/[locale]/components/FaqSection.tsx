import JsonLd from "./JsonLd";

export type FaqItem = { question: string; answer: string };

/**
 * Renders a FAQ and emits the matching FAQPage markup from the same array, so
 * the visible answers and the structured data cannot drift apart.
 *
 * The pricing page already had a real five question FAQ rendered through
 * t.raw('faq.questions') with no markup at all, which left rich result
 * eligibility on the table.
 */
export default function FaqSection({
  title,
  items,
  id = "faq",
}: {
  title: string;
  items: FaqItem[];
  id?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="py-10 bg-white">
      <JsonLd id={`${id}-schema`} data={schema} />
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
          {title}
        </h2>
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {item.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
