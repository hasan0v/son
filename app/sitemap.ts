import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://son-temizlik.com'
  const currentDate = new Date()
  
  // Static public pages (excluding admin pages for SEO)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0, // Highest priority for homepage
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9, // High priority for main products page
    },
  ]

  // Try to get dynamic content from database
  try {
    if (process.env.DATABASE_URL) {
      const { prisma } = await import('@/lib/db')
      
      // Get categories for category-based product pages
      const categories = await prisma.category.findMany({ 
        select: { slug: true, name: true, updatedAt: true } 
      })

      // Future: Get products for individual product URLs when needed
      // const products = await prisma.product.findMany({ 
      //   select: { slug: true, updatedAt: true, featured: true },
      //   take: 100
      // })

      // Category filter pages
      const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
        url: `${baseUrl}/products?category=${category.slug}`,
        lastModified: category.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.7,
      }))

      // Featured products get higher priority (for future individual product pages)
      // const productPages: MetadataRoute.Sitemap = products.map((product) => ({
      //   url: `${baseUrl}/products/${product.slug}`, 
      //   lastModified: product.updatedAt,
      //   changeFrequency: 'monthly',
      //   priority: product.featured ? 0.6 : 0.4,
      // }))

      // Combine all pages
      return [...staticPages, ...categoryPages]
      // Note: Add ...productPages when you create individual product pages
    }
  } catch {
    // Log warning but don't fail the build
    console.warn('Database not available during sitemap generation, using static pages only')
  }

  // Fallback to static pages only
  return staticPages
}