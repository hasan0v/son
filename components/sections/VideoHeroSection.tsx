'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function VideoHeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Generate consistent particle positions that won't change between server and client
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: (i * 17.3) % 100, // Deterministic positioning based on index
      top: (i * 23.7) % 100,
      delay: (i * 0.2) % 4,
      duration: 3 + (i % 3)
    }))
  }, [])

  useEffect(() => {
    setIsMounted(true)
    // Preload video for better performance
    const video = document.createElement('video')
    video.src = '/bg.mp4'
    video.oncanplaythrough = () => setIsLoaded(true)
  }, [])

  return (
    <div className="relative h-screen min-h-[600px] max-h-[800px] w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onLoadedData={() => setIsLoaded(true)}
        >
          <source src="/bg.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="w-full h-full bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500"></div>
        </video>
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
      
      {/* Animated particles effect - Only render on client to avoid hydration mismatch */}
      {isMounted && (
        <div className="absolute inset-0 opacity-30">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            {/* Main Heading with Glass Effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="relative mb-6"
            >
              <div className="absolute inset-0 bg-white/10  rounded-2xl"></div>
              <h1 className="relative text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-headline-bold text-white mb-4 px-6 py-8">
                <span className="inline-block">SON</span>
                <br />
                <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-headline">
                  Təmizlik Məhsullarında
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-300 to-emerald-300 bg-clip-text text-transparent">
                  Güvənilir Brend
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg sm:text-xl lg:text-2xl font-body text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Qabyuyan Maye, Ağardıcı, Sabun və daha çox məhsul — 
              <span className="font-body-medium text-blue-200"> topdan satış üçün keyfiyyətli həllər</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 sm:gap-4 justify-center items-center px-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-full sm:w-auto"
              >
                <Link 
                  href="/products"
                  className="group relative bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-accent-semibold text-base sm:text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 overflow-hidden block text-center min-w-[200px]"
                >
                  <span className="relative z-10">Məhsulları Gör</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-full sm:w-auto"
              >
                <Link 
                  href="/#contact"
                  className="group relative border-2 border-white/70 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-accent-semibold text-base sm:text-lg backdrop-blur-sm bg-white/15 hover:bg-white/25 hover:border-white transition-all duration-300 block text-center min-w-[200px]"
                >
                  <span className="relative z-10">Əlaqə Saxla</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Scroll Indicator - Hidden on mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1 h-3 bg-white/70 rounded-full mt-2"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-emerald-500 flex items-center justify-center z-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full"
          />
        </div>
      )}
    </div>
  )
}