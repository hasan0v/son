import { getAllProducts, getCategories, getProductsByCategory } from '@/lib/data'
import ProductGrid from '@/components/products/ProductGrid'
import CategoryFilter from '@/components/products/CategoryFilter'
import Container from '@/components/layout/Container'
import { Suspense } from 'react'

// Enable static generation with revalidation
export const revalidate = 1800 // Revalidate every 30 minutes

export const metadata = {
  title: 'SON | Məhsullar - Təmizlik Məhsulları Kataloqu',
  description: 'SON təmizlik məhsulları - qabyuyan maye, ağardıcı, sabun və digər keyfiyyətli məhsullar. Topdan satış üçün uyğun qiymətlər.',
  keywords: 'son məhsulları, təmizlik məhsulları, qabyuyan maye, ağardıcı, sabun, katalog, topdan satış',
  openGraph: {
    title: 'SON Məhsulları - Təmizlik Məhsulları Kataloqu',
    description: 'SON təmizlik məhsulları kataloqunda qabyuyan maye, ağardıcı, sabun və digər keyfiyyətli məhsulları tapa bilərsiniz.',
    type: 'website',
  },
}

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string
  }>
}

// Loading component for suspense
function ProductsLoading() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  )
}

// Products content component with optimized loading
async function ProductsContent({ categorySlug }: { categorySlug?: string }) {
  const products = categorySlug 
    ? await getProductsByCategory(categorySlug)
    : await getAllProducts()

  return <ProductGrid products={products} />
}

// Generate static params for known categories
export async function generateStaticParams() {
  const categories = await getCategories()
  
  return [
    // Default products page
    {},
    // Category pages
    ...categories.map((category) => ({
      searchParams: { category: category.slug }
    }))
  ]
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const categories = await getCategories()
  const params = await searchParams
  const selectedCategory = params.category

  return (
    <Container className="py-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Məhsullar
          </h1>
          <p className="text-gray-600 mt-1">
            {selectedCategory 
              ? `${categories.find(c => c.slug === selectedCategory)?.name || 'Seçilmiş kateqoriya'} məhsulları`
              : 'Bütün məhsullarımızı kəşf edin'
            }
          </p>
        </div>
        
        <CategoryFilter 
          categories={categories.map(c => ({ 
            slug: c.slug, 
            name: c.name 
          }))} 
        />
      </div>

      <Suspense fallback={<ProductsLoading />}>
        <ProductsContent categorySlug={selectedCategory} />
      </Suspense>
    </Container>
  )
}