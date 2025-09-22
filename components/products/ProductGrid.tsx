'use client'

import ProductCard from './ProductCard'
import { AnimatePresence, motion } from 'framer-motion'

interface Product {
  id: string
  title: string
  description?: string | null
  imageUrl?: string | null
  volume?: string | null
  packSize?: string | null
  featured: boolean
  category: {
    id: string
    name: string
    slug: string
  }
}

interface ProductGridProps {
  products: Product[]
  prioritizeFirst?: number
}

export default function ProductGrid({ products, prioritizeFirst = 0 }: ProductGridProps) {
  if (!products.length) {
    return (
      <motion.div 
        className="text-center py-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-gray-400 text-4xl mb-4">📦</div>
        <p className="text-gray-500">Məhsul tapılmadı.</p>
      </motion.div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <AnimatePresence mode="wait">
        {products.map((product, index) => (
          <ProductCard 
            key={`${product.id}-${product.category.slug}`} // Better key for category filtering
            product={product} 
            priority={index < prioritizeFirst}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}