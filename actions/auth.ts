'use server'

import { login } from '@/lib/auth'
import { clearAdminCookie } from '@/lib/cookies'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
  try {
    const email = String(formData.get('email') || '')
    const password = String(formData.get('password') || '')
    
    await login(email, password)
  } catch {
    throw new Error('Login failed')
  }
  
  redirect('/admin')
}

export async function logoutAction() {
  await clearAdminCookie()
  redirect('/admin/login')
}