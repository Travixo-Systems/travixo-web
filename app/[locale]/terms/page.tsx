import Navigation from "../components/navigation";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service - TraviXO",
  description: "TraviXO terms of service and user agreement.",
};

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        <div className="container border-l-4 border-[#f26f00] mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 mb-8">
            <strong>Effective Date:</strong> [to be finalised]
            <br />
            <strong>Last Updated:</strong> [to be decided]
          </p>

          <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                1. Agreement to Terms
              </h2>
              <p>
                By accessing or using TraviXO&apos;s website
                (travixosystems.com) and services (&quot;Services&quot;), you
                agree to be bound by these Terms of Service (&quot;Terms&quot;).
                If you do not agree to these Terms, do not use our Services.
              </p>
              <p>
                These Terms constitute a legally binding agreement between you
                (the &quot;Customer,&quot; &quot;you,&quot; or &quot;your&quot;)
                and TraviXO Systems (&quot;TraviXO,&quot; &quot;we,&quot;
                &quot;us,&quot; or &quot;our&quot;).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                2. Description of Services
              </h2>
              <p>
                TraviXO provides QR-based asset tracking software designed for
                equipment rental and leasing companies. Our Services include:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>QR code generation and asset tracking</li>
                <li>Mobile and web-based scanning interfaces</li>
                <li>Real-time dashboards and reporting</li>
                <li>Digital inventory audit tools</li>
                <li>
                  Third-party integrations (ServiceNow, Jira, QuickBooks, etc.)
                </li>
              </ul>
              <p className="mt-3">
                We reserve the right to modify, suspend, or discontinue any part
                of the Services at any time with reasonable notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                3. User Accounts and Registration
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                3.1 Account Creation
              </h3>
              <p>
                To use certain features of our Services, you must create an
                account. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide accurate, current, and complete information</li>
                <li>
                  Maintain and update your information to keep it accurate
                </li>
                <li>Keep your password secure and confidential</li>
                <li>
                  Notify us immediately of any unauthorized access to your
                  account
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                3.2 Account Responsibility
              </h3>
              <p>
                You are responsible for all activities that occur under your
                account. You must be at least 18 years old to create an account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                4. Subscription Plans and Billing
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                4.1 Pricing and Payment
              </h3>
              <p>
                Subscription fees are based on the plan you select (Starter,
                Professional, Business, or Enterprise). Prices are listed on our
                Pricing page and are subject to change with 30 days&apos;
                notice.
              </p>
              <p>
                Payment is due monthly or annually in advance, depending on your
                chosen billing cycle. We accept credit cards and bank transfers
                (for Enterprise plans).
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                4.2 Auto-Renewal
              </h3>
              <p>
                Subscriptions automatically renew at the end of each billing
                period unless you cancel before the renewal date. You will be
                charged using your payment method on file.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                4.3 Refunds
              </h3>
              <p>
                We offer a 14-day money-back guarantee for first-time
                subscribers. After 14 days, fees are non-refundable. Refunds for
                unused portions of annual subscriptions are prorated if you
                cancel mid-term.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                4.4 Late Payment
              </h3>
              <p>
                If payment fails, we will attempt to charge your payment method
                up to 3 times. If payment is not received within 7 days, your
                account may be suspended. We may charge a late fee of €25 or 5%
                of the outstanding balance, whichever is greater.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                5. Cancellation and Termination
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                5.1 Your Right to Cancel
              </h3>
              <p>
                You may cancel your subscription at any time by contacting us or
                using the cancellation feature in your account settings.
                Cancellation takes effect at the end of your current billing
                period.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                5.2 Our Right to Terminate
              </h3>
              <p>We may suspend or terminate your account if you:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Violate these Terms</li>
                <li>Fail to pay fees when due</li>
                <li>Engage in fraudulent or illegal activity</li>
                <li>
                  Use the Services in a way that harms TraviXO or other users
                </li>
              </ul>
              <p className="mt-3">
                We will provide reasonable notice before termination unless
                immediate termination is required for legal or security reasons.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                5.3 Effect of Termination
              </h3>
              <p>
                Upon termination, your access to the Services will cease. You
                will have 30 days to export your data before it is permanently
                deleted. Fees paid are non-refundable except as stated in
                Section 4.3.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                6. Acceptable Use Policy
              </h2>
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Use the Services for any illegal purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>
                  Reverse engineer, decompile, or disassemble the Services
                </li>
                <li>Upload malicious code, viruses, or malware</li>
                <li>Interfere with or disrupt the Services or servers</li>
                <li>
                  Resell or redistribute the Services without authorization
                </li>
                <li>
                  Use the Services to infringe on intellectual property rights
                </li>
                <li>Impersonate another person or entity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                7. Intellectual Property
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                7.1 Our Ownership
              </h3>
              <p>
                TraviXO retains all rights, title, and interest in the Services,
                including all software, designs, trademarks, and documentation.
                These Terms do not grant you any ownership rights.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                7.2 Your Content
              </h3>
              <p>
                You retain ownership of all data you upload to TraviXO
                (&quot;Customer Data&quot;). You grant us a limited license to
                store, process, and display your data solely to provide the
                Services.
              </p>
              <p>
                You represent that you have the right to upload Customer Data
                and that it does not violate any laws or third-party rights.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                7.3 Feedback
              </h3>
              <p>
                If you provide feedback, suggestions, or ideas about the
                Services, we may use them without obligation to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                8. Data Protection and Privacy
              </h2>
              <p>
                Our collection and use of personal data is governed by our
                Privacy Policy. By using the Services, you consent to our data
                practices as described in the Privacy Policy.
              </p>
              <p>
                We implement reasonable security measures to protect your data,
                but we cannot guarantee absolute security. You are responsible
                for maintaining the confidentiality of your account credentials.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                9. Service Level and Availability
              </h2>
              <p>
                We strive to provide reliable Services but do not guarantee
                uninterrupted access. The Services are provided &quot;as
                is&quot; and &quot;as available.&quot; We may perform
                maintenance that temporarily affects availability, and we will
                provide advance notice when possible.
              </p>
              <p>
                <strong>Service Level Agreement (SLA):</strong> Enterprise
                customers receive a 99.9% uptime SLA as specified in their
                contract. Other plans do not include an SLA.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                10. Limitation of Liability
              </h2>
              <p>
                <strong>To the fullest extent permitted by law:</strong>
              </p>
              <p>
                TraviXO and its affiliates, officers, employees, and agents will
                not be liable for any indirect, incidental, special,
                consequential, or punitive damages, including loss of profits,
                revenue, data, or use, arising from:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your use of or inability to use the Services</li>
                <li>Unauthorized access to your data</li>
                <li>Errors, bugs, or interruptions in the Services</li>
                <li>Third-party content or integrations</li>
              </ul>
              <p className="mt-3">
                Our total liability to you for any claim arising from these
                Terms or the Services will not exceed the fees you paid in the
                12 months preceding the claim.
              </p>
              <p className="mt-3">
                Some jurisdictions do not allow exclusion of certain warranties
                or limitations on liability, so these limitations may not apply
                to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                11. Indemnification
              </h2>
              <p>
                You agree to indemnify and hold harmless TraviXO from any
                claims, damages, losses, liabilities, and expenses (including
                legal fees) arising from:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Your use of the Services</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any laws or third-party rights</li>
                <li>Customer Data you upload to the Services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                12. Dispute Resolution
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                12.1 Governing Law
              </h3>
              <p>
                These Terms are governed by the laws of France, without regard
                to conflict of law principles.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                12.2 Jurisdiction
              </h3>
              <p>
                Any disputes arising from these Terms or the Services will be
                resolved exclusively in the courts of Paris, France. You consent
                to the personal jurisdiction of these courts.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                12.3 Informal Resolution
              </h3>
              <p>
                Before filing a legal claim, you agree to contact us at
                contact@travixosystems.com to attempt to resolve the dispute
                informally.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                13. Changes to These Terms
              </h2>
              <p>
                We may update these Terms from time to time. We will notify you
                of material changes by:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Posting the updated Terms on this page with a new &quot;Last
                  Updated&quot; date
                </li>
                <li>Sending an email notification (for active customers)</li>
              </ul>
              <p className="mt-3">
                Your continued use of the Services after changes take effect
                constitutes acceptance of the updated Terms. If you do not agree
                to the changes, you must cancel your subscription.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                14. General Provisions
              </h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                14.1 Entire Agreement
              </h3>
              <p>
                These Terms, together with our Privacy Policy, constitute the
                entire agreement between you and TraviXO regarding the Services.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                14.2 Severability
              </h3>
              <p>
                If any provision of these Terms is found to be unenforceable,
                the remaining provisions will continue in full force and effect.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                14.3 Waiver
              </h3>
              <p>
                Our failure to enforce any right or provision of these Terms
                will not be deemed a waiver of that right or provision.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                14.4 Assignment
              </h3>
              <p>
                You may not assign these Terms without our prior written
                consent. We may assign these Terms without restriction.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-2 mt-4">
                14.5 Force Majeure
              </h3>
              <p>
                Neither party will be liable for any delay or failure to perform
                due to causes beyond its reasonable control (e.g., natural
                disasters, war, pandemics, government actions).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                15. Contact Information
              </h2>
              <p>If you have questions about these Terms, contact us:</p>
              <p>
                <strong>TraviXO Systems</strong>
                <br />
                Email: contact@travixosystems.com
                <br />
                Phone: +33 78 335 75 35
                <br />
                Address: [Insert registered address when available]
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-black text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 TraviXO Systems. All rights reserved.</p>
          <p className="mt-2 text-sm">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            {" • "}
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}
