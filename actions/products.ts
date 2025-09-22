'use server'

import { prisma } from '@/lib/db'
import { revalidateTag, revalidatePath } from 'next/cache'
import { PRODUCTS_TAG } from '@/lib/cache'
import { productSchema } from '@/lib/validators'
import { toSlug } from '@/lib/slug'
import { redirect } from 'next/navigation'

type ProductInput = {
  title: string
  categoryId: string
  description?: string
  imageUrl?: string
  volume?: string
  packSize?: string
  featured?: boolean
}

export async function createProductAction(input: ProductInput) {
  try {
    const validatedData = productSchema.parse(input)
    
    const product = await prisma.product.create({
      data: {
        title: validatedData.title,
        slug: toSlug(validatedData.title) + '-' + Math.random().toString(36).slice(2, 8),
        categoryId: validatedData.categoryId,
        description: validatedData.description || null,
        imageUrl: validatedData.imageUrl || null,
        volume: validatedData.volume || null,
        packSize: validatedData.packSize || null,
        featured: validatedData.featured || false,
      },
      include: {
        category: true
      }
    })

    // Revalidate cache
    revalidateTag(PRODUCTS_TAG)
    revalidatePath('/')
    revalidatePath('/products')

    return { success: true, product }
  } catch (error) {
    console.error('Product creation error:', error)
    return { success: false, error: 'Məhsul yaradılarkən xəta baş verdi' }
  }
}

export async function updateProductAction(id: string, input: ProductInput) {
  try {
    const validatedData = productSchema.parse(input)
    
    const product = await prisma.product.update({
      where: { id },
      data: {
        title: validatedData.title,
        slug: toSlug(validatedData.title) + '-' + Math.random().toString(36).slice(2, 8),
        categoryId: validatedData.categoryId,
        description: validatedData.description || null,
        imageUrl: validatedData.imageUrl || null,
        volume: validatedData.volume || null,
        packSize: validatedData.packSize || null,
        featured: validatedData.featured || false,
      },
      include: {
        category: true
      }
    })

    // Revalidate cache
    revalidateTag(PRODUCTS_TAG)
    revalidatePath('/')
    revalidatePath('/products')

    return { success: true, product }
  } catch (error) {
    console.error('Product update error:', error)
    return { success: false, error: 'Məhsul yenilənərkən xəta baş verdi' }
  }
}

export async function deleteProductAction(id: string) {
  try {
    await prisma.product.delete({
      where: { id }
    })

    // Revalidate cache
    revalidateTag(PRODUCTS_TAG)
    revalidatePath('/')
    revalidatePath('/products')

    return { success: true }
  } catch (error) {
    console.error('Product deletion error:', error)
    return { success: false, error: 'Məhsul silinərkən xəta baş verdi' }
  }
}

export async function createProductFromForm(formData: FormData) {
  try {
    const input: ProductInput = {
      title: formData.get('title') as string,
      categoryId: formData.get('categoryId') as string,
      description: formData.get('description') as string || undefined,
      imageUrl: formData.get('imageUrl') as string || undefined,
      volume: formData.get('volume') as string || undefined,
      packSize: formData.get('packSize') as string || undefined,
      featured: formData.get('featured') === 'on',
    }

    // Clean up empty strings to undefined
    if (input.description === '') input.description = undefined
    if (input.imageUrl === '') input.imageUrl = undefined
    if (input.volume === '') input.volume = undefined
    if (input.packSize === '') input.packSize = undefined

    const result = await createProductAction(input)
    
    if (result.success) {
      redirect('/admin/products')
    }
    throw new Error(result.error)
  } catch (error) {
    console.error('createProductFromForm error:', error)
    throw error
  }
}

export async function updateProductFromForm(id: string, formData: FormData) {
  const input: ProductInput = {
    title: formData.get('title') as string,
    categoryId: formData.get('categoryId') as string,
    description: formData.get('description') as string || undefined,
    imageUrl: formData.get('imageUrl') as string || undefined,
    volume: formData.get('volume') as string || undefined,
    packSize: formData.get('packSize') as string || undefined,
    featured: formData.get('featured') === 'on',
  }

  // Clean up empty strings to undefined
  if (input.description === '') input.description = undefined
  if (input.imageUrl === '') input.imageUrl = undefined
  if (input.volume === '') input.volume = undefined
  if (input.packSize === '') input.packSize = undefined

  const result = await updateProductAction(id, input)
  if (result.success) {
    redirect('/admin/products')
  }
  throw new Error(result.error)
}