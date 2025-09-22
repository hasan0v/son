'use client'

import { useEffect, useState } from 'react'
import Section from '@/components/common/Section'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import VideoHeroSection from '@/components/sections/VideoHeroSection'
import { getCategories, getFeaturedProducts } from '@/lib/data'

// Dynamically import client components that use motion
const ProductGrid = dynamic(() => import('@/components/products/ProductGrid'), {
  loading: () => <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="aspect-square bg-gray-200 rounded-lg mb-3"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    ))}
  </div>
})

const ContactForm = dynamic(() => import('@/components/forms/ContactForm'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>
})

// Import animated sections with ssr: false since this is a client component
const AnimatedCategoriesGrid = dynamic(() => import('@/components/animations/AnimatedSections').then(mod => ({ default: mod.AnimatedCategoriesGrid })), { ssr: false })
const AnimatedAboutSection = dynamic(() => import('@/components/animations/AnimatedSections').then(mod => ({ default: mod.AnimatedAboutSection })), { ssr: false })

interface Category {
  id: string
  name: string
  slug: string
  desc: string | null
  createdAt: Date
  updatedAt: Date
}

interface Product {
  id: string
  title: string
  slug: string
  description: string | null
  imageUrl: string | null
  categoryId: string
  volume: string | null
  packSize: string | null
  featured: boolean
  createdAt: Date
  updatedAt: Date
  category: Category
}

interface HomePageProps {
  initialCategories?: Category[]
  initialFeaturedProducts?: Product[]
}

export default function HomePage({ initialCategories = [], initialFeaturedProducts = [] }: HomePageProps) {
  const [categories, setCategories] = useState(initialCategories)
  const [featuredProducts, setFeaturedProducts] = useState(initialFeaturedProducts)
  const [loading, setLoading] = useState(!initialCategories.length && !initialFeaturedProducts.length)

  useEffect(() => {
    if (!initialCategories.length || !initialFeaturedProducts.length) {
      Promise.all([
        getCategories(),
        getFeaturedProducts()
      ]).then(([cats, products]) => {
        setCategories(cats)
        setFeaturedProducts(products)
        setLoading(false)
      }).catch(() => {
        setLoading(false)
      })
    }
  }, [initialCategories.length, initialFeaturedProducts.length])

  if (loading) {
    return (
      <div className="min-h-screen">
        {/* Loading skeleton */}
        <Section className="py-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded mb-4 max-w-md mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded mb-8 max-w-lg mx-auto"></div>
            <div className="h-12 bg-gray-200 rounded max-w-xs mx-auto"></div>
          </div>
        </Section>
      </div>
    )
  }

  return (
    <>
      {/* Video Hero Section */}
      <VideoHeroSection />

      {/* Categories Section */}
      <Section 
        title="Məhsul Kateqoriyaları"
        description="Geniş çeşidimizi kəşf edin"
      >
        <AnimatedCategoriesGrid categories={categories} />
      </Section>

      {/* Featured Products Section */}
      <Section 
        className="bg-gray-50"
        title="Seçilmiş Məhsullar"
        description="Ən populyar və keyfiyyətli məhsullarımız"
      >
        <div>
          <ProductGrid products={featuredProducts} />
        </div>
        
        {featuredProducts.length > 0 && (
          <div className="text-center mt-8">
            <Link 
              href="/products"
              className="inline-flex items-center text-blue-600 font-medium hover:underline transition-all duration-200 hover:translate-x-1"
            >
              Bütün məhsulları gör
              <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </Section>

      {/* About Section */}
      <Section 
        title="Haqqımızda"
        description="SON brendinin keyfiyyət vədimiz"
      >
        <AnimatedAboutSection />
      </Section>

      {/* Contact Section */}
      <Section 
        id="contact"
        className="bg-blue-50"
        title="Bizimlə Əlaqə"
        description="Suallarınız var? Bizə yazın, ən qısa müddətdə cavab verərik"
      >
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  )
}