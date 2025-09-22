import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SON Təmizlik Məhsulları',
    short_name: 'SON',
    description: 'SON — Qabyuyan Maye, Ağardıcı, Sabun və daha çoxunu topdan üzrə təqdim edir.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0EA5E9',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}