'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Download, X } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if it's iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(iOS)

    // Check if already in standalone mode
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                      (window.navigator as any).standalone
    setIsStandalone(standalone)

    // Handle the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      
      // Show prompt after a delay (better UX)
      setTimeout(() => {
        if (!standalone) {
          setShowPrompt(true)
        }
      }, 3000)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    try {
      await deferredPrompt.prompt()
      const choiceResult = await deferredPrompt.userChoice
      
      if (choiceResult.outcome === 'accepted') {
        console.log('PWA installation accepted')
      }
      
      setDeferredPrompt(null)
      setShowPrompt(false)
    } catch (error) {
      console.error('PWA installation failed:', error)
    }
  }

  const dismissPrompt = () => {
    setShowPrompt(false)
    // Don't show again for this session
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('pwa-prompt-dismissed', 'true')
    }
  }

  // Don't show if already installed, dismissed, or iOS without proper conditions
  if (isStandalone || 
      (typeof window !== 'undefined' && window.sessionStorage && sessionStorage.getItem('pwa-prompt-dismissed')) || 
      !showPrompt || 
      (isIOS && !deferredPrompt)) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="bg-gradient-to-br from-purple-950/90 via-slate-900/90 to-pink-950/90 backdrop-blur-md border border-purple-500/20 rounded-lg p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-purple-100 mb-1">
              Install App
            </h3>
            <p className="text-xs text-purple-200/80 mb-3">
              {isIOS 
                ? 'Add to your home screen for quick access'
                : 'Install this app for a better experience'
              }
            </p>
            
            {isIOS ? (
              <p className="text-xs text-purple-300/60">
                Tap <span className="font-mono">⚡</span> Share → Add to Home Screen
              </p>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleInstallClick}
                  size="sm"
                  className="h-7 px-3 text-xs bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Install
                </Button>
                <Button
                  onClick={dismissPrompt}
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs text-purple-300 hover:text-purple-100"
                >
                  Later
                </Button>
              </div>
            )}
          </div>
          
          <button
            onClick={dismissPrompt}
            className="text-purple-400 hover:text-purple-200 transition-colors"
            aria-label="Dismiss install prompt"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Hook for PWA detection and utilities
export function usePWA() {
  const [isInstalled, setIsInstalled] = useState(false)
  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    // Check if already installed
    const installed = window.matchMedia('(display-mode: standalone)').matches || 
                      (window.navigator as any).standalone
    setIsInstalled(installed)

    // Check if installable
    const handleBeforeInstallPrompt = () => setIsInstallable(true)
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  return { isInstalled, isInstallable }
}