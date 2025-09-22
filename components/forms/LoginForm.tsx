'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/lib/validators'
import { loginAction } from '@/actions/auth'
import { z } from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    setError(null)
    
    startTransition(async () => {
      try {
        const formData = new FormData()
        formData.append('email', data.email)
        formData.append('password', data.password)
        
        await loginAction(formData)
        toast.success('Uğurla daxil oldunuz!')
      } catch (error) {
        console.error('Login error:', error)
        setError('E-poçt və ya şifrə yanlışdır')
        toast.error('Giriş uğursuz oldu')
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-brand-primary">SON Admin</CardTitle>
          <CardDescription>
            İdarə panelə daxil olmaq üçün hesab məlumatlarınızı daxil edin
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">E-poçt ünvanı</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@son.az"
                {...register('email')}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Şifrə</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full bg-brand-primary hover:bg-brand-primary/90"
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Giriş edilir...
                </div>
              ) : (
                'Daxil ol'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}