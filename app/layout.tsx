import type { Metadata } from "next";
import { Inter, Poppins, Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import { organizationSchema, localBusinessSchema, websiteSchema } from "@/lib/schema";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  weight: ["400", "500"],
  display: 'swap',
  preload: true,
});

const poppins = Poppins({ 
  subsets: ["latin"], 
  variable: "--font-poppins", 
  weight: ["600", "700"],
  display: 'swap',
  preload: true,
});

const nunito = Nunito({ 
  subsets: ["latin"], 
  variable: "--font-nunito", 
  weight: ["500", "600", "700"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "SON Təmizlik Məhsulları | Qabyuyan Maye, Ağardıcı, Təmizlik Vasitələri Gəncə",
  description: "Gəncədə keyfiyyətli təmizlik məhsulları - qabyuyan maye, ağardıcı, maye sabun, təmizlik vasitələri. SON keyfiyyəti ilə topdan və pərakəndə satış. Sürətli çatdırılma və ucuz qiymətlər.",
  keywords: "təmizlik məhsulları, qabyuyan maye, ağardıcı, maye sabun, təmizlik vasitələri, təmizlik, temizlik, temizlik vasiteleri, temizlik vasitələri, təmizlik kimyəvi məhsulları, gəncə təmizlik, son təmizlik, xlor, duru ağardıcı, toz ağardıcı, ev təmizlik məhsulları, professional təmizlik, ucuz təmizlik məhsulları, keyfiyyətli təmizlik",
  authors: [{ name: "SON Təmizlik Məhsulları" }],
  creator: "SON Təmizlik Məhsulları",
  publisher: "SON Təmizlik Məhsulları",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://son-temizlik.com'),
  openGraph: {
    type: 'website',
    locale: 'az_AZ',
    siteName: 'SON Təmizlik Məhsulları',
    title: 'SON - Təmizlik Məhsulları | Gəncə',
    description: 'Keyfiyyətli təmizlik məhsulları - qabyuyan maye, ağardıcı, təmizlik vasitələri. Gəncədə topdan və pərakəndə satış.',
    url: 'https://son-temizlik.com',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'SON Təmizlik Məhsulları Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SON Təmizlik Məhsulları | Gəncə',
    description: 'Keyfiyyətli təmizlik məhsulları - qabyuyan maye, ağardıcı, təmizlik vasitələri. Topdan və pərakəndə satış.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: 'https://son-temizlik.com',
  },
  category: 'Təmizlik Məhsulları',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/logo.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        
        {/* Preconnect for external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://api.emailjs.com" />
        
        {/* Optimize viewport for performance */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Theme and PWA */}
        <meta name="theme-color" content="#1e40af" />
        <meta name="color-scheme" content="light" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${nunito.variable} font-sans bg-white text-gray-900 antialiased`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
