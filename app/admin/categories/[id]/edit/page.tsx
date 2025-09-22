import { prisma } from '@/lib/db'
import CategoryForm from '@/components/forms/CategoryForm'
import { notFound } from 'next/navigation'

interface EditCategoryPageProps {
  params: {
    id: string
  }
}

async function getCategory(id: string) {
  const category = await prisma.category.findUnique({
    where: { id }
  })
  
  if (!category) {
    notFound()
  }
  
  return category
}

export async function generateMetadata({ params }: EditCategoryPageProps) {
  const { id } = await params
  const category = await getCategory(id)
  return {
    title: `SON Admin | ${category.name} - Redaktə`,
    description: `${category.name} kateqoriyasını redaktə edin`,
  }
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params
  const category = await getCategory(id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Kateqoriyanı Redaktə Et</h1>
        <p className="text-gray-600">{category.name} kateqoriyasını redaktə edin</p>
      </div>

      <CategoryForm initialData={category} />
    </div>
  )
}