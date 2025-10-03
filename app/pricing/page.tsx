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
        <section className="container mx-auto px-4 py-10 max-w-5xl">
          <h1 className="text-5xl font-bold text-center text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-center text-gray-600 mb-4">
            Choose the plan that fits your fleet size. All plans include
            unlimited scans, QR code generation, and email support. Upgrade or
            downgrade anytime.
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="container mx-auto px-4 pb-16 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Starter */}
            <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-500 transition-colors">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Starter</h3>
              <div className="mb-3">
                <span className="text-2xl font-bold">€250</span>
                <span className="text-sm text-gray-600">/mo</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Small companies</p>
              <ul className="space-y-1 mb-4 text-sm text-gray-600">
                <li>✓ 100 assets</li>
                <li>✓ 5 team members</li>
                <li>✓ Unlimited scans</li>
                <li>✓ Mobile scanning</li>
                <li>✓ Dashboard</li>
                <li>✓ CSV export</li>
              </ul>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                Start Pilot
              </button>
            </div>

            {/* Professional */}
            <div className="border-2 border-orange-500 rounded-lg p-4 relative">
              <div className="absolute -top-3 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                POPULAR
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Professional
              </h3>
              <div className="mb-3">
                <span className="text-2xl font-bold">€750</span>
                <span className="text-sm text-gray-600">/mo</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Growing companies</p>
              <ul className="space-y-1 mb-4 text-sm text-gray-600">
                <li>✓ 500 assets</li>
                <li>✓ 20 team members</li>
                <li>✓ Multi-location</li>
                <li>✓ Zapier</li>
                <li>✓ API access</li>
                <li>✓ Priority support</li>
              </ul>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                Start Pilot
              </button>
            </div>

            {/* Business */}
            <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-500 transition-colors">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Business</h3>
              <div className="mb-3">
                <span className="text-2xl font-bold">€2,500</span>
                <span className="text-sm text-gray-600">/mo</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Mid-market</p>
              <ul className="space-y-1 mb-4 text-sm text-gray-600">
                <li>✓ 2,000 assets</li>
                <li>✓ 50 team members</li>
                <li>✓ Audit module</li>
                <li>✓ 2 ITSM integrations</li>
                <li>✓ QuickBooks sync</li>
                <li>✓ Phone support</li>
              </ul>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                Demo
              </button>
            </div>

            {/* Enterprise */}
            <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-500 transition-colors">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Enterprise
              </h3>
              <div className="mb-3">
                <span className="text-2xl font-bold">Custom</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Large companies</p>
              <ul className="space-y-1 mb-4 text-sm text-gray-600">
                <li>✓ Unlimited assets</li>
                <li>✓ Unlimited users</li>
                <li>✓ All integrations</li>
                <li>✓ Custom dev</li>
                <li>✓ Dedicated manager</li>
                <li>✓ 99.9% SLA</li>
              </ul>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                Contact
              </button>
            </div>
          </div>
        </section>
        {/* FAQ */}
        <section className="bg-gray-50 py-10">
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
                  includes heavy machinery, tools, vehicles, containers anything
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
          <p className="mt-2 text-sm">
            <a href="/privacy" className="hover:text-white">
              Privacy Policy
            </a>
            {" • "}
            <a href="/terms" className="hover:text-white">
              Terms of Service
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
