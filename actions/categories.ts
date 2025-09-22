'use server'

import { prisma } from '@/lib/db'
import { revalidateTag, revalidatePath } from 'next/cache'
import { CATEGORIES_TAG, PRODUCTS_TAG } from '@/lib/cache'
import { categorySchema } from '@/lib/validators'
import { toSlug } from '@/lib/slug'
import { redirect } from 'next/navigation'

export async function createCategoryAction(formData: FormData) {
  try {
    const rawData = {
      name: formData.get('name') as string,
      desc: (formData.get('desc') as string | null) || '',
    }

    const validatedData = categorySchema.parse(rawData)
    
    const category = await prisma.category.create({
      data: {
        name: validatedData.name,
        slug: toSlug(validatedData.name),
        desc: validatedData.desc || null,
      }
    })

    // Revalidate cache
    revalidateTag(CATEGORIES_TAG)
    revalidateTag(PRODUCTS_TAG)
    revalidatePath('/')
    revalidatePath('/products')

    return { success: true, category }
  } catch (error) {
    console.error('Category creation error:', error)
    return { success: false, error: 'Kateqoriya yaradılarkən xəta baş verdi' }
  }
}

export async function updateCategoryAction(id: string, formData: FormData) {
  try {
    const rawData = {
      name: formData.get('name') as string,
      desc: (formData.get('desc') as string | null) || '',
    }

    const validatedData = categorySchema.parse(rawData)
    
    const category = await prisma.category.update({
      where: { id },
      data: {
        name: validatedData.name,
        slug: toSlug(validatedData.name),
        desc: validatedData.desc || null,
      }
    })

    // Revalidate cache
    revalidateTag(CATEGORIES_TAG)
    revalidateTag(PRODUCTS_TAG)
    revalidatePath('/')
    revalidatePath('/products')

    return { success: true, category }
  } catch (error) {
    console.error('Category update error:', error)
    return { success: false, error: 'Kateqoriya yenilənərkən xəta baş verdi' }
  }
}

export async function deleteCategoryAction(id: string) {
  try {
    // Check if category has products
    const productsCount = await prisma.product.count({
      where: { categoryId: id }
    })

    if (productsCount > 0) {
      return { success: false, error: 'Bu kateqoriyada məhsullar var. Əvvəlcə onları başqa kateqoriyaya köçürün.' }
    }

    await prisma.category.delete({
      where: { id }
    })

    // Revalidate cache
    revalidateTag(CATEGORIES_TAG)
    revalidateTag(PRODUCTS_TAG)
    revalidatePath('/')
    revalidatePath('/products')

    return { success: true }
  } catch (error) {
    console.error('Category deletion error:', error)
    return { success: false, error: 'Kateqoriya silinərkən xəta baş verdi' }
  }
}

export async function createCategoryAndRedirect(formData: FormData) {
  const result = await createCategoryAction(formData)
  if (result.success) {
    redirect('/admin/categories')
  }
  throw new Error(result.error)
}

export async function updateCategoryAndRedirect(id: string, formData: FormData) {
  const result = await updateCategoryAction(id, formData)
  if (result.success) {
    redirect('/admin/categories')
  }
  throw new Error(result.error)
}