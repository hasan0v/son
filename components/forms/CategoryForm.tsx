'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { categorySchema } from '@/lib/validators'
import { createCategoryAndRedirect, updateCategoryAndRedirect } from '@/actions/categories'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type CategoryFormData = z.infer<typeof categorySchema>

interface CategoryFormProps {
  initialData?: {
    id?: string
    name: string
    desc?: string | null
  }
  isLoading?: boolean
}

export default function CategoryForm({ initialData, isLoading = false }: CategoryFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name || '',
      desc: initialData?.desc || '',
    }
  })

  const handleFormSubmit = async (data: CategoryFormData) => {
    setError(null)
    setIsSubmitting(true)
    
    try {
      // Create FormData for server action
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('desc', data.desc || '')

      // Call the appropriate server action
      if (initialData?.id) {
        await updateCategoryAndRedirect(initialData.id, formData)
      } else {
        await createCategoryAndRedirect(formData)
      }

      // Redirect to categories list
      router.push('/admin/categories')
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
          {initialData?.id ? 'Kateqoriyanı Redaktə Et' : 'Yeni Kateqoriya'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">
              Kateqoriya Adı <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Məsələn: Qabyuyan Maye"
              {...register('name')}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="desc">Açıqlama</Label>
            <Textarea
              id="desc"
              placeholder="Kateqoriya haqqında qısa məlumat..."
              rows={3}
              {...register('desc')}
            />
            {errors.desc && (
              <p className="text-sm text-red-500">{errors.desc.message}</p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              type="submit" 
              disabled={isLoading || isSubmitting}
              className="bg-brand-primary hover:bg-brand-primary/90"
            >
              {isLoading || isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {initialData?.id ? 'Yenilənir...' : 'Yaradılır...'}
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