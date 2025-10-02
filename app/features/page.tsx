import Link from "next/link";
import Navigation from '../components/navigation';

export const metadata = {
  title: 'Features - TraviXO Asset Tracking',
  description: 'Complete asset tracking features: QR codes, mobile scanning, real-time dashboards, and enterprise integrations.',
}

export default function FeaturesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        
        {/* Hero */}
        <section className="container mx-auto px-4 py-10 max-w-5xl">
          <h1 className="text-md font-bold text-center text-gray-900 mb-4">
            Everything You Need to Master Asset Tracking
          </h1>
          <p className="text-xl text-center text-gray-600 mb-2">
            TraviXO combines simple QR technology with enterprise-grade integrations 
            to give you complete visibility and control over your equipment fleet.
          </p>
        </section>

        {/* Core Features */}
        <section className="bg-[#2d3a39] py-8">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center text-white mb-6">
              Core Features
            </h2>

            <div className="space-y-12">
              
              {/* Feature 1 */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  QR Code Asset Tracking
                </h3>
                <p className="text-gray-600 mb-4">
                  Generate unlimited QR codes for your entire fleet. Each asset gets a unique, 
                  scannable code that links to its digital record in TraviXO.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ One-click QR generation</li>
                  <li>✓ Weatherproof label recommendations included</li>
                  <li>✓ Static URLs (revocable if needed)</li>
                  <li>✓ Batch generation for large fleets</li>
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Mobile-First Scanning
                </h3>
                <p className="text-gray-600 mb-4">
                  Your team can scan assets using any smartphone—no app download required. 
                  Fast, accurate, works in low light.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Progressive Web App (install optional)</li>
                  <li>✓ Camera-based QR scanner</li>
                  <li>✓ Works offline, syncs when online</li>
                  <li>✓ GPS location tagging</li>
                </ul>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Real-Time Dashboards
                </h3>
                <p className="text-gray-600 mb-4">
                  Know exactly where every asset is, who has it, and when it was last verified. 
                  Filter by status, location, category, or custom fields.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Asset status breakdown</li>
                  <li>✓ Utilization rates by category</li>
                  <li>✓ Custom alerts and notifications</li>
                  <li>✓ Export to CSV/Excel</li>
                </ul>
              </div>

              {/* Feature 4 */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Digital Inventory Audits
                </h3>
                <p className="text-gray-600 mb-4">
                  Replace manual audits with digital workflows. Generate expected asset lists, 
                  track verification progress in real-time, and flag discrepancies automatically.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Mobile audit checklist</li>
                  <li>✓ Real-time progress tracking</li>
                  <li>✓ Missing asset alerts</li>
                  <li>✓ Compliance exports (GAAP, IFRS)</li>
                </ul>
              </div>

              {/* Feature 5 */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Enterprise Integrations
                </h3>
                <p className="text-gray-600 mb-4">
                  Your asset data flows everywhere it needs to go. Push to ServiceNow, 
                  sync costs to QuickBooks, or build custom integrations via webhooks.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ ServiceNow & Jira Service Management</li>
                  <li>✓ QuickBooks & Xero sync</li>
                  <li>✓ Zapier (5,000+ apps)</li>
                  <li>✓ Webhooks & REST API</li>
                </ul>
              </div>

              {/* Feature 6 */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Team Management & Security
                </h3>
                <p className="text-gray-600 mb-4">
                  Role-based permissions, audit logs, and multi-location support ensure 
                  your team has the right access.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Owner, Admin, Member, Viewer roles</li>
                  <li>✓ Two-factor authentication</li>
                  <li>✓ Complete audit logs</li>
                  <li>✓ Multi-location support</li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to See TraviXO in Action?
            </h2>
            <Link href="/contact" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors inline-block">
              Start Your Free Pilot
            </Link>
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