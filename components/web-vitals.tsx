'use client'

import { useEffect } from 'react'
import { analytics } from './analytics'

interface WebVitalsMetric {
  id: string
  name: string
  value: number
  delta: number
  entries: PerformanceEntry[]
  navigationType: string
}

export function WebVitals() {
  useEffect(() => {
    // Only run in production and in browser
    if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') {
      return
    }

    const sendToAnalytics = (metric: WebVitalsMetric) => {
      // Send to our analytics system
      analytics.performance.webVital(metric.name, metric.value, metric.id)
      
      // Log for development
      console.log('Web Vital:', metric)
    }

    // Dynamic import to avoid bundle size impact
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS(sendToAnalytics)
      onFCP(sendToAnalytics)
      onLCP(sendToAnalytics)
      onTTFB(sendToAnalytics)
      onINP(sendToAnalytics)
    }).catch((error) => {
      console.warn('Failed to load web-vitals:', error)
    })
  }, [])

  return null
}

// Hook for manual performance tracking
export function usePerformanceTracking() {
  const trackPageView = (pageName: string) => {
    if (typeof window === 'undefined') return
    
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      const duration = endTime - startTime
      
      analytics.performance.customTiming(`page_render_${pageName}`, duration)
      console.log(`Page ${pageName} rendered in ${duration.toFixed(2)}ms`)
    }
  }

  const trackUserInteraction = (action: string, element: string) => {
    analytics.engagement.interactionClick(action, element)
  }

  const trackFeatureUsage = (featureName: string) => {
    analytics.preferences.featureUsage(featureName)
  }

  return { 
    trackPageView, 
    trackUserInteraction, 
    trackFeatureUsage,
    analytics // Expose full analytics object
  }
}