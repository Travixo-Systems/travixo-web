'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="flex gap-2">
      <button 
        onClick={() => switchLanguage('en')}
        className={`px-3 py-1 rounded ${locale === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        EN
      </button>
      <button 
        onClick={() => switchLanguage('fr')}
        className={`px-3 py-1 rounded ${locale === 'fr' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        FR
      </button>
    </div>
  );
}