import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b">
      <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Image 
            src="/logo.png" 
            alt="SON Logo" 
            width={70} 
            height={70} 
            style={{ width: '70px', height: 'auto' }}
            className="object-contain"
            priority
          />
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            href="/products" 
            className="font-body-medium text-gray-700 hover:text-brand-primary transition-colors"
          >
            Məhsullar
          </Link>
          <Link 
            href="/#contact" 
            className="font-body-medium text-gray-700 hover:text-brand-primary transition-colors"
          >
            Əlaqə
          </Link>
        </div>
      </nav>
    </div>
  )
}