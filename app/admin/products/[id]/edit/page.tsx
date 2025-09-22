import { prisma } from '@/lib/db'
import ProductForm from '@/components/forms/ProductForm'
import { getCategories } from '@/lib/data'
import { notFound } from 'next/navigation'

interface EditProductPageProps {
  params: {
    id: string
  }
}

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true
    }
  })
  
  if (!product) {
    notFound()
  }
  
  return product
}

export async function generateMetadata({ params }: EditProductPageProps) {
  const { id } = await params
  const product = await getProduct(id)
  return {
    title: `SON Admin | ${product.title} - Redaktə`,
    description: `${product.title} məhsulunu redaktə edin`,
  }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params
  const [product, categories] = await Promise.all([
    getProduct(id),
    getCategories()
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Məhsulu Redaktə Et</h1>
        <p className="text-gray-600">{product.title} məhsulunu redaktə edin</p>
      </div>

      <ProductForm 
        categories={categories}
        initialData={product}
      />
    </div>
  )
}