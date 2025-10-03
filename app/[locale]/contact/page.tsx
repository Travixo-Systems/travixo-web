'use client';

import Navigation from "../components/navigation";
import { useState } from 'react';
import Link from "next/link";
import { use } from "react"; 

export default function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    type: '',
    fleetSize: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: `
Phone: ${formData.phone || 'Not provided'}
Type: ${formData.type}
Fleet Size: ${formData.fleetSize}

Message:
${formData.message}
          `.trim()
        }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        type: '',
        fleetSize: '',
        message: ''
      });
    } catch (_error) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try emailing us directly at info@travixosystems.com');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        <section className="container mx-auto px-4 py-20 max-w-4xl">
          <h1 className="text-5xl font-bold text-center text-gray-900 mb-6">
            Let&apos;s Talk About Your Equipment Tracking Needs
          </h1>
          <p className="text-xl text-center text-gray-600 mb-16">
            Whether you&apos;re interested in a pilot, have questions about
            integrations, or want to see TraviXO in action, we&apos;re here to
            help.
          </p>

          {/* Contact Form */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
            {status === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-semibold">Message sent successfully!</p>
                <p className="text-green-700 text-sm">We&apos;ll get back to you within 24 hours.</p>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-semibold">Error sending message</p>
                <p className="text-red-700 text-sm">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* --- FORM FIELDS --- */}
              {/* Full Name + Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              {/* Company + Phone */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Your Company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="+33 1 23 45 67 89"
                  />
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  What best describes you? *
                </label>
                <select
                  name="type"
                  required
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select an option</option>
                  <option>Equipment rental company interested in pilot</option>
                  <option>Investor/VC</option>
                  <option>Integration partner</option>
                  <option>Press/Media</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Fleet Size */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  What&apos;s your fleet size? *
                </label>
                <select
                  name="fleetSize"
                  required
                  value={formData.fleetSize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select fleet size</option>
                  <option>1-100 assets</option>
                  <option>100-500 assets</option>
                  <option>500-2,000 assets</option>
                  <option>2,000+ assets</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Tell us about your equipment tracking needs..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <a
                href="mailto:info@travixosystems.com"
                className="text-orange-500 hover:text-orange-600"
              >
                info@travixosystems.com
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
              <a
                href="tel:+33783357535"
                className="text-orange-500 hover:text-orange-600"
              >
                +33 78 335 75 35
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">Paris, France</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer inline */}
      <footer className="bg-black text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 TraviXO Systems. All rights reserved.</p>
          <p className="mt-2 text-sm">
            <Link href={`/${locale}/privacy`} className="hover:text-white">
              Privacy Policy
            </Link>
            {" • "}
            <Link href={`/${locale}/terms`} className="hover:text-white">
              Terms of Service
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}
