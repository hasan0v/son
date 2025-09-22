'use client'

import { StaggerContainer, StaggerItem, SlideIn, BounceIn, Wave, SlideUpFade, Float, RotateOnHover } from '@/components/animations/MotionComponents'
import Link from 'next/link'

interface Category {
  id: string
  name: string
  slug: string
  desc?: string | null
}

export function AnimatedHeroSection() {
  return (
    <Wave className="text-center">
      <Float delay={0.5}>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-headline-bold text-gray-900 mb-4">
          SON — Təmizlik Məhsullarında 
          <span className="text-brand-primary"> Güvənilir Brend</span>
        </h1>
      </Float>
      <SlideUpFade delay={0.3}>
        <p className="text-lg font-body text-gray-600 mb-8 max-w-2xl mx-auto">
          Qabyuyan Maye, Ağardıcı, Sabun və daha çox məhsul — topdan satış üçün keyfiyyətli həllər
        </p>
      </SlideUpFade>
      <BounceIn delay={0.6}>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/products"
            className="bg-brand-primary text-white px-6 py-3 rounded-lg font-accent-semibold hover:bg-brand-primary/90 transition-colors"
          >
            Məhsulları Gör
          </Link>
          <Link 
            href="/#contact"
            className="border border-brand-primary text-brand-primary px-6 py-3 rounded-lg font-accent-semibold hover:bg-brand-primary/5 transition-colors"
          >
            Əlaqə Saxla
          </Link>
        </div>
      </BounceIn>
    </Wave>
  )
}

export function AnimatedCategoriesGrid({ categories }: { categories: Category[] }) {
  return (
    <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {categories.map((category, index) => (
        <StaggerItem key={category.id}>
          <RotateOnHover degrees={5}>
            <Link
              href={`/products?category=${category.slug}`}
              className="group p-4 bg-white border rounded-lg hover:shadow-lg transition-all duration-300 hover:border-brand-accent block"
            >
              <div className="text-center">
                <Float delay={index * 0.1}>
                  <div className="text-3xl mb-2">🧽</div>
                </Float>
                <h3 className="font-medium text-gray-900 group-hover:text-brand-primary transition-colors">
                  {category.name}
                </h3>
                {category.desc && (
                  <p className="text-sm text-gray-500 mt-1">
                    {category.desc}
                  </p>
                )}
              </div>
            </Link>
          </RotateOnHover>
        </StaggerItem>
      ))}
    </StaggerContainer>
  )
}

export function AnimatedAboutSection() {
  return (
    <SlideIn direction="left">
      <div className="max-w-2xl">
        <h3 className="text-xl font-semibold mb-4">Niyə SON?</h3>
        <StaggerContainer>
          <StaggerItem>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-brand-accent mr-2">✓</span>
                Yüksək keyfiyyətli təmizlik məhsulları
              </li>
              <li className="flex items-start">
                <span className="text-brand-accent mr-2">✓</span>
                Topdan satış üçün əlverişli qiymətlər
              </li>
              <li className="flex items-start">
                <span className="text-brand-accent mr-2">✓</span>
                Geniş məhsul çeşidi və daimi ehtiyat
              </li>
              <li className="flex items-start">
                <span className="text-brand-accent mr-2">✓</span>
                Sürətli çatdırılma və etibarlı xidmət
              </li>
            </ul>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </SlideIn>
  )
}