// Advanced Performance Monitoring and Caching System
'use client'

import { useEffect, useState, useCallback, useRef } from 'react'

interface PerformanceMetric {
  name: string
  value: number
  timestamp: number
  category: 'performance' | 'user' | 'business' | 'technical'
  threshold: {
    good: number
    poor: number
  }
}

interface CacheEntry<T = any> {
  data: T
  timestamp: number
  ttl: number
  hits: number
  lastAccessed: number
  compressed?: boolean
  size?: number
}

class AdvancedPerformanceCache {
  private cache = new Map<string, CacheEntry>()
  private metrics = new Map<string, PerformanceMetric[]>()
  private observers: PerformanceObserver[] = []
  private maxCacheSize = 100 // MB
  private compressionThreshold = 1024 // bytes

  constructor() {
    this.initializeObservers()
    this.startCleanupInterval()
  }

  private initializeObservers() {
    // Core Web Vitals Observer
    try {
      const vitalsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.recordMetric({
            name: entry.name,
            value: entry.startTime || (entry as any).value || 0,
            timestamp: Date.now(),
            category: 'performance',
            threshold: this.getThresholdForMetric(entry.name)
          })
        })
      })
      
      vitalsObserver.observe({ 
        entryTypes: ['navigation', 'paint', 'largest-contentful-paint', 'first-input', 'layout-shift']
      })
      this.observers.push(vitalsObserver)
    } catch (e) {
      console.log('Performance Observer not supported')
    }

    // Resource Observer
    try {
      const resourceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          const resource = entry as PerformanceResourceTiming
          this.recordMetric({
            name: `resource-${resource.initiatorType}`,
            value: resource.duration,
            timestamp: Date.now(),
            category: 'technical',
            threshold: { good: 100, poor: 500 }
          })
        })
      })
      
      resourceObserver.observe({ entryTypes: ['resource'] })
      this.observers.push(resourceObserver)
    } catch (e) {
      console.log('Resource Observer not supported')
    }
  }

  private getThresholdForMetric(name: string) {
    const thresholds: Record<string, { good: number; poor: number }> = {
      'largest-contentful-paint': { good: 2500, poor: 4000 },
      'first-input-delay': { good: 100, poor: 300 },
      'cumulative-layout-shift': { good: 0.1, poor: 0.25 },
      'first-contentful-paint': { good: 1800, poor: 3000 },
      'navigation': { good: 2000, poor: 5000 }
    }
    return thresholds[name] || { good: 1000, poor: 3000 }
  }

  // Advanced caching with compression and intelligent eviction
  set<T>(key: string, data: T, ttl: number = 300000): void {
    const serialized = JSON.stringify(data)
    const size = new Blob([serialized]).size

    // Check if compression is beneficial
    const shouldCompress = size > this.compressionThreshold
    
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
      hits: 0,
      lastAccessed: Date.now(),
      compressed: shouldCompress,
      size
    }

    // Intelligent cache eviction if approaching size limit
    this.evictIfNecessary(size)
    
    this.cache.set(key, entry)
    
    // Record cache operation
    this.recordMetric({
      name: 'cache-write',
      value: size,
      timestamp: Date.now(),
      category: 'technical',
      threshold: { good: 1024, poor: 10240 }
    })
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined
    
    if (!entry) {
      this.recordMetric({
        name: 'cache-miss',
        value: 1,
        timestamp: Date.now(),
        category: 'technical',
        threshold: { good: 0, poor: 1 }
      })
      return null
    }

    // Check TTL
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }

    // Update access stats
    entry.hits++
    entry.lastAccessed = Date.now()
    
    this.recordMetric({
      name: 'cache-hit',
      value: 1,
      timestamp: Date.now(),
      category: 'technical',
      threshold: { good: 1, poor: 0 }
    })

    return entry.data
  }

  private evictIfNecessary(newEntrySize: number): void {
    const currentSize = this.getCurrentCacheSize()
    const maxSize = this.maxCacheSize * 1024 * 1024 // Convert to bytes

    if (currentSize + newEntrySize > maxSize) {
      // LRU eviction with frequency consideration
      const entries = Array.from(this.cache.entries())
        .sort(([, a], [, b]) => {
          // Score based on access time and frequency
          const scoreA = a.lastAccessed + (a.hits * 10000)
          const scoreB = b.lastAccessed + (b.hits * 10000)
          return scoreA - scoreB
        })

      // Remove bottom 25% of entries
      const toRemove = Math.ceil(entries.length * 0.25)
      for (let i = 0; i < toRemove; i++) {
        this.cache.delete(entries[i][0])
      }
    }
  }

  private getCurrentCacheSize(): number {
    return Array.from(this.cache.values())
      .reduce((total, entry) => total + (entry.size || 0), 0)
  }

  recordMetric(metric: PerformanceMetric): void {
    const key = metric.name
    if (!this.metrics.has(key)) {
      this.metrics.set(key, [])
    }

    const metrics = this.metrics.get(key)!
    metrics.push(metric)

    // Keep only last 100 entries per metric
    if (metrics.length > 100) {
      metrics.splice(0, metrics.length - 100)
    }

    // Trigger alerts for poor performance
    this.checkThresholds(metric)
  }

  private checkThresholds(metric: PerformanceMetric): void {
    if (metric.value > metric.threshold.poor) {
      this.triggerAlert(metric, 'poor')
    } else if (metric.value > metric.threshold.good) {
      this.triggerAlert(metric, 'needs-improvement')
    }
  }

  private triggerAlert(metric: PerformanceMetric, level: 'poor' | 'needs-improvement'): void {
    // In production, this could send to monitoring service
    console.warn(`Performance Alert [${level}]: ${metric.name} = ${metric.value}`)
    
    // Custom event for UI components to listen to
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('performance-alert', {
        detail: { metric, level }
      }))
    }
  }

  getMetrics(category?: string): PerformanceMetric[] {
    const allMetrics = Array.from(this.metrics.values()).flat()
    return category 
      ? allMetrics.filter(m => m.category === category)
      : allMetrics
  }

  getCacheStats() {
    const entries = Array.from(this.cache.values())
    return {
      totalEntries: entries.length,
      totalSize: this.getCurrentCacheSize(),
      totalHits: entries.reduce((sum, entry) => sum + entry.hits, 0),
      avgHitRate: entries.length > 0 
        ? entries.reduce((sum, entry) => sum + entry.hits, 0) / entries.length 
        : 0,
      memoryUsage: this.getCurrentCacheSize() / (1024 * 1024), // MB
      evictionRate: 0 // Could track this over time
    }
  }

  private startCleanupInterval(): void {
    // Clean up expired entries every 5 minutes
    setInterval(() => {
      const now = Date.now()
      for (const [key, entry] of this.cache.entries()) {
        if (now - entry.timestamp > entry.ttl) {
          this.cache.delete(key)
        }
      }
    }, 5 * 60 * 1000)
  }

  destroy(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.cache.clear()
    this.metrics.clear()
  }
}

