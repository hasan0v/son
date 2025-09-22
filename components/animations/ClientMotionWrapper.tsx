'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ClientMotionWrapperProps {
  children: ReactNode
  className?: string
}

// Simple client wrapper for motion components to ensure they render on client
export function ClientMotionWrapper({ children, className }: ClientMotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Safe motion div that can be used anywhere
export function SafeMotionDiv({ 
  children, 
  className,
  ...motionProps 
}: { 
  children: ReactNode
  className?: string
} & Record<string, unknown>) {
  return (
    <motion.div
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}