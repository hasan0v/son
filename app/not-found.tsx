import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <CardTitle>Səhifə Tapılmadı</CardTitle>
          <CardDescription>
            Axtardığınız səhifə mövcud deyil və ya köçürülüb.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Link href="/" className="flex-1">
              <Button className="w-full">
                Ana Səhifə
              </Button>
            </Link>
            <Link href="/products" className="flex-1">
              <Button variant="outline" className="w-full">
                Məhsullar
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}