// Advanced Error Recovery System
'use client'

import React, { useEffect, useCallback, useState, useRef, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface ErrorInfo {
  id: string
  timestamp: number
  type: 'javascript' | 'network' | 'chunk' | 'component' | 'api' | 'hydration'
  message: string
  stack?: string
  url?: string
  lineNumber?: number
  columnNumber?: number
  userAgent: string
  pathname: string
  userId?: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  recovered: boolean
  recoveryAttempts: number
  recoveryStrategy?: string
}

interface RecoveryStrategy {
  name: string
  canRecover: (error: ErrorInfo) => boolean
  recover: (error: ErrorInfo) => Promise<boolean>
  priority: number
}

class ErrorRecoverySystem {
  private errors: ErrorInfo[] = []
  private strategies: RecoveryStrategy[] = []
  private maxRetries = 3
  private retryDelay = 1000
  private isRecovering = false

  constructor() {
    this.initializeStrategies()
    this.setupErrorHandlers()
  }

  private initializeStrategies() {
    // Strategy 1: Chunk Loading Recovery
    this.addStrategy({
      name: 'chunk-reload',
      priority: 1,
      canRecover: (error) => error.type === 'chunk' && error.recoveryAttempts < this.maxRetries,
      recover: async (error) => {
        try {
          // Force reload the chunk by clearing module cache
          if (typeof window !== 'undefined' && 'webpackChunkName' in error) {
            window.location.reload()
            return true
          }
          return false
        } catch {
          return false
        }
      }
    })

    // Strategy 2: Network Request Retry
    this.addStrategy({
      name: 'network-retry',
      priority: 2,
      canRecover: (error) => error.type === 'network' && error.recoveryAttempts < this.maxRetries,
      recover: async (error) => {
        if (!error.url) return false
        
        try {
          await new Promise(resolve => setTimeout(resolve, this.retryDelay * error.recoveryAttempts))
          const response = await fetch(error.url)
          return response.ok
        } catch {
          return false
        }
      }
    })

    // Strategy 3: Component Fallback
    this.addStrategy({
      name: 'component-fallback',
      priority: 3,
      canRecover: (error) => error.type === 'component',
      recover: async (error) => {
        // Trigger fallback UI by dispatching event
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('component-fallback', {
            detail: { error }
          }))
          return true
        }
        return false
      }
    })

    // Strategy 4: Hydration Recovery
    this.addStrategy({
      name: 'hydration-recovery',
      priority: 4,
      canRecover: (error) => error.type === 'hydration',
      recover: async (error) => {
        try {
          // Clear hydration errors and force re-render
          if (typeof window !== 'undefined') {
            // Remove hydration mismatch elements
            const elements = document.querySelectorAll('[data-hydration-error]')
            elements.forEach(el => el.remove())
            
            // Trigger re-hydration
            window.dispatchEvent(new CustomEvent('force-rehydrate'))
            return true
          }
          return false
        } catch {
          return false
        }
      }
    })

    // Strategy 5: API Error Recovery
    this.addStrategy({
      name: 'api-recovery',
      priority: 5,
      canRecover: (error) => error.type === 'api' && error.recoveryAttempts < this.maxRetries,
      recover: async (error) => {
        try {
          // Implement exponential backoff
          const delay = this.retryDelay * Math.pow(2, error.recoveryAttempts)
          await new Promise(resolve => setTimeout(resolve, delay))
          
          // Dispatch event to retry API call
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('api-retry', {
              detail: { error }
            }))
            return true
          }
          return false
        } catch {
          return false
        }
      }
    })

    // Strategy 6: Page Refresh (Last Resort)
    this.addStrategy({
      name: 'page-refresh',
      priority: 10,
      canRecover: (error) => error.severity === 'critical' && error.recoveryAttempts < 1,
      recover: async (error) => {
        if (typeof window !== 'undefined') {
          // Store error info before refresh
          sessionStorage.setItem('recovery-error', JSON.stringify(error))
          window.location.reload()
          return true
        }
        return false
      }
    })
  }

  private setupErrorHandlers() {
    if (typeof window === 'undefined') return

    // Global JavaScript Error Handler
    window.addEventListener('error', (event) => {
      this.captureError({
        type: 'javascript',
        message: event.message,
        stack: event.error?.stack,
        url: event.filename,
        lineNumber: event.lineno,
        columnNumber: event.colno,
        severity: this.getSeverity(event.error)
      })
    })

    // Unhandled Promise Rejection
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError({
        type: 'javascript',
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
        severity: 'high'
      })
    })

    // Chunk Loading Errors
    window.addEventListener('error', (event) => {
      if (event.target && 'src' in event.target && typeof event.target.src === 'string') {
        if (event.target.src.includes('chunk')) {
          this.captureError({
            type: 'chunk',
            message: 'Chunk loading failed',
            url: event.target.src,
            severity: 'medium'
          })
        }
      }
    }, true)
  }

  private getSeverity(error: any): ErrorInfo['severity'] {
    if (!error) return 'low'
    
    const message = error.message?.toLowerCase() || ''
    
    if (message.includes('network') || message.includes('fetch')) return 'medium'
    if (message.includes('chunk') || message.includes('module')) return 'medium'
    if (message.includes('hydration')) return 'high'
    if (message.includes('security') || message.includes('cors')) return 'critical'
    
    return 'low'
  }

  addStrategy(strategy: RecoveryStrategy) {
    this.strategies.push(strategy)
    this.strategies.sort((a, b) => a.priority - b.priority)
  }

  captureError(errorData: Partial<ErrorInfo>) {
    const error: ErrorInfo = {
      id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      pathname: typeof window !== 'undefined' ? window.location.pathname : '',
      recovered: false,
      recoveryAttempts: 0,
      severity: 'low',
      type: 'javascript',
      message: 'Unknown error',
      ...errorData
    }

    this.errors.push(error)

    // Keep only last 100 errors
    if (this.errors.length > 100) {
      this.errors.splice(0, this.errors.length - 100)
    }

    // Attempt recovery
    this.attemptRecovery(error)

    // Dispatch error event for monitoring
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('error-captured', {
        detail: { error }
      }))
    }

    return error.id
  }

  private async attemptRecovery(error: ErrorInfo) {
    if (this.isRecovering) return

    this.isRecovering = true

    try {
      for (const strategy of this.strategies) {
        if (strategy.canRecover(error)) {
          error.recoveryAttempts++
          error.recoveryStrategy = strategy.name

          const recovered = await strategy.recover(error)
          
          if (recovered) {
            error.recovered = true
            this.isRecovering = false
            
            // Dispatch recovery success event
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('error-recovered', {
                detail: { error, strategy: strategy.name }
              }))
            }
            return
          }
        }
      }

      // No strategy could recover the error
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('error-unrecoverable', {
          detail: { error }
        }))
      }
    } finally {
      this.isRecovering = false
    }
  }

  getErrors(): ErrorInfo[] {
    return [...this.errors]
  }

  getErrorStats() {
    const now = Date.now()
    const hourAgo = now - 60 * 60 * 1000

    const recentErrors = this.errors.filter(e => e.timestamp > hourAgo)
    
    return {
      total: this.errors.length,
      recent: recentErrors.length,
      recovered: this.errors.filter(e => e.recovered).length,
      byType: this.errors.reduce((acc, error) => {
        acc[error.type] = (acc[error.type] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      bySeverity: this.errors.reduce((acc, error) => {
        acc[error.severity] = (acc[error.severity] || 0) + 1
        return acc
      }, {} as Record<string, number>),
      recoveryRate: this.errors.length > 0 
        ? this.errors.filter(e => e.recovered).length / this.errors.length 
        : 0
    }
  }

  clearErrors() {
    this.errors = []
  }
}

// Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: any
  fallbackVisible: boolean
}

class ErrorBoundary extends React.Component<
  { children: ReactNode; fallback?: ReactNode; onError?: (error: Error, errorInfo: any) => void },
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false, fallbackVisible: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, fallbackVisible: true }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Capture error in recovery system
    if (typeof window !== 'undefined' && (window as any).errorRecoverySystem) {
      ;(window as any).errorRecoverySystem.captureError({
        type: 'component',
        message: error.message,
        stack: error.stack,
        severity: 'high'
      })
    }

    this.props.onError?.(error, errorInfo)

    // Listen for fallback events
    const handleFallback = () => {
      this.setState({ fallbackVisible: true })
    }

    window.addEventListener('component-fallback', handleFallback)

    // Auto-recovery attempt after 5 seconds
    setTimeout(() => {
      this.setState({ hasError: false, fallbackVisible: false })
    }, 5000)
  }

  render() {
    if (this.state.hasError && this.state.fallbackVisible) {
      return this.props.fallback || (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-red-800 font-semibold">Something went wrong</h3>
          <p className="text-red-600 text-sm mt-1">
            We're working to fix this issue. The page will automatically recover.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

// Singleton instance
let errorRecoverySystem: ErrorRecoverySystem | null = null

export function useErrorRecovery() {
  const [errors, setErrors] = useState<ErrorInfo[]>([])
  const [errorStats, setErrorStats] = useState<any>({})
  const [isRecovering, setIsRecovering] = useState(false)
  const router = useRouter()
  const intervalRef = useRef<NodeJS.Timeout>()

  const getSystem = useCallback(() => {
    if (!errorRecoverySystem && typeof window !== 'undefined') {
      errorRecoverySystem = new ErrorRecoverySystem()
      ;(window as any).errorRecoverySystem = errorRecoverySystem
    }
    return errorRecoverySystem
  }, [])

  const captureError = useCallback((errorData: Partial<ErrorInfo>) => {
    const system = getSystem()
    return system ? system.captureError(errorData) : null
  }, [getSystem])

  const clearErrors = useCallback(() => {
    const system = getSystem()
    if (system) {
      system.clearErrors()
      setErrors([])
      setErrorStats({})
    }
  }, [getSystem])

  useEffect(() => {
    const system = getSystem()
    if (!system) return

    // Error event listeners
    const handleErrorCaptured = () => {
      setErrors(system.getErrors())
      setErrorStats(system.getErrorStats())
    }

    const handleErrorRecovered = () => {
      setIsRecovering(false)
      setErrors(system.getErrors())
      setErrorStats(system.getErrorStats())
    }

    const handleErrorUnrecoverable = (event: CustomEvent) => {
      setIsRecovering(false)
      // Could show user notification here
      console.error('Unrecoverable error:', event.detail.error)
    }

    window.addEventListener('error-captured', handleErrorCaptured)
    window.addEventListener('error-recovered', handleErrorRecovered)
    window.addEventListener('error-unrecoverable', handleErrorUnrecoverable as EventListener)

    // Update stats periodically
    intervalRef.current = setInterval(() => {
      setErrors(system.getErrors())
      setErrorStats(system.getErrorStats())
    }, 5000)

    return () => {
      window.removeEventListener('error-captured', handleErrorCaptured)
      window.removeEventListener('error-recovered', handleErrorRecovered)
      window.removeEventListener('error-unrecoverable', handleErrorUnrecoverable as EventListener)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [getSystem])

  return {
    errors,
    errorStats,
    isRecovering,
    captureError,
    clearErrors
  }
}

export { ErrorBoundary, ErrorRecoverySystem }