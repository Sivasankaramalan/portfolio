"use client"

import { useEffect } from 'react'

/**
 * BackgroundMotion updates CSS custom properties to create a subtle parallax drift
 * based on scroll position and pointer movement. Values are clamped and eased
 * to avoid jank. Intended to drive background-position in globals.css.
 */
export function BackgroundMotion() {
  useEffect(() => {
    let raf: number | null = null
    let targetScrollY = 0
    let currentX = 0
    let currentY = 0
    let pointerX = 0
    let pointerY = 0

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const onScroll = () => {
      targetScrollY = window.scrollY
      schedule()
    }

    const onPointerMove = (e: PointerEvent) => {
      const { innerWidth, innerHeight } = window
      pointerX = (e.clientX / innerWidth - 0.5) * 2 // -1 to 1
      pointerY = (e.clientY / innerHeight - 0.5) * 2
      schedule()
    }

    function schedule() {
      if (raf != null) return
      raf = requestAnimationFrame(update)
    }

    function update() {
      raf = null
      // Easing factors
      currentX = lerp(currentX, pointerX * 4, 0.06)
      currentY = lerp(currentY, (targetScrollY * 0.02) + pointerY * 3, 0.06)

      // Clamp to reasonable range (in % units for background-position offset)
      const xPct = Math.max(-6, Math.min(6, currentX))
      const yPct = Math.max(-8, Math.min(8, currentY))

      document.documentElement.style.setProperty('--bg-parallax-x', xPct + '%')
      document.documentElement.style.setProperty('--bg-parallax-y', yPct + '%')

      // Continue animating while movement is significant
      if (Math.abs(pointerX - currentX) > 0.01 || Math.abs(pointerY - currentY) > 0.01) {
        schedule()
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    schedule()

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return null
}
