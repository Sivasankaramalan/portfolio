"use client"
import { useEffect } from "react"

export function RevealOnScroll() {
  useEffect(() => {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal-fade, .reveal-stagger"))
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            // keep for now; removal of unobserve for repeat will happen in later step D
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return null
}
