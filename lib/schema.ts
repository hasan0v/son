// SEO Schema markup for structured data
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SON Təmizlik Məhsulları",
  "alternateName": ["SON", "SON Cleaning", "SON Temizlik"],
  "url": "https://son-temizlik.com",
  "logo": "https://son-temizlik.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "areaServed": "AZ",
    "availableLanguage": ["az", "Azerbaijani"]
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Zülfü Hacıyev 56",
    "addressLocality": "Gəncə",
    "addressCountry": "AZ"
  },
  "description": "Gəncədə keyfiyyətli təmizlik məhsulları - qabyuyan maye, ağardıcı, maye sabun, təmizlik vasitələri. Topdan və pərakəndə satış.",
  "founder": "Ə. Müseyib Azər",
  "foundingDate": "2020",
  "sameAs": [
    "https://son-temizlik.com"
  ]
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "SON Təmizlik Məhsulları",
  "image": "https://son-temizlik.com/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Zülfü Hacıyev 56",
    "addressLocality": "Gəncə",
    "addressRegion": "Gəncə",
    "addressCountry": "AZ"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.6828,
    "longitude": 46.3611
  },
  "url": "https://son-temizlik.com",
  "telephone": "+994",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday", 
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 40.6828,
      "longitude": 46.3611
    },
    "geoRadius": 50000
  }
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "SON Təmizlik Məhsulları",
  "alternateName": "SON Cleaning Products",
  "url": "https://son-temizlik.com",
  "description": "Azərbaycanda keyfiyyətli təmizlik məhsulları - qabyuyan maye, ağardıcı, təmizlik vasitələri",
  "inLanguage": "az-AZ",
  "potentialAction": [
    {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://son-temizlik.com/products?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  ]
}

export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
})

export const productSchema = (product: {
  name: string,
  description: string,
  image?: string,
  category: string,
  brand: string
}) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "brand": {
    "@type": "Brand",
    "name": product.brand
  },
  "category": product.category,
  "image": product.image,
  "manufacturer": {
    "@type": "Organization",
    "name": "SON Təmizlik Məhsulları"
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "AZN",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "SON Təmizlik Məhsulları"
    }
  }
})