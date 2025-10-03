"use client"

import { useEffect } from "react"

// Lightweight scroll listener to update a CSS variable for parallax/gradient shift.
export function ScrollGradient() {
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY || window.pageYOffset
          // Normalize scroll factor (adjust multiplier to taste)
          const factor = Math.min(1, y / 1500)
          // Parallax offsets for layers
            const pos1 = factor * 60 // accent gradient
          const pos2 = factor * 120 // base radial composite
          document.documentElement.style.setProperty("--bg-shift-1", `${pos1}deg`)
          document.documentElement.style.setProperty("--bg-shift-2", `${pos2}px`)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  return null
}
