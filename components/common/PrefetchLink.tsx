'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useRef, useCallback } from 'react'

interface PrefetchLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  prefetch?: boolean
  onMouseEnter?: () => void
}

export default function PrefetchLink({ 
  href, 
  children, 
  className, 
  prefetch = true,
  onMouseEnter,
  ...props 
}: PrefetchLinkProps) {
  const router = useRouter()
  const [prefetched, setPrefetched] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = useCallback(() => {
    if (onMouseEnter) {
      onMouseEnter()
    }

    if (prefetch && !prefetched) {
      // Prefetch after a small delay to avoid unnecessary prefetches
      timeoutRef.current = setTimeout(() => {
        router.prefetch(href)
        setPrefetched(true)
      }, 100)
    }
  }, [href, prefetch, prefetched, router, onMouseEnter])

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <Link
      href={href}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Link>
  )
}