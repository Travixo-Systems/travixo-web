'use client';

import Link from "next/link";
import { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { hasRoute, isLocale, pathFor, routeKeyForSlug } from '@/lib/routes';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('navigation');

  const currentLocale = pathname?.split('/')[1] || 'en';

  const getLocalizedPath = (path: string) => `/${currentLocale}${path}`;

  /**
   * The other locale's equivalent of the current page, or that locale's home.
   *
   * This used to swap the locale prefix and keep the path, which 404s twice
   * over: on the French only routes (the VGP hub, its fiches, the tracker,
   * logiciel-vgp), and on every route whose slug differs per locale, where
   * /fr/logiciel-loueur-materiel became /en/logiciel-loueur-materiel rather
   * than /en/equipment-rental-software. Fifteen of the site's pages offered a
   * dead language switch.
   *
   * Resolving through the route manifest fixes both. Where no equivalent
   * exists the switch goes to the other locale's home, which is the honest
   * answer: hreflang already tells crawlers the page is single locale.
   */
  const switchLocale = (newLocale: string) => {
    if (!isLocale(newLocale) || !isLocale(currentLocale)) return `/${newLocale}`;

    const segments = (pathname ?? '').split('/').filter(Boolean).slice(1);
    if (segments.length === 0) return `/${newLocale}`;

    // Only the first segment is a manifest slug. A deeper path means a fiche
    // under /fr/vgp, and those exist in French only.
    const routeKey = routeKeyForSlug(currentLocale, segments[0]);
    if (!routeKey || segments.length > 1 || !hasRoute(newLocale, routeKey)) {
      return `/${newLocale}`;
    }
    return pathFor(newLocale, routeKey);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${currentLocale}`} className="flex items-center gap-2">
            <Image
              src="/logo-color.png"
              alt="TraviXO"
              width={40}
              height={40}
            />
            <span className="font-bold text-xl">TraviXO</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">

            <Link href={getLocalizedPath('/features')} className="text-gray-600 hover:text-gray-900">
              {t('features')}
            </Link>
            <Link href={getLocalizedPath('/pricing')} className="text-gray-600 hover:text-gray-900">
              {t('pricing')}
            </Link>
            <Link href={getLocalizedPath('/contact')} className="text-gray-600 hover:text-gray-900">
              {t('contact')}
            </Link>            
            <Link href={getLocalizedPath('/about')} className="text-gray-600 hover:text-gray-900">
              {t('about')}
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
              <Link
                href={switchLocale('en')}
                className={`px-2 py-1 rounded font-[family-name:var(--font-geist-mono)] tracking-wide ${currentLocale === 'en'
                  ? 'bg-orange-100 text-orange-600 font-semibold'
                  : 'text-gray-600 hover:text-gray-900'}`}
              >
                EN
              </Link>
              <Link
                href={switchLocale('fr')}
                className={`px-2 py-1 rounded font-[family-name:var(--font-geist-mono)] tracking-wide ${currentLocale === 'fr'
                  ? 'bg-orange-100 text-orange-600 font-semibold'
                  : 'text-gray-600 hover:text-gray-900'}`}
              >
                FR
              </Link>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+33783357535" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
              +33 7 83 35 75 35
            </a>
            <Link
              href={getLocalizedPath('/contact')}
              className="bg-[#e8600a] hover:bg-[#d05508] text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              {currentLocale === 'fr' ? 'Essai Gratuit' : t('startPilot')}
            </Link>
          </div>

          {/* Mobile: Language Switcher + Hamburger (Only visible on mobile & tablet) */}
          <div className="flex items-center lg:hidden gap-2">

            {/* Mobile Language Switcher */}
            <div className="flex gap-1">
              <Link
                href={switchLocale('en')}
                className={`text-sm px-2 py-1 rounded font-[family-name:var(--font-geist-mono)] tracking-wide ${currentLocale === 'en' ? 'bg-orange-100 text-orange-600 font-semibold' : 'text-gray-600 hover:text-gray-900'}`}
              >
                EN
              </Link>
              <Link
                href={switchLocale('fr')}
                className={`text-sm px-2 py-1 rounded font-[family-name:var(--font-geist-mono)] tracking-wide ${currentLocale === 'fr' ? 'bg-orange-100 text-orange-600 font-semibold' : 'text-gray-600 hover:text-gray-900'}`}
              >
                FR
              </Link>
            </div>

            {/* Hamburger Button */}
            <div className="relative">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2"
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

              {mobileMenuOpen && (
                <div className="fixed top-16 right-0 w-50 bg-white shadow-md">
                  <div className="flex flex-col p-4 gap-3">
                    <Link
                      href={getLocalizedPath('/about')}
                      className="text-gray-700 hover:text-black"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('about')}
                    </Link>
                    <Link
                      href={getLocalizedPath('/features')}
                      className="text-gray-700 hover:text-black"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('features')}
                    </Link>
                    <Link
                      href={getLocalizedPath('/pricing')}
                      className="text-gray-700 hover:text-black"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('pricing')}
                    </Link>
                    <Link
                      href={getLocalizedPath('/contact')}
                      className="text-gray-700 hover:text-black"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('contact')}
                    </Link>

                    <Link
                      href={getLocalizedPath('/contact')}
                      className="bg-[#e8600a] hover:bg-[#d05508] text-white text-center py-2 rounded-lg font-semibold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {currentLocale === 'fr' ? 'Essai Gratuit' : t('startPilot')}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}