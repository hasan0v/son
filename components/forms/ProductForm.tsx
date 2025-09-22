'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { productSchema } from '@/lib/validators'
import { createProductFromForm, updateProductFromForm } from '@/actions/products'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

type ProductFormData = z.infer<typeof productSchema>

interface Category {
  id: string
  name: string
}

interface ProductFormProps {
  categories: Category[]
  initialData?: {
    id?: string
    title: string
    categoryId: string
    description?: string | null
    imageUrl?: string | null
    volume?: string | null
    packSize?: string | null
    featured: boolean
  }
  isLoading?: boolean
}

export default function ProductForm({ categories, initialData, isLoading = false }: ProductFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imageUrl || null)
  const [isUploading, setIsUploading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: initialData?.title || '',
      categoryId: initialData?.categoryId || '',
      description: initialData?.description || '',
      imageUrl: initialData?.imageUrl || '',
      volume: initialData?.volume || '',
      packSize: initialData?.packSize || '',
      featured: initialData?.featured || false,
    }
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', imageFile)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Şəkil yükləmə uğursuz oldu')
      }

      return data.url
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Şəkil yükləmə uğursuz oldu')
    } finally {
      setIsUploading(false)
    }
  }

  const handleFormSubmit = async (data: ProductFormData) => {
    setError(null)
    setIsSubmitting(true)
    
    try {
      let imageUrl = data.imageUrl

      // Upload new image if selected
      if (imageFile) {
        const uploadedUrl = await uploadImage()
        if (uploadedUrl) {
          imageUrl = uploadedUrl
        }
      }

      // Create FormData for server action
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('categoryId', data.categoryId)
      if (data.description) formData.append('description', data.description)
      if (imageUrl) formData.append('imageUrl', imageUrl)
      if (data.volume) formData.append('volume', data.volume)
      if (data.packSize) formData.append('packSize', data.packSize)
      if (data.featured) formData.append('featured', 'on')

      // Call the appropriate server action
      if (initialData?.id) {
        await updateProductFromForm(initialData.id, formData)
      } else {
        await createProductFromForm(formData)
      }

      // Redirect to products list
      router.push('/admin/products')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Xəta baş verdi')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {initialData?.id ? 'Məhsulu Redaktə Et' : 'Yeni Məhsul'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Məhsul Adı <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Məhsul adını yazın"
                {...register('title')}
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryId">
                Kateqoriya <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={watch('categoryId')} 
                onValueChange={(value) => setValue('categoryId', value)}
              >
                <SelectTrigger className={errors.categoryId ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Kateqoriya seçin" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.categoryId && (
                <p className="text-sm text-red-500">{errors.categoryId.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Açıqlama</Label>
            <Textarea
              id="description"
              placeholder="Məhsul haqqında ətraflı məlumat..."
              rows={4}
              {...register('description')}
            />
          </div>

          <div className="space-y-4">
            <Label>Məhsul Şəkli</Label>
            
            <div className="space-y-4">
              <Input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              
              <div className="text-center text-sm text-gray-500">və ya</div>
              
              <Input
                placeholder="Şəkil URL-i daxil edin"
                {...register('imageUrl')}
                onChange={(e) => {
                  setValue('imageUrl', e.target.value)
                  if (e.target.value && !imageFile) {
                    setImagePreview(e.target.value)
                  }
                }}
              />
            </div>

            {imagePreview && (
              <div className="mt-4">
                <Label>Şəkil önizləməsi:</Label>
                <div className="mt-2 border rounded-lg p-4">
                  <Image 
                    src={imagePreview} 
                    alt="Önizləmə" 
                    width={200} 
                    height={200} 
                    className="rounded object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="volume">Həcm</Label>
              <Input
                id="volume"
                type="text"
                placeholder="Məsələn: 1L, 500ml"
                {...register('volume')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="packSize">Qutu Ölçüsü</Label>
              <Input
                id="packSize"
                type="text"
                placeholder="Məsələn: 12 ədəd/karton"
                {...register('packSize')}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={watch('featured')}
              onCheckedChange={(checked) => setValue('featured', !!checked)}
            />
            <Label htmlFor="featured">Ana səhifədə göstər (Seçilmiş məhsul)</Label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              type="submit" 
              disabled={isLoading || isUploading || isSubmitting}
              className="bg-brand-primary hover:bg-brand-primary/90"
            >
              {isLoading || isUploading || isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {isUploading ? 'Şəkil yüklənir...' : (initialData?.id ? 'Yenilənir...' : 'Yaradılır...')}
                </div>
              ) : (
                initialData?.id ? 'Yenilə' : 'Yarat'
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => window.history.back()}
            >
              Ləğv et
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}