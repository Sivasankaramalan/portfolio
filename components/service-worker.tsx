'use client'

import { useEffect } from 'react'

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return

    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        registration.update().catch(() => {})
      })
      .catch(() => {
        // SW optional — ignore registration failures in local/dev
      })
  }, [])

  return null
}
