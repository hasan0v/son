import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <div className="mb-4">
                <Image 
                  src="/logo.png" 
                  alt="SON Logo" 
                  width={80} 
                  height={80} 
                  style={{ width: '80px', height: 'auto' }}
                  className="object-contain"
                />
              </div>
              <p className="text-gray-600 font-medium mb-3">
                Təmizlik Məhsulları
              </p>
              <p className="text-gray-500 leading-relaxed">
                Keyfiyyətli məhsullar, etibarlı xidmət. 
                Peşəkar təmizlik həllərinin etibarlı tərəfdaşı.
              </p>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Əlaqə Məlumatları</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-gray-700 font-medium">Gəncə şəhəri</p>
                  <p className="text-gray-500">Zülfü Hacıyev 56</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500">VÖEN: 2306001922</p>
              </div>
              
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-gray-500">İstehsalçı: Ə. Müseyib Azər</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} SON Təmizlik Məhsulları. Bütün hüquqlar qorunur.
            </p>
            <p className="text-sm text-gray-400">
              Peşəkar təmizlik həlləri
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}