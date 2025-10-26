'use client'

import { useEffect } from 'react'
import Script from 'next/script'

// Google Analytics configuration
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'

// Enhanced analytics events
export interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
}

// Google Analytics 4 integration
export function GoogleAnalytics() {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            send_page_view: false, // We'll handle page views manually
            cookie_flags: 'SameSite=None;Secure',
            allow_google_signals: true,
            allow_ad_personalization_signals: false
          });
        `}
      </Script>
    </>
  )
}

// Analytics utility functions
export const analytics = {
  // Page view tracking
  pageview: (url: string, title?: string) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as any).gtag
      gtag('config', GA_TRACKING_ID, {
        page_title: title,
        page_location: url,
      })
    }
  },

  // Custom event tracking
  event: ({ action, category, label, value, custom_parameters }: AnalyticsEvent) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      const gtag = (window as any).gtag
      gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        ...custom_parameters,
      })
    }
  },

  // User engagement tracking
  engagement: {
    // Scroll depth tracking
    scrollDepth: (percentage: number) => {
      analytics.event({
        action: 'scroll_depth',
        category: 'engagement',
        label: `${percentage}%`,
        value: percentage,
      })
    },

    // Time on page tracking
    timeOnPage: (seconds: number) => {
      analytics.event({
        action: 'time_on_page',
        category: 'engagement',
        value: seconds,
      })
    },

    // Section view tracking
    sectionView: (sectionName: string) => {
      analytics.event({
        action: 'section_view',
        category: 'engagement',
        label: sectionName,
      })
    },

    // Interactive element clicks
    interactionClick: (elementType: string, elementName: string) => {
      analytics.event({
        action: 'interaction_click',
        category: 'engagement',
        label: `${elementType}: ${elementName}`,
      })
    },
  },

  // Playbook specific tracking
  playbook: {
    // Playbook page visits
    visit: (playbookType: string) => {
      analytics.event({
        action: 'playbook_visit',
        category: 'playbook',
        label: playbookType,
      })
    },

    // Section interactions
    sectionToggle: (playbookType: string, sectionName: string, action: 'expand' | 'collapse') => {
      analytics.event({
        action: 'section_toggle',
        category: 'playbook',
        label: `${playbookType}: ${sectionName}`,
        custom_parameters: { toggle_action: action },
      })
    },

    // Copy button clicks
    copyCode: (playbookType: string, codeType: string) => {
      analytics.event({
        action: 'copy_code',
        category: 'playbook',
        label: `${playbookType}: ${codeType}`,
      })
    },
  },

  // Performance tracking
  performance: {
    // Core Web Vitals
    webVital: (name: string, value: number, id: string) => {
      analytics.event({
        action: 'web_vital',
        category: 'performance',
        label: name,
        value: Math.round(value),
        custom_parameters: { metric_id: id },
      })
    },

    // Custom performance metrics
    customTiming: (name: string, value: number) => {
      analytics.event({
        action: 'custom_timing',
        category: 'performance',
        label: name,
        value: Math.round(value),
      })
    },
  },

  // User preferences
  preferences: {
    // Theme changes
    themeChange: (theme: string) => {
      analytics.event({
        action: 'theme_change',
        category: 'preferences',
        label: theme,
      })
    },

    // Feature usage
    featureUsage: (featureName: string) => {
      analytics.event({
        action: 'feature_usage',
        category: 'preferences',
        label: featureName,
      })
    },
  },
}

// Hook for tracking user behavior
export function useAnalytics() {
  useEffect(() => {
    // Track initial page load
    const startTime = performance.now()
    
    // Page visibility tracking
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const timeOnPage = Math.round((performance.now() - startTime) / 1000)
        analytics.engagement.timeOnPage(timeOnPage)
      }
    }

    // Scroll depth tracking
    let maxScrollDepth = 0
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100)
      
      if (scrollPercentage > maxScrollDepth) {
        maxScrollDepth = scrollPercentage
        
        // Track at specific milestones
        if (scrollPercentage >= 25 && maxScrollDepth < 25) {
          analytics.engagement.scrollDepth(25)
        } else if (scrollPercentage >= 50 && maxScrollDepth < 50) {
          analytics.engagement.scrollDepth(50)
        } else if (scrollPercentage >= 75 && maxScrollDepth < 75) {
          analytics.engagement.scrollDepth(75)
        } else if (scrollPercentage >= 90 && maxScrollDepth < 90) {
          analytics.engagement.scrollDepth(90)
        }
      }
    }

    // Section view tracking with Intersection Observer
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            analytics.engagement.sectionView(entry.target.id)
          }
        })
      },
      {
        threshold: 0.5, // Track when 50% of section is visible
        rootMargin: '-10% 0px -10% 0px',
      }
    )

    // Observe all sections
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => sectionObserver.observe(section))

    // Error tracking
    const handleError = (event: ErrorEvent) => {
      analytics.event({
        action: 'javascript_error',
        category: 'error',
        label: event.message,
        custom_parameters: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      })
    }

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('error', handleError)

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('error', handleError)
      sectionObserver.disconnect()
    }
  }, [])

  return analytics
}