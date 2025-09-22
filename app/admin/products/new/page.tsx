import ProductForm from '@/components/forms/ProductForm'
import { getCategories } from '@/lib/data'

export const metadata = {
  title: 'SON Admin | Yeni Məhsul',
  description: 'Yeni məhsul əlavə edin',
}

export default async function NewProductPage() {
  const categories = await getCategories()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Yeni Məhsul</h1>
        <p className="text-gray-600">Yeni məhsul əlavə edin</p>
      </div>

      <ProductForm categories={categories} />
    </div>
  )
}