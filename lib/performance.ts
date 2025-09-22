/**
 * Performance monitoring utility for tracking Core Web Vitals
 * and other performance metrics
 */

import type { Metric } from 'web-vitals'

// Core Web Vitals measurement
export function getCLS(onPerfEntry?: (entry: Metric) => void) {
  if (typeof window !== 'undefined' && onPerfEntry) {
    import('web-vitals').then((webVitals) => {
      webVitals.onCLS(onPerfEntry)
    }).catch(() => {
      // Gracefully handle if web-vitals fails to load
    })
  }
}

export function getINP(onPerfEntry?: (entry: Metric) => void) {
  if (typeof window !== 'undefined' && onPerfEntry) {
    import('web-vitals').then((webVitals) => {
      // Use onINP instead of onFID (deprecated in web-vitals v4+)
      if ('onINP' in webVitals) {
        webVitals.onINP(onPerfEntry)
      }
    }).catch(() => {
      // Gracefully handle if web-vitals fails to load
    })
  }
}

export function getFCP(onPerfEntry?: (entry: Metric) => void) {
  if (typeof window !== 'undefined' && onPerfEntry) {
    import('web-vitals').then((webVitals) => {
      webVitals.onFCP(onPerfEntry)
    }).catch(() => {
      // Gracefully handle if web-vitals fails to load
    })
  }
}

export function getLCP(onPerfEntry?: (entry: Metric) => void) {
  if (typeof window !== 'undefined' && onPerfEntry) {
    import('web-vitals').then((webVitals) => {
      webVitals.onLCP(onPerfEntry)
    }).catch(() => {
      // Gracefully handle if web-vitals fails to load
    })
  }
}

export function getTTFB(onPerfEntry?: (entry: Metric) => void) {
  if (typeof window !== 'undefined' && onPerfEntry) {
    import('web-vitals').then((webVitals) => {
      webVitals.onTTFB(onPerfEntry)
    }).catch(() => {
      // Gracefully handle if web-vitals fails to load
    })
  }
}

// Performance monitoring function
export function reportWebVitals(metric: Metric) {
  // In production, you might want to send this to analytics
  if (process.env.NODE_ENV === 'development') {
    console.log(metric)
  }
  
  // Example: Send to analytics service
  // gtag('event', metric.name, {
  //   event_category: 'Web Vitals',
  //   event_label: metric.id,
  //   value: Math.round(metric.value),
  //   non_interaction: true,
  // })
}

// Initialize performance monitoring
export function initPerformanceMonitoring() {
  if (typeof window !== 'undefined') {
    getCLS(reportWebVitals)
    getINP(reportWebVitals) // Use INP instead of FID
    getFCP(reportWebVitals)
    getLCP(reportWebVitals)
    getTTFB(reportWebVitals)
  }
}

// Image loading optimization
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

// Resource preloading
export function preloadResource(href: string, as: string, type?: string) {
  if (typeof document !== 'undefined') {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = as
    if (type) link.type = type
    document.head.appendChild(link)
  }
}

// Lazy loading utility
export function isInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// Debounce utility for scroll events
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}