import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAdminJwt } from './lib/jwt'

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  // Protect admin routes except login
  if (path.startsWith('/admin') && !path.startsWith('/admin/login')) {
    const token = req.cookies.get('son_admin')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    try {
      await verifyAdminJwt(token)
    } catch {
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}