'use client'

import { useTransition } from 'react'
import { logoutAction } from '@/actions/auth'
import { Button } from '@/components/ui/button'

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition()

  const handleLogout = () => {
    startTransition(async () => {
      try {
        const result = await logoutAction()
        if (result.success) {
          window.location.href = '/admin/login'
        }
      } catch (error) {
        console.error('Logout error:', error)
        // Force redirect even if there's an error
        window.location.href = '/admin/login'
      }
    })
  }

  return (
    <Button 
      onClick={handleLogout}
      disabled={isPending}
      variant="outline" 
      size="sm"
      className="w-full text-red-600 border-red-200 hover:bg-red-50"
    >
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
      </svg>
      {isPending ? 'Çıxış edilir...' : 'Çıxış'}
    </Button>
  )
}