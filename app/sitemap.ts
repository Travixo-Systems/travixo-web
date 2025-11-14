import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://travixo.com'
  const locales = ['en', 'fr']

  // Define all pages
  const pages = ['', 'features', 'pricing', 'about', 'contact', 'privacy', 'terms']

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Generate entries for each page in each locale
  pages.forEach((page) => {
    locales.forEach((locale) => {
      const url = page === ''
        ? `${baseUrl}/${locale}`
        : `${baseUrl}/${locale}/${page}`

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === '' || page === 'features' || page === 'pricing' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: {
            en: page === '' ? `${baseUrl}/en` : `${baseUrl}/en/${page}`,
            fr: page === '' ? `${baseUrl}/fr` : `${baseUrl}/fr/${page}`,
          },
        },
      })
    })
  })

  return sitemapEntries
}
