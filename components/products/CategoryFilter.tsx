'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface Category {
  slug: string
  name: string
}

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get('category') || ''

  const handleCategoryChange = (categorySlug: string) => {
    if (categorySlug) {
      router.push(`/products?category=${categorySlug}`)
    } else {
      router.push('/products')
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <label className="text-sm font-medium text-gray-700">
        Kateqoriya:
      </label>
      
      <select
        className="border border-gray-300 rounded-md px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <option value="">Bütün kateqoriyalar</option>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
      
      {selectedCategory && (
        <button
          onClick={() => handleCategoryChange('')}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Filtri təmizlə
        </button>
      )}
    </div>
  )
}