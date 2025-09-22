import { unstable_cache } from 'next/cache'

// Cache tags for invalidation
export const CACHE_TAGS = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  ADMIN: 'admin',
  CONTACT: 'contact',
} as const

// Legacy exports for backward compatibility
export const PRODUCTS_TAG = CACHE_TAGS.PRODUCTS
export const CATEGORIES_TAG = CACHE_TAGS.CATEGORIES

// Cache durations (in seconds)
export const CACHE_DURATIONS = {
  SHORT: 300,     // 5 minutes
  MEDIUM: 1800,   // 30 minutes
  LONG: 3600,     // 1 hour
  VERY_LONG: 86400, // 24 hours
} as const

// Memory cache for frequently accessed data
class MemoryCache {
  private cache = new Map<string, { data: unknown; expires: number }>()
  
  set(key: string, data: unknown, ttl = CACHE_DURATIONS.MEDIUM): void {
    const expires = Date.now() + (ttl * 1000)
    this.cache.set(key, { data, expires })
  }
  
  get(key: string): unknown | null {
    const entry = this.cache.get(key)
    if (!entry) return null
    
    if (Date.now() > entry.expires) {
      this.cache.delete(key)
      return null
    }
    
    return entry.data
  }
  
  del(key: string): void {
    this.cache.delete(key)
  }
  
  clear(): void {
    this.cache.clear()
  }
  
  size(): number {
    return this.cache.size
  }
}

export const memoryCache = new MemoryCache()

// Cached database query wrapper
export function createCachedQuery<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>,
  {
    keyPrefix,
    tags = [],
    revalidate = CACHE_DURATIONS.MEDIUM,
    useMemoryCache = true,
  }: {
    keyPrefix: string
    tags?: string[]
    revalidate?: number
    useMemoryCache?: boolean
  }
) {
  return async (...args: T): Promise<R> => {
    const cacheKey = `${keyPrefix}:${JSON.stringify(args)}`
    
    // Try memory cache first
    if (useMemoryCache) {
      const cached = memoryCache.get(cacheKey)
      if (cached) return cached as R
    }
    
    // Use Next.js cache
    const cachedFn = unstable_cache(
      fn,
      [cacheKey],
      {
        tags,
        revalidate,
      }
    )
    
    const result = await cachedFn(...args)
    
    // Store in memory cache
    if (useMemoryCache) {
      memoryCache.set(cacheKey, result, revalidate as typeof CACHE_DURATIONS.MEDIUM)
    }
    
    return result
  }
}

// API response cache
export function cacheApiResponse(data: unknown, maxAge = CACHE_DURATIONS.MEDIUM) {
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': `public, max-age=${maxAge}, s-maxage=${maxAge}`,
      'CDN-Cache-Control': `public, max-age=${maxAge}`,
      'Vercel-CDN-Cache-Control': `public, max-age=${maxAge}`,
    },
  })
}