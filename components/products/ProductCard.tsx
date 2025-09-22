'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

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

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  return (
    <motion.div 
      key={`product-${product.id}`}
      className="group rounded-lg border bg-white p-3 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden"
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.25, 0.25, 0, 1],
        delay: Math.min(0.1, Math.random() * 0.2) // Small random delay for stagger effect
      }}
    >
      {/* Background gradient on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-brand-light/20 to-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />
      
      <div className="aspect-square relative rounded overflow-hidden bg-gray-50">
        {product.imageUrl ? (
          <div
            className="w-full h-full relative group-hover:scale-105 transition-transform duration-300 ease-out"
          >
            <Image 
              src={product.imageUrl} 
              alt={product.title} 
              fill 
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={priority}
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              className="object-cover" 
            />
          </div>
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-200"
          >
            <div className="text-center">
              <div 
                className="text-2xl mb-2 animate-pulse"
              >
                📦
              </div>
              <div className="text-xs">Şəkil yoxdur</div>
            </div>
          </div>
        )}
        
        {product.featured && (
          <div 
            className="absolute top-2 left-2 bg-brand-accent text-white text-xs px-2 py-1 rounded animate-bounce-in"
          >
            Seçilmiş
          </div>
        )}
      </div>
      
      <div 
        className="mt-3 relative z-10 animate-slide-up-fade"
      >
        <div 
          className="text-sm text-brand-primary font-medium group-hover:scale-105 transition-transform duration-200"
        >
          {product.category?.name}
        </div>
        <div 
          className="font-semibold text-gray-900 mt-1 group-hover:text-brand-primary group-hover:translate-x-1 transition-all duration-200"
        >
          {product.title}
        </div>
        
        {product.description && (
          <p 
            className="text-sm text-gray-600 mt-1 line-clamp-2 opacity-0 animate-slide-up-fade"
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            {product.description}
          </p>
        )}
        
        <div 
          className="flex items-center gap-2 mt-2 text-sm text-gray-500 opacity-0 animate-slide-up-fade"
          style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
        >
          {product.volume && (
            <span 
              className="bg-gray-100 px-2 py-1 rounded text-xs hover:bg-brand-light hover:scale-105 active:scale-95 transition-all duration-200"
            >
              {product.volume}
            </span>
          )}
          {product.packSize && (
            <span 
              className="bg-gray-100 px-2 py-1 rounded text-xs hover:bg-brand-light hover:scale-105 active:scale-95 transition-all duration-200"
            >
              {product.packSize}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}