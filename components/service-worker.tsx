'use client'

import { useEffect } from 'react'

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.workbox !== undefined
    ) {
      const wb = window.workbox
      
      // Register service worker
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
          
          // Optional: Force update of service worker
          wb.addEventListener('waiting', () => {
            // Prompt user to reload for updates
            if (confirm('New content is available. Reload to update?')) {
              wb.messageSkipWaiting()
              window.location.reload()
            }
          })
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    }
  }, [])

  return null
}

declare global {
  interface Window {
    workbox: any
  }
}