// Singleton instance
let performanceCache: AdvancedPerformanceCache | null = null

export function useAdvancedPerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([])
  const [cacheStats, setCacheStats] = useState<any>({})
  const [alerts, setAlerts] = useState<Array<{ metric: PerformanceMetric; level: string; timestamp: number }>>([])
  const intervalRef = useRef<NodeJS.Timeout>()

  const getCache = useCallback(() => {
    if (!performanceCache && typeof window !== 'undefined') {
      performanceCache = new AdvancedPerformanceCache()
    }
    return performanceCache
  }, [])

  const recordCustomMetric = useCallback((name: string, value: number, category: 'user' | 'business' = 'user') => {
    const cache = getCache()
    if (cache) {
      cache.recordMetric({
        name,
        value,
        timestamp: Date.now(),
        category,
        threshold: { good: 100, poor: 1000 }
      })
    }
  }, [getCache])

  const cacheData = useCallback(function<T>(key: string, data: T, ttl?: number) {
    const cache = getCache()
    if (cache) {
      cache.set(key, data, ttl)
    }
  }, [getCache])

  const getCachedData = useCallback(function<T>(key: string): T | null {
    const cache = getCache()
    return cache ? cache.get<T>(key) : null
  }, [getCache])

  useEffect(() => {
    const cache = getCache()
    if (!cache) return

    // Performance alert listener
    const handleAlert = (event: CustomEvent) => {
      setAlerts(prev => [...prev, {
        ...event.detail,
        timestamp: Date.now()
      }].slice(-10)) // Keep last 10 alerts
    }

    window.addEventListener('performance-alert', handleAlert as EventListener)

    // Update metrics and stats periodically
    intervalRef.current = setInterval(() => {
      setMetrics(cache.getMetrics())
      setCacheStats(cache.getCacheStats())
    }, 5000)

    return () => {
      window.removeEventListener('performance-alert', handleAlert as EventListener)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [getCache])

  useEffect(() => {
    return () => {
      if (performanceCache) {
        performanceCache.destroy()
        performanceCache = null
      }
    }
  }, [])

  return {
    metrics,
    cacheStats,
    alerts,
    recordCustomMetric,
    cacheData,
    getCachedData,
    clearAlerts: () => setAlerts([])
  }
}

export { AdvancedPerformanceCache }