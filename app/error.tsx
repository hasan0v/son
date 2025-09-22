'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <CardTitle className="text-red-600">Xəta Baş Verdi</CardTitle>
          <CardDescription>
            Təəssüf ki, bir xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-red-50 border border-red-200 rounded p-3">
              <p className="text-sm text-red-700 font-mono">
                {error.message}
              </p>
            </div>
          )}
          
          <div className="flex gap-4">
            <Button onClick={reset} className="flex-1">
              Yenidən Cəhd Et
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
              className="flex-1"
            >
              Ana Səhifə
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}