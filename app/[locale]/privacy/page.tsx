import Navigation from "../components/navigation";

export const metadata = {
  title: "Privacy Policy - TraviXO",
  description: "TraviXO privacy policy and data protection information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        <div className="container border-l-4 border-[#f26f00] mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold text-center text-[#00252b] mb-4">Privacy Policy</h1>
            <p className="text-gray-600">
            <strong>Effective Date:</strong> [Insert Date]
            <br />
            <strong>Last Updated:</strong> [Insert Date]
          </p>

          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-1xl font-bold text-[#00252b] mb-3">
                1. Introduction
              </h2>
              <p>
                TraviXO Systems (&quot;TraviXO,&quot; &quot;we,&quot;
                &quot;us,&quot; or &quot;our&quot;) operates travixosystems.com
                and provides QR-based asset tracking software. We are committed
                to protecting your personal data and respecting your privacy
                rights under the General Data Protection Regulation (GDPR) and
                other applicable data protection laws.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, store, and
                protect your information when you use our website and services.
              </p>
            </section>

            <section>
              <h2 className="text-1xl font-bold text-[#00252b] mb-3">
                2. Data Controller
              </h2>
              <p>The data controller responsible for your personal data is:</p>
              <p>
                <strong>TraviXO Systems</strong>
                <br />
                [Insert registered address when available]
                <br />
                Email: contact@travixosystems.com
                <br />
                Phone: +33 78 335 75 35
              </p>
            </section>

            <section>
              <h2 className="text-1xl font-bold text-[#00252b] mb-3">
                3. Information We Collect
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                3.1 Information You Provide
              </h3>
              <p>We collect information you voluntarily provide when you:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Fill out contact forms (name, email, company, phone number,
                  message)
                </li>
                <li>Request a pilot or demo</li>
                <li>Create an account (if applicable)</li>
                <li>Subscribe to our newsletter or updates</li>
                <li>Communicate with us via email or phone</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                3.2 Automatically Collected Information
              </h3>
              <p>When you visit our website, we automatically collect:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>IP address and geographic location (country/city level)</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website</li>
                <li>Date and time of access</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                3.3 Cookies and Tracking Technologies
              </h3>
              <p>
                We use essential cookies to ensure our website functions
                properly. We do not use advertising or tracking cookies. You can
                disable cookies in your browser settings, though this may affect
                website functionality.
              </p>
            </section>

            <section>
              <h2 className="text-1xl font-bold text-[#00252b] mb-3">
                4. How We Use Your Information
              </h2>
              <p>We use your personal data for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Service Delivery:</strong> To respond to inquiries,
                  provide demos, and onboard pilot customers
                </li>
                <li>
                  <strong>Communication:</strong> To send you updates about your
                  pilot, product features, and support
                </li>
                <li>
                  <strong>Improvement:</strong> To analyze website usage and
                  improve our services
                </li>
                <li>
                  <strong>Legal Compliance:</strong> To comply with legal
                  obligations and resolve disputes
                </li>
                <li>
                  <strong>Marketing:</strong> To send promotional emails (with
                  your explicit consent, which you can withdraw anytime)
                </li>
              </ul>
              <p className="mt-3">
                <strong>Legal Basis (GDPR Article 6):</strong> We process your
                data based on:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Consent (for marketing communications)</li>
                <li>
                  Contractual necessity (to provide services you requested)
                </li>
                <li>
                  Legitimate interests (to improve our services and prevent
                  fraud)
                </li>
                <li>
                  Legal obligations (to comply with tax and regulatory
                  requirements)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-1xl font-bold text-[#00252b] mb-3">
                5. Data Sharing and Disclosure
              </h2>
              <p>
                We do not sell your personal data. We may share your information
                with:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Service Providers:</strong> Hosting providers
                  (Vercel), email services, analytics tools (only EU-based
                  providers)
                </li>
                <li>
                  <strong>Legal Requirements:</strong> If required by law, court
                  order, or government authority
                </li>
                <li>
                  <strong>Business Transfers:</strong> In the event of a merger,
                  acquisition, or sale of assets
                </li>
              </ul>
              <p className="mt-3">
                All third-party service providers are contractually obligated to
                protect your data and only process it according to our
                instructions.
              </p>
            </section>

            <section>
              <h2 className="text-1xl font-bold text-[#00252b] mb-3">
                6. Data Storage and Security
              </h2>
              <p>
                <strong>Storage Location:</strong> All data is stored on servers
                located in the European Union (France).
              </p>
              <p>
                <strong>Security Measures:</strong> We implement
                industry-standard security measures including:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Encryption in transit (HTTPS/TLS)</li>
                <li>Encryption at rest for sensitive data</li>
                <li>Access controls and authentication</li>
                <li>Regular security audits</li>
                <li>Backup and disaster recovery procedures</li>
              </ul>
              <p className="mt-3">
                While we take reasonable precautions, no method of transmission
                over the internet is 100% secure. We cannot guarantee absolute
                security.
              </p>
            </section>

            <section>
              <h2 className="text-1xl font-bold text-[#00252b] mb-3">
                7. Data Retention
              </h2>
              <p>
                We retain your personal data for as long as necessary to fulfill
                the purposes outlined in this policy:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Contact form inquiries:</strong> 2 years from last
                  contact
                </li>
                <li>
                  <strong>Pilot customer data:</strong> Duration of pilot + 1
                  year
                </li>
                <li>
                  <strong>Active customer data:</strong> Duration of
                  subscription + 3 years (for legal/tax purposes)
                </li>
                <li>
                  <strong>Marketing consent:</strong> Until you withdraw consent
                  or 3 years of inactivity
                </li>
              </ul>
              <p className="mt-3">
                After retention periods expire, we securely delete or anonymize
                your data.
              </p>
            </section>

            <section>
              <h2 className="text-1xl font-bold text-[#00252b] mb-3">
                8. Your Rights Under GDPR
              </h2>
              <p>As an EU data subject, you have the following rights:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Right of Access:</strong> Request a copy of your
                  personal data
                </li>
                <li>
                  <strong>Right to Rectification:</strong> Correct inaccurate or
                  incomplete data
                </li>
                <li>
                  <strong>
                    Right to Erasure (&quot;Right to be Forgotten&quot;):
                  </strong>{" "}
                  Request deletion of your data
                </li>
                <li>
                  <strong>Right to Restriction:</strong> Limit how we process
                  your data
                </li>
                <li>
                  <strong>Right to Data Portability:</strong> Receive your data
                  in a structured, machine-readable format
                </li>
                <li>
                  <strong>Right to Object:</strong> Opt out of certain
                  processing activities (e.g., marketing)
                </li>
                <li>
                  <strong>Right to Withdraw Consent:</strong> Withdraw consent
                  at any time (does not affect prior processing)
                </li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at:{" "}
                <strong>contact@travixosystems.com</strong>
              </p>
              <p>
                We will respond to your request within 30 days. You also have
                the right to lodge a complaint with your local data protection
                authority (CNIL in France).
              </p>
            </section>

            <section>
              <h2 className="text-1xl font-bold text-[#00252b] mb-3">
                9. Children&apos;s Privacy
              </h2>
              <p>
                Our services are not intended for individuals under 18 years of
                age. We do not knowingly collect personal data from children. If
                we become aware that we have collected data from a child, we
                will delete it promptly.
              </p>
            </section>

            <section>
              <h2 className="text-1xl font-bold text-[#00252b] mb-3">
                10. International Data Transfers
              </h2>
              <p>
                We do not transfer your data outside the European Economic Area
                (EEA). All data processing occurs within EU-based infrastructure
                to ensure GDPR compliance.
              </p>
            </section>

            <section>
              <h2 className="text-1xl font-bold text-[#00252b] mb-3">
                11. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or legal requirements. We will notify
                you of significant changes by:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Posting the updated policy on this page with a new &quot;Last
                  Updated&quot; date
                </li>
                <li>
                  Sending an email notification (if you are a customer or have
                  subscribed)
                </li>
              </ul>
              <p className="mt-3">
                Continued use of our services after changes constitutes
                acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-1xl font-bold text-[#00252b] mb-3">
                12. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy or how we handle
                your data, contact us:
              </p>
              <p>
                <strong>Email:</strong> contact@travixosystems.com
                <br />
                <strong>Phone:</strong> +33 78 335 75 35
                <br />
                <strong>Address:</strong> [Insert registered address when
                available]
              </p>
            </section>
          </div>
        </div>
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
