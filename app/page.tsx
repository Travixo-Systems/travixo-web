import Link from "next/link";
import Navigation from "./components/navigation";

import ProblemSolutionCarousel from "./components/ProblemSolutionCarousel";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16">
          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-900 mb-6">
            Stop Losing Equipment.
            <br />
            Start Tracking Smarter.
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-10">
            TraviXO helps equipment rental companies eliminate asset loss,
            automate quarterly audits, and track every piece of equipment in
            real-time with simple QR codes.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors inline-block"
            >
              Start Free Pilot
            </Link>{" "}
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-8 py-4 rounded-lg text-lg transition-colors">
              Watch 2-Min Demo
            </button>
          </div>
        </section>
        {/* Value Props */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Reduce Loss by 70%
                </h3>
                <p className="text-gray-600">
                  Real-time QR scanning means you always know where your assets
                  are. No more writing off &quot;missing&quot; equipment.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  2-Day Audits, Not 2 Weeks
                </h3>
                <p className="text-gray-600">
                  Replace clipboards and spreadsheets with digital audit
                  workflows. Complete quarterly reconciliation in days, not
                  weeks.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Enterprise-Ready Integrations
                </h3>
                <p className="text-gray-600">
                  Connect TraviXO to ServiceNow, Jira, QuickBooks, or 5,000+
                  apps via Zapier. Your asset data flows where you need it.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Problem Section */}

        {/* Solution Section */}
        <ProblemSolutionCarousel />

        {/* Final CTA Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Stop Losing Equipment?
            </h2>

            <p className="text-xl text-gray-300 mb-10">
              Join equipment rental companies who are eliminating asset loss and
              saving hundreds of thousands annually.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/contact"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors inline-block text-center"
              >
                Start Your Free Pilot
              </Link>{" "}
              <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors">
                Schedule a Demo
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-400 max-w-2xl mx-auto">
              <div>✓ No credit card required</div>
              <div>✓ 3-month free trial</div>
              <div>✓ EU-hosted (GDPR)</div>
              <div>✓ Cancel anytime</div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-gray-400 py-8">
          <div className="container mx-auto px-4 text-center">
            <p>© 2025 TraviXO Systems. All rights reserved.</p>
            <p className="mt-2 text-sm">
              <a
                href="mailto:travixosystems@gmail.com"
                className="hover:text-white"
              >
                travixosystems@gmail.com
              </a>
              {" • "}
              <span>+33 78 335 75 35</span>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
