'use server'

import { login } from '@/lib/auth'
import { clearAdminCookie } from '@/lib/cookies'

export async function loginAction(formData: FormData) {
  try {
    const email = String(formData.get('email') || '')
    const password = String(formData.get('password') || '')
    
    await login(email, password)
    return { success: true }
  } catch {
    return { success: false, error: 'Login failed' }
  }
}

export async function logoutAction() {
  await clearAdminCookie()
  return { success: true }
}