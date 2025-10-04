import { useEffect } from 'react'

interface UseInPageNavOptions {
  enabled?: boolean
  headerHeight: number
  onActivate?: (hash: string) => void
  closeMenu?: () => void
  focus?: boolean
}

// Provides delegated in-page navigation with smooth scroll + optional focus restore.
export function useInPageNav({ enabled = true, headerHeight, onActivate, closeMenu, focus = true }: UseInPageNavOptions) {
  useEffect(() => {
    if (!enabled) return
    const handler = (e: Event) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const anchor = target.closest('a[data-nav-fragment]') as HTMLAnchorElement | null
      if (!anchor) return
      const frag = anchor.getAttribute('data-nav-fragment')
      if (!frag) return
      e.preventDefault()
      const el = document.getElementById(frag)
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - headerHeight + 4
        window.scrollTo({ top: y, behavior: 'smooth' })
        history.replaceState(null, '', '#' + frag)
        // Focus management: prefer first heading inside section
        if (focus) {
          const heading = el.querySelector('h1, h2, h3, h4, h5, h6') as HTMLElement | null
          const focusTarget = heading || el
          const prevTabIndex = focusTarget.getAttribute('tabindex')
          if (!focusTarget.hasAttribute('tabindex')) {
            focusTarget.setAttribute('tabindex', '-1')
          }
          focusTarget.focus({ preventScroll: true })
          // Clean up tabindex if we added it
          if (prevTabIndex === null) {
            const timeout = setTimeout(() => {
              focusTarget.removeAttribute('tabindex')
            }, 1000)
            // store on element dataset if future cancellation needed
            ;(focusTarget as any)._tempTabindexTimeout = timeout
          }
        }
        onActivate?.('#' + frag)
      }
      closeMenu?.()
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [enabled, headerHeight, onActivate, closeMenu, focus])
}
