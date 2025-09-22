import { prisma } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import DeleteCategoryButton from '@/components/admin/DeleteCategoryButton'

export const metadata = {
  title: 'SON Admin | Kateqoriyalar',
  description: 'Məhsul kateqoriyalarını idarə edin',
}

async function getCategories() {
  return prisma.category.findMany({
    include: {
      _count: {
        select: {
          products: true
        }
      }
    },
    orderBy: { name: 'asc' }
  })
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kateqoriyalar</h1>
          <p className="text-gray-600">Məhsul kateqoriyalarını idarə edin</p>
        </div>
        <Link href="/admin/categories/new">
          <Button className="bg-brand-primary hover:bg-brand-primary/90">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Yeni Kateqoriya
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bütün Kateqoriyalar</CardTitle>
          <CardDescription>
            Cəmi {categories.length} kateqoriya
          </CardDescription>
        </CardHeader>
        <CardContent>
          {categories.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">📂</div>
              <p>Hələ kateqoriya əlavə edilməyib</p>
            </div>
          ) : (
            <div className="space-y-4">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{category.name}</h3>
                    {category.desc && (
                      <p className="text-sm text-gray-600 mt-1">{category.desc}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {category._count.products} məhsul
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/categories/${category.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Redaktə
                      </Button>
                    </Link>
                    <DeleteCategoryButton 
                      categoryId={category.id}
                      categoryName={category.name}
                      categoryDescription={category.desc}
                      productCount={category._count.products}
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