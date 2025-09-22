import { prisma } from '@/lib/db'
import { unstable_cache as cache } from 'next/cache'
import { CATEGORIES_TAG, PRODUCTS_TAG } from './cache'

export const getCategories = cache(
  async () => {
    return prisma.category.findMany({ 
      orderBy: { name: 'asc' } 
    })
  },
  ['categories'],
  { tags: [CATEGORIES_TAG] }
)

export const getFeaturedProducts = cache(
  async () => {
    return prisma.product.findMany({
      where: { featured: true },
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    })
  },
  ['products', 'featured'],
  { tags: [PRODUCTS_TAG] }
)

export const getAllProducts = cache(
  async () => {
    return prisma.product.findMany({ 
      include: { category: true }, 
      orderBy: { createdAt: 'desc' } 
    })
  },
  ['products', 'all'],
  { tags: [PRODUCTS_TAG] }
)

export const getProductsByCategory = (slug: string) => cache(
  async () => {
    return prisma.product.findMany({
      where: { 
        category: { slug } 
      }, 
      include: { category: true }, 
      orderBy: { createdAt: 'desc' }
    })
  },
  ['products', 'category', slug],
  { tags: [PRODUCTS_TAG] }
)()

export const getProductById = (id: string) => cache(
  async () => {
    return prisma.product.findUnique({
      where: { id },
      include: { category: true }
    })
  },
  ['product', id],
  { tags: [PRODUCTS_TAG] }
)()

export const getCategoryById = (id: string) => cache(
  async () => {
    return prisma.category.findUnique({
      where: { id }
    })
  },
  ['category', id],
  { tags: [CATEGORIES_TAG] }
)()