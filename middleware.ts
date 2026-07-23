import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en'
});

export const config = {
  // Match every path except API routes, Next internals, and static files
  // (anything with a dot). This lets locale-less deep links (e.g. /pricing)
  // auto-detect the browser language and redirect to /fr or /en instead of 404.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};