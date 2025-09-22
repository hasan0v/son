import { prisma } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import DeleteProductButton from '@/components/admin/DeleteProductButton'

export const metadata = {
  title: 'SON Admin | Məhsullar',
  description: 'Məhsulları idarə edin',
}

async function getProducts() {
  return prisma.product.findMany({
    include: {
      category: true
    },
    orderBy: { createdAt: 'desc' }
  })
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Məhsullar</h1>
          <p className="text-gray-600">Məhsulları idarə edin</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="bg-brand-primary hover:bg-brand-primary/90">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Yeni Məhsul
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bütün Məhsullar</CardTitle>
          <CardDescription>
            Cəmi {products.length} məhsul
          </CardDescription>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📦</div>
              <p>Hələ məhsul əlavə edilməyib</p>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {product.imageUrl ? (
                      <Image 
                        src={product.imageUrl} 
                        alt={product.title} 
                        width={64} 
                        height={64} 
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        💼
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900">{product.title}</h3>
                      {product.featured && (
                        <Badge className="bg-brand-accent">
                          Seçilmiş
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-brand-primary">{product.category.name}</p>
                    {product.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-1">{product.description}</p>
                    )}
                    <div className="flex gap-2 mt-2">
                      {product.volume && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{product.volume}</span>
                      )}
                      {product.packSize && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{product.packSize}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link href={`/admin/products/${product.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Redaktə
                      </Button>
                    </Link>
                    <DeleteProductButton 
                      productId={product.id}
                      productTitle={product.title}
                      categoryName={product.category.name}
                      productDescription={product.description}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}