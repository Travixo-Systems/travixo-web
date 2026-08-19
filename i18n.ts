import { getRequestConfig } from 'next-intl/server';
import { DEFAULT_LOCALE, isLocale } from './lib/seo';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  const requested = await requestLocale;

  // Ensure that a valid locale is used. isLocale narrows the type, which
  // removes the `as any` cast this previously needed.
  const locale = requested && isLocale(requested) ? requested : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
