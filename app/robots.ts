import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://son.az'

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/products/',
          '/products/*',
          '/public/',
          '/uploads/*.jpg',
          '/uploads/*.jpeg',
          '/uploads/*.png',
          '/uploads/*.webp'
        ],
        disallow: [
          '/admin/',
          '/admin/*',
          '/api/',
          '/api/*',
          '/_next/',
          '/uploads/*.sql',
          '/uploads/*.json',
          '/private/',
          '*?*sort=*',
          '*?*filter=*',
          '*.pdf',
          '*.doc*'
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/products/',
          '/products/*',
          '/uploads/*.jpg',
          '/uploads/*.jpeg', 
          '/uploads/*.png',
          '/uploads/*.webp'
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/_next/'
        ]
      },
      {
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/products/',
          '/products/*'
        ],
        disallow: [
          '/admin/',
          '/api/',
          '/_next/'
        ],
        crawlDelay: 2,
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}