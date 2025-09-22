'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInUpProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FadeInUp({ children, delay = 0, duration = 0.6, className }: FadeInUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.25, 0, 1] // Custom easing for smoother animation
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface SlideInProps {
  children: ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  delay?: number
  duration?: number
  className?: string
}

export function SlideIn({ children, direction = 'left', delay = 0, duration = 0.6, className }: SlideInProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: -60, y: 0 }
      case 'right': return { x: 60, y: 0 }
      case 'up': return { x: 0, y: -60 }
      case 'down': return { x: 0, y: 60 }
      default: return { x: -60, y: 0 }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...getInitialPosition() }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.25, 0, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface ScaleInProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function ScaleIn({ children, delay = 0, duration = 0.4, className }: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.25, 0, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface HoverScaleProps {
  children: ReactNode
  scale?: number
  className?: string
}

export function HoverScale({ children, scale = 1.05, className }: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: ReactNode
  staggerDelay?: number
  className?: string
}

export function StaggerContainer({ children, staggerDelay = 0.15, className }: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.25, 0, 1]
          }
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// New attractive animation components

interface FloatProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function Float({ children, delay = 0, className }: FloatProps) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ 
        y: [-5, 5, -5],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface PulseGlowProps {
  children: ReactNode
  className?: string
}

export function PulseGlow({ children, className }: PulseGlowProps) {
  return (
    <motion.div
      animate={{
        boxShadow: [
          "0 0 0 0 rgba(101, 163, 13, 0)",
          "0 0 0 10px rgba(101, 163, 13, 0.1)",
          "0 0 0 20px rgba(101, 163, 13, 0)",
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface RotateOnHoverProps {
  children: ReactNode
  degrees?: number
  className?: string
}

export function RotateOnHover({ children, degrees = 10, className }: RotateOnHoverProps) {
  return (
    <motion.div
      whileHover={{ rotate: degrees }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface WaveProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function Wave({ children, delay = 0, className }: WaveProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.6, 0.05, 0.01, 0.9]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface BounceInProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function BounceIn({ children, delay = 0, className }: BounceInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.68, -0.55, 0.265, 1.55], // Bounce easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface SlideUpFadeProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function SlideUpFade({ children, delay = 0, className }: SlideUpFadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.25, 0, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface ParallaxProps {
  children: ReactNode
  offset?: number
  className?: string
}

export function Parallax({ children, offset = 50, className }: ParallaxProps) {
  return (
    <motion.div
      initial={{ y: offset }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}