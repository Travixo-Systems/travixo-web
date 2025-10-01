import Image from 'next/image';
import Navigation from './components/navigation';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        {/* Logo */}
        <div className="flex justify-center mb-12">
          <Image 
            src="/logo-color.png" 
            alt="TraviXO Logo" 
            width={200} 
            height={200}
            priority
          />
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-900 mb-6">
          Stop Losing Equipment.<br />Start Tracking Smarter.
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto mb-10">
          TraviXO helps equipment rental companies eliminate asset loss, automate quarterly audits, 
          and track every piece of equipment in real-time with simple QR codes.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors">
            Start Free Pilot
          </button>
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
                Real-time QR scanning means you always know where your assets are. 
                No more writing off "missing" equipment.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                2-Day Audits, Not 2 Weeks
              </h3>
              <p className="text-gray-600">
                Replace clipboards and spreadsheets with digital audit workflows. 
                Complete quarterly reconciliation in days, not weeks.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Enterprise-Ready Integrations
              </h3>
              <p className="text-gray-600">
                Connect TraviXO to ServiceNow, Jira, QuickBooks, or 5,000+ apps via Zapier. 
                Your asset data flows where you need it.
              </p>
            </div>

          </div>
        </div>
      </section>
      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Equipment Rental Companies Lose €1M+ Annually
          </h2>
          
          <p className="text-xl text-center text-gray-600 mb-16">
            Most equipment leasing companies don't realize how much poor asset tracking costs them
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Problem 1 */}
            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                2-5% Asset Loss Every Year
              </h3>
              <p className="text-gray-600">
                For a company with €20M in equipment, that's €400k-1M written off as 
                "missing" or "stolen" annually.
              </p>
            </div>

            {/* Problem 2 */}
            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                €50k+ Per Quarterly Audit
              </h3>
              <p className="text-gray-600">
                Flying auditors to depots, manual counts with clipboards, 2 weeks of 
                reconciliation work, and inevitable discrepancies.
              </p>
            </div>

            {/* Problem 3 */}
            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                3x Longer Support Tickets
              </h3>
              <p className="text-gray-600">
                Customer calls about equipment location. Your agent spends 15 minutes 
                hunting through spreadsheets and still can't give a definitive answer.
              </p>
            </div>

            {/* Problem 4 */}
            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Finance Reconciliation Nightmare
              </h3>
              <p className="text-gray-600">
                At month-end, someone manually cross-references 5 different Excel files 
                to figure out which assets are where and what state they're in.
              </p>
            </div>

          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
            <p className="text-xl font-semibold text-gray-900 text-center">
              The Root Cause: You're managing 21st-century equipment with 20th-century tools: 
              Excel, paper logs, and tribal knowledge.
            </p>
          </div>

        </div>
      </section>
      {/* Solution Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-5xl">
          
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
            TraviXO: Your Equipment Intelligence Platform
          </h2>
          
          <p className="text-xl text-center text-gray-600 mb-16">
            Simple QR codes. Powerful tracking. Complete visibility.
          </p>

          <div className="space-y-12">
            
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  QR Everything
                </h3>
                <p className="text-gray-600 text-lg">
                  We generate weatherproof QR code stickers for every asset. Stick them on 
                  your equipment once, track them forever.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Scan Anywhere
                </h3>
                <p className="text-gray-600 text-lg">
                  Field workers scan QR codes with their phones (no app install needed). 
                  Log location, condition, and notes in 10 seconds.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Track Automatically
                </h3>
                <p className="text-gray-600 text-lg">
                  Every scan updates your dashboard in real-time. See exactly where every 
                  asset is, who has it, and when it was last verified.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                4
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Integrate Everything
                </h3>
                <p className="text-gray-600 text-lg">
                  Push asset data to ServiceNow, QuickBooks, Jira, or any tool you use. 
                  No more manual data entry.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* Final CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          
          <h2 className="text-4xl font-bold mb-6">
            Ready to Stop Losing Equipment?
          </h2>
          
          <p className="text-xl text-gray-300 mb-10">
            Join equipment rental companies who are eliminating asset loss and saving 
            hundreds of thousands annually.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors">
              Start Your Free Pilot
            </button>
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
            <a href="mailto:travixosystems@gmail.com" className="hover:text-white">
              travixosystems@gmail.com
            </a>
            {' • '}
            <span>+33 78 335 75 35</span>
          </p>
        </div>
      </footer>
    </main>
    </>
  );
}