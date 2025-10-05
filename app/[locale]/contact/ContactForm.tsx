'use client';

import Navigation from "../components/navigation";
import { useState } from 'react';
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ContactForm({ locale }: { locale: string }) {
  const t = useTranslations('contact');

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
Phone: ${formData.phone || t('form.notProvided')}
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
      setErrorMessage(t('form.errorMessage'));
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

  const typeOptions = [
    'typeOptions.rental',
    'typeOptions.investor',
    'typeOptions.partner',
    'typeOptions.press',
    'typeOptions.other'
  ];

  const fleetSizeOptions = [
    'fleetOptions.small',
    'fleetOptions.medium',
    'fleetOptions.large',
    'fleetOptions.enterprise'
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        <section className="container mx-auto px-4 py-20 max-w-4xl">
          <h1 className="text-5xl font-bold text-center text-gray-900 mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-center text-gray-600 mb-16">
            {t('hero.subtitle')}
          </p>

          {/* Contact Form */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
            {status === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-semibold">{t('form.successTitle')}</p>
                <p className="text-green-700 text-sm">{t('form.successMessage')}</p>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-semibold">{t('form.errorTitle')}</p>
                <p className="text-red-700 text-sm">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name + Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('form.fullName')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder={t('form.fullNamePlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('form.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder={t('form.emailPlaceholder')}
                  />
                </div>
              </div>

              {/* Company + Phone */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('form.company')} *
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder={t('form.companyPlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('form.phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder={t('form.phonePlaceholder')}
                  />
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('form.typeLabel')} *
                </label>
                <select
                  name="type"
                  required
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">{t('form.typeSelect')}</option>
                  {typeOptions.map((option) => (
                    <option key={option} value={t(option)}>
                      {t(option)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fleet Size */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('form.fleetLabel')} *
                </label>
                <select
                  name="fleetSize"
                  value={formData.fleetSize}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">{t('form.fleetSelect')}</option>
                  {fleetSizeOptions.map((option) => (
                    <option key={option} value={t(option)}>
                      {t(option)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('form.message')} *
                </label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder={t('form.messagePlaceholder')}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? t('form.sending') : t('form.send')}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('contactInfo.email')}</h3>
              <a
                href="mailto:info@travixosystems.com"
                className="text-orange-500 hover:text-orange-600"
              >
                info@travixosystems.com
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('contactInfo.phone')}</h3>
              <a
                href="tel:+33783357535"
                className="text-orange-500 hover:text-orange-600"
              >
                +33 78 335 75 35
              </a>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">{t('contactInfo.location')}</h3>
              <p className="text-gray-600">{t('contactInfo.locationValue')}</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer inline */}
      <footer className="bg-black text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>{t('footer.copyright')}</p>
          <p className="mt-2 text-sm">
            <Link href={`/${locale}/privacy`} className="hover:text-white">
              {t('footer.privacy')}
            </Link>
            {" • "}
            <Link href={`/${locale}/terms`} className="hover:text-white">
              {t('footer.terms')}
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}