import Link from 'next/link'
import LogoutButton from '@/components/admin/LogoutButton'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-12 min-h-screen">
        <aside className="col-span-12 md:col-span-3 lg:col-span-2 bg-white border-r border-gray-200">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div>
                <h1 className="font-bold text-lg text-gray-900">Admin</h1>
                <p className="text-xs text-gray-500">İdarə Paneli</p>
              </div>
            </div>
            <nav className="space-y-2">
              <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                Dashboard
              </Link>
              <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                Məhsullar
              </Link>
              <Link href="/admin/categories" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                Kateqoriyalar
              </Link>
              <Link href="/admin/messages" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                Mesajlar
              </Link>
            </nav>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <LogoutButton />
            </div>
          </div>
        </aside>
        <main className="col-span-12 md:col-span-9 lg:col-span-10">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}