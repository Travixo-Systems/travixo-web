'use client';
import Link from "next/link";
import { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('navigation');

  // Extract current locale safely (default to 'en')
  const currentLocale = pathname?.split('/')[1] || 'en';

  // Locale-aware links
  const getLocalizedPath = (path: string) => `/${currentLocale}${path}`;

  // Switch locale while preserving rest of path
  const switchLocale = (newLocale: string) => {
    const pathWithoutLocale = pathname?.replace(/^\/(en|fr)/, '') || '/';
    return `/${newLocale}${pathWithoutLocale}`;
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo (locale-aware) */}
          <Link href={`/${currentLocale}`} className="flex items-center gap-2">
            <Image 
              src="/logo-color.png" 
              alt="TraviXO" 
              width={40} 
              height={40}
            />
            <span className="font-bold text-xl">TraviXO</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href={getLocalizedPath('/features')} className="text-gray-600 hover:text-gray-900">
              {t('features')}
            </Link>
            <Link href={getLocalizedPath('/pricing')} className="text-gray-600 hover:text-gray-900">
              {t('pricing')}
            </Link>
            <Link href={getLocalizedPath('/contact')} className="text-gray-600 hover:text-gray-900">
              {t('contact')}
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
              <Link 
                href={switchLocale('en')}
                className={`px-2 py-1 rounded ${currentLocale === 'en' ? 'bg-orange-100 text-orange-600 font-semibold' : 'text-gray-600 hover:text-gray-900'}`}
              >
                EN
              </Link>
              <Link 
                href={switchLocale('fr')}
                className={`px-2 py-1 rounded ${currentLocale === 'fr' ? 'bg-orange-100 text-orange-600 font-semibold' : 'text-gray-600 hover:text-gray-900'}`}
              >
                FR
              </Link>
            </div>
          </div>

          {/* Desktop CTA */}
          <Link 
            href={getLocalizedPath('/contact')} 
            className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
          >
            {t('startPilot')}
          </Link>

          {/* Mobile Hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <Link 
                href={getLocalizedPath('/features')} 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('features')}
              </Link>
              <Link 
                href={getLocalizedPath('/pricing')} 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('pricing')}
              </Link>
              <Link 
                href={getLocalizedPath('/contact')} 
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('contact')}
              </Link>

              {/* Mobile Language Switcher */}
              <div className="flex gap-2 py-2 border-t border-gray-200 mt-2 pt-4">
                <Link 
                  href={switchLocale('en')}
                  className={`flex-1 text-center px-4 py-2 rounded ${currentLocale === 'en' ? 'bg-orange-500 text-white font-semibold' : 'bg-gray-100 text-gray-600'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('languages.english')}
                </Link>
                <Link 
                  href={switchLocale('fr')}
                  className={`flex-1 text-center px-4 py-2 rounded ${currentLocale === 'fr' ? 'bg-orange-500 text-white font-semibold' : 'bg-gray-100 text-gray-600'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('languages.french')}
                </Link>
              </div>

              <Link 
                href={getLocalizedPath('/contact')} 
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('startPilot')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}