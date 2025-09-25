import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://son-temizlik.com' // Update with your actual domain
  
  // Static pages that don't require database access
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ]

  // Try to get dynamic pages from database, but fall back gracefully
  try {
    // Only import and use Prisma if DATABASE_URL is available
    if (process.env.DATABASE_URL) {
      const { prisma } = await import('@/lib/db')
      
      const categories = await prisma.category.findMany({ 
        select: { slug: true, updatedAt: true } 
      })

      // Category pages
      const categoryPages = categories.map((category) => ({
        url: `${baseUrl}/products?category=${category.slug}`,
        lastModified: category.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))

      return [...staticPages, ...categoryPages]
    }
  } catch (error) {
    console.warn('Database not available during sitemap generation, using static pages only:', error)
  }

  // Return just static pages if database is not available
  return staticPages
}