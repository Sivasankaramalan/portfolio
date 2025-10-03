"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const NAV_LINKS = [
  { fragment: "home", label: "Home" },
  { fragment: "about", label: "About" },
  { fragment: "experience", label: "Experience" },
  { fragment: "skills", label: "Skills" },
  { fragment: "projects", label: "Projects" },
  { fragment: "blog", label: "Blog" },
  { fragment: "contact", label: "Contact" },
]

export function SiteHeader() {
  const [active, setActive] = useState<string>("#home")
  const [scrolled, setScrolled] = useState(false)
  const [accentColor, setAccentColor] = useState<string>('var(--accent-home)')
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
  const sectionIds = NAV_LINKS.map(l => l.fragment)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`
            setActive(id)
            const accentMap: Record<string,string> = {
              '#home': 'var(--accent-home)',
              '#about': 'var(--accent-about)',
              '#experience': 'var(--accent-experience)',
              '#skills': 'var(--accent-skills)',
              '#projects': 'var(--accent-projects)',
              '#blog': 'var(--accent-blog)',
              '#contact': 'var(--accent-contact)'
            }
            setAccentColor(accentMap[id] || 'var(--primary)')
          }
        })
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.1, 0.25, 0.5] }
    )

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
  <header className={cn("fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-2 transition-all", scrolled ? "glass border-b" : "bg-transparent")}
      role="banner"
    >
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground rounded px-3 py-1">
        Skip to content
      </a>
      <nav aria-label="Primary" className="flex items-center gap-6">
        <ul
          className="flex gap-2 rounded-full glass-elevated px-4 py-2"
          style={{ ['--nav-accent' as any]: accentColor }}
        >
          {NAV_LINKS.map(link => {
            const fragmentHash = `#${link.fragment}`
            const href = pathname === '/' ? fragmentHash : `/${fragmentHash}`
            const isActive = active === fragmentHash
            return (
              <li key={link.fragment}>
                <Link
                  href={href}
                  className={cn(
                    "px-3 py-1 text-sm rounded-full transition-colors hover:text-primary nav-link focus-gradient outline-none",
                    isActive
                      ? "bg-primary text-primary-foreground ring-2 ring-offset-2 ring-offset-background ring-[color:var(--nav-accent)] is-active"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                  scroll={true}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
