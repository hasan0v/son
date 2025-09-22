import { getCategories, getFeaturedProducts } from '@/lib/data'
import HomePage from '@/components/pages/HomePage'

// Enable static generation with revalidation
export const revalidate = 3600 // Revalidate every hour

// Generate metadata for SEO
export const metadata = {
  title: 'SON — Təmizlik Məhsullarında Güvənilir Brend',
  description: 'Qabyuyan Maye, Ağardıcı, Sabun və daha çox məhsul — topdan satış üçün keyfiyyətli həllər. SON brendinin yüksək keyfiyyətli təmizlik məhsulları.',
  keywords: 'son, təmizlik məhsulları, qabyuyan maye, ağardıcı, sabun, topdan satış, Gəncə',
  openGraph: {
    title: 'SON — Təmizlik Məhsullarında Güvənilir Brend',
    description: 'Qabyuyan Maye, Ağardıcı, Sabun və daha çox məhsul — topdan satış üçün keyfiyyətli həllər',
    type: 'website',
  },
}

export default async function Page() {
  // Pre-fetch data on the server for better performance
  const [categories, featuredProducts] = await Promise.all([
    getCategories(),
    getFeaturedProducts()
  ])

  return (
    <HomePage 
      initialCategories={categories}
      initialFeaturedProducts={featuredProducts}
    />
  )
}
