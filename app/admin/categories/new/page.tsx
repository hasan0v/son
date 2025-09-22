import CategoryForm from '@/components/forms/CategoryForm'

export const metadata = {
  title: 'SON Admin | Yeni Kateqoriya',
  description: 'Yeni məhsul kateqoriyası əlavə edin',
}

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Yeni Kateqoriya</h1>
        <p className="text-gray-600">Yeni məhsul kateqoriyası əlavə edin</p>
      </div>

      <CategoryForm />
    </div>
  )
}