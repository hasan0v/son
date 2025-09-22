import { cookies } from 'next/headers'

export const ADMIN_COOKIE = 'son_admin'

export async function setAdminCookie(token: string, maxAge = 60 * 60 * 24 * 7) {
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge
  })
}

export async function clearAdminCookie() {
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0
  })
}