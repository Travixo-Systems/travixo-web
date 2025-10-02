import Navigation from "../components/navigation";
import Link from "next/link";

export const metadata = {
  title: "Pricing - TraviXO",
  description:
    "Simple transparent pricing for equipment tracking. Plans from €250/month.",
};

export default function PricingPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="container mx-auto px-4 py-20 max-w-5xl">
          <h1 className="text-5xl font-bold text-center text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-center text-gray-600 mb-16">
            Choose the plan that fits your fleet size. All plans include
            unlimited scans, QR code generation, and email support. Upgrade or
            downgrade anytime.
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="container mx-auto px-4 pb-20 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Starter */}
            <div className="border-2 border-gray-200 rounded-lg p-8 hover:border-orange-500 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">€250</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 mb-6">
                Perfect for small equipment rental companies
              </p>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li>✓ Up to 100 assets</li>
                <li>✓ 5 team members</li>
                <li>✓ Unlimited QR scans</li>
                <li>✓ Mobile scanning (PWA)</li>
                <li>✓ Real-time dashboard</li>
                <li>✓ CSV export</li>
                <li>✓ Email support</li>
              </ul>
              <Link
                href="/contact"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors inline-block"
              >
                Start Free Pilot
              </Link>
            </div>

            {/* Professional */}
            <div className="border-2 border-orange-500 rounded-lg p-8 relative">
              <div className="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Professional
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">€750</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 mb-6">
                Growing companies with multiple locations
              </p>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li>✓ Up to 500 assets</li>
                <li>✓ 20 team members</li>
                <li>✓ Multi-location support</li>
                <li>✓ Zapier integration</li>
                <li>✓ Webhooks & API access</li>
                <li>✓ Advanced reporting</li>
                <li>✓ Priority support</li>
              </ul>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                Start Free Pilot
              </button>
            </div>

            {/* Business */}
            <div className="border-2 border-gray-200 rounded-lg p-8 hover:border-orange-500 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Business
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">€2,500</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 mb-6">
                Mid-market with audits and integrations
              </p>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li>✓ Up to 2,000 assets</li>
                <li>✓ 50 team members</li>
                <li>✓ Digital audit module</li>
                <li>✓ 2 ITSM integrations</li>
                <li>✓ QuickBooks/Xero sync</li>
                <li>✓ Custom workflows</li>
                <li>✓ Phone support</li>
              </ul>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors">
                Schedule Demo
              </button>
            </div>

            {/* Enterprise */}
            <div className="border-2 border-gray-200 rounded-lg p-8 hover:border-orange-500 transition-colors">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Enterprise
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <p className="text-gray-600 mb-6">
                Large companies with complex needs
              </p>
              <ul className="space-y-3 mb-8 text-gray-600">
                <li>✓ Unlimited assets</li>
                <li>✓ Unlimited users</li>
                <li>✓ All integrations</li>
                <li>✓ Custom development</li>
                <li>✓ Dedicated manager</li>
                <li>✓ 99.9% SLA</li>
                <li>✓ 1-hour support</li>
              </ul>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  What counts as an &quot;asset&quot;?
                </h3>
                <p className="text-gray-600">
                  An asset is any piece of equipment you&apos;re tracking. This
                  includes heavy machinery, tools, vehicles, containers—anything
                  with a QR code attached.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Can I change plans later?
                </h3>
                <p className="text-gray-600">
                  Yes, upgrade or downgrade anytime. If you upgrade mid-month,
                  we&apos;ll prorate the difference. If you downgrade, the new
                  rate applies at your next billing cycle.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Is there a free trial?
                </h3>
                <p className="text-gray-600">
                  Yes! Founding customers (first 20 companies) get a 2-month
                  free pilot with up to 60 assets. After the pilot, you can
                  choose any paid plan.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Where is my data stored?
                </h3>
                <p className="text-gray-600">
                  All data is hosted in EU datacenters (France) with full GDPR
                  compliance. We never store data outside the EU.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Track Smarter?</h2>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors">
              Start Your Free Pilot
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-black text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 TraviXO Systems. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
