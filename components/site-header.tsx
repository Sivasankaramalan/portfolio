"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet"
import { Menu, X, ArrowLeft, Zap } from "lucide-react"
import { useInPageNav } from "@/hooks/use-in-page-nav"

const NAV_LINKS = [
  { fragment: "home", label: "Home" },
  { fragment: "about", label: "About" },
  { fragment: "experience", label: "Experience" },
  { fragment: "skills", label: "Skills" },
  { fragment: "projects", label: "Projects" },
  { fragment: "blog", label: "Blog" },
  { fragment: "contact", label: "Contact" },
]

const SEPARATE_NAV_LINKS = [
  { fragment: "playbook", label: "Playbook", route: "/playbook" },
]

export function SiteHeader() {
  const [active, setActive] = useState<string>("#home")
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const headerRef = useRef<HTMLElement | null>(null)
  const [headerHeight, setHeaderHeight] = useState<number>(64)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem('last-section')
    if (stored) setActive(stored)
    const sectionIds = NAV_LINKS.map(l => l.fragment)
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const hash = '#' + entry.target.id
          setActive(hash)
          localStorage.setItem('last-section', hash)
        }
      })
    }, { rootMargin: `-${Math.max(10, headerHeight + 20)}px 0px -55% 0px`, threshold: [0.15, 0.5] })
    sectionIds.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [headerHeight])

  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!headerRef.current) return
    const measure = () => {
      const h = headerRef.current?.getBoundingClientRect().height || 64
      setHeaderHeight(Math.round(h))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(headerRef.current)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

  useEffect(() => {
    if (menuOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = original }
    }
  }, [menuOpen])

  useInPageNav({
    enabled: pathname === '/',
    headerHeight,
    onActivate: (hash) => setActive(hash),
    closeMenu: menuOpen ? () => setMenuOpen(false) : undefined,
    focus: true,
  })

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled 
          ? "py-2" 
          : "py-4"
      )}
      role="banner"
    >
      {/* Background blur layer */}
      <div 
        className={cn(
          "absolute inset-0 transition-all duration-500",
          scrolled 
            ? "bg-background/60 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5" 
            : "bg-transparent"
        )}
      />
      
      <div className="relative flex items-center justify-center max-w-7xl mx-auto px-4 md:px-6">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground rounded px-3 py-1"
        >
          Skip to content
        </a>

        {/* Logo - Left positioned on mobile */}
        <Link 
          href="/" 
          className="group relative flex items-center md:hidden absolute left-4"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
            {/* Logo box */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-primary/30 transition-all group-hover:scale-105">
              <span className="text-primary-foreground font-heading font-bold text-lg tracking-tight">SG</span>
            </div>
          </div>
        </Link>

        {/* Mobile menu button - right positioned */}
        <div className="md:hidden flex items-center gap-3 absolute right-4">
          <ThemeToggle />
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border/50 flex items-center justify-center hover:from-primary/20 hover:to-accent/20 transition-all"
              >
                {menuOpen ? (
                  <X className="h-5 w-5 text-foreground" />
                ) : (
                  <Menu className="h-5 w-5 text-foreground" />
                )}
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              showClose={false}
              className="w-full max-w-sm p-0 bg-gradient-to-b from-background via-background to-primary/5 border-l border-border/50"
            >
              <div className="flex flex-col h-full pt-6">
                {/* Mobile nav header */}
                <div className="px-6 pb-6 border-b border-border/30">
                  <div className="text-lg font-heading font-semibold">Navigation</div>
                  <div className="text-sm text-muted-foreground">Explore the site</div>
                </div>
                
                <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-6">
                  <ul className="space-y-1">
                    {NAV_LINKS.map((link, idx) => {
                      const fragmentHash = `#${link.fragment}`
                      const href = pathname === '/' ? fragmentHash : `/${fragmentHash}`
                      const isActive = pathname === '/' && active === fragmentHash
                      
                      return (
                        <li
                          key={link.fragment}
                          style={{ animationDelay: `${idx * 50}ms` }}
                          className="opacity-0 animate-fadeSlide"
                        >
                          <SheetClose asChild>
                            {pathname === '/' ? (
                              <a
                                href={fragmentHash}
                                data-nav-fragment={link.fragment}
                                className={cn(
                                  "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all",
                                  isActive
                                    ? "bg-gradient-to-r from-primary/15 to-accent/10 text-primary border border-primary/20 shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                                aria-current={isActive ? 'page' : undefined}
                              >
                                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                <span>{link.label}</span>
                              </a>
                            ) : (
                              <Link
                                href={href}
                                className={cn(
                                  "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all",
                                  isActive
                                    ? "bg-gradient-to-r from-primary/15 to-accent/10 text-primary border border-primary/20 shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                )}
                                scroll={true}
                              >
                                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                <span>{link.label}</span>
                              </Link>
                            )}
                          </SheetClose>
                        </li>
                      )
                    })}
                  </ul>
                  
                  {/* Separator */}
                  <div className="flex items-center gap-3 my-6 px-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    <Zap className="w-3 h-3 text-primary/50" />
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                  </div>
                  
                  {/* Playbook link */}
                  <ul className="space-y-1">
                    {SEPARATE_NAV_LINKS.map((link, idx) => {
                      const isActive = pathname.startsWith(link.route)
                      
                      return (
                        <li
                          key={link.fragment}
                          style={{ animationDelay: `${(NAV_LINKS.length + idx) * 50}ms` }}
                          className="opacity-0 animate-fadeSlide"
                        >
                          <SheetClose asChild>
                            <Link
                              href={link.route}
                              className={cn(
                                "flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all",
                                isActive
                                  ? "bg-gradient-to-r from-primary/15 to-accent/10 text-primary border border-primary/20 shadow-sm"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                              )}
                            >
                              <span className="flex items-center gap-3">
                                {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                                {link.label}
                              </span>
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-accent to-primary text-white shadow-sm">
                                NEW
                              </span>
                            </Link>
                          </SheetClose>
                        </li>
                      )
                    })}
                  </ul>
                  
                  {/* Back button for playbook mobile */}
                  {pathname === '/playbook/mobile' && (
                    <>
                      <div className="flex items-center gap-3 my-6 px-4">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                      </div>
                      <SheetClose asChild>
                        <Link
                          href="/playbook"
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back to Playbooks</span>
                        </Link>
                      </SheetClose>
                    </>
                  )}
                </nav>
                
                {/* Footer */}
                <div className="px-6 py-4 border-t border-border/30 text-xs text-muted-foreground">
                  © {new Date().getFullYear()} Sivasankaramalan
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop navigation - Centered */}
        <div className="hidden md:flex items-center gap-3">
          {/* Nav pill container with gradient border */}
          <div className="relative">
            {/* Gradient border effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 rounded-2xl opacity-60" />
            
            {/* Nav container */}
            <nav 
              aria-label="Primary" 
              className="relative flex items-center gap-1 px-3 py-2 rounded-2xl bg-background/80 backdrop-blur-sm"
            >
              {/* Logo inside nav */}
              <Link 
                href="/" 
                className="group relative flex items-center mr-2"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-lg blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
                  <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:shadow-primary/30 transition-all group-hover:scale-105">
                    <span className="text-primary-foreground font-heading font-bold text-sm tracking-tight">SG</span>
                  </div>
                </div>
              </Link>
              
              {/* Separator after logo */}
              <div className="w-px h-5 bg-gradient-to-b from-transparent via-border to-transparent mx-1" />
              
              {NAV_LINKS.map((link, idx) => {
                const fragmentHash = `#${link.fragment}`
                const href = pathname === '/' ? fragmentHash : `/${fragmentHash}`
                const isActive = pathname === '/' && active === fragmentHash
                
                return (
                  <div
                    key={link.fragment}
                    className="opacity-0 animate-fadeSlide"
                    style={{ animationDelay: `${idx * 40}ms` }}
                  >
                    {pathname === '/' ? (
                      <a
                        href={fragmentHash}
                        data-nav-fragment={link.fragment}
                        className={cn(
                          "relative px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-300",
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-primary/10 to-accent/15 rounded-xl border border-primary/20" />
                        )}
                        <div className="absolute inset-0 bg-muted/0 hover:bg-muted/50 rounded-xl transition-colors" />
                        <span className="relative">{link.label}</span>
                        {isActive && (
                          <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-lg shadow-primary/50" />
                        )}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className={cn(
                          "relative px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-300",
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                        scroll={true}
                      >
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-primary/10 to-accent/15 rounded-xl border border-primary/20" />
                        )}
                        <div className="absolute inset-0 bg-muted/0 hover:bg-muted/50 rounded-xl transition-colors" />
                        <span className="relative">{link.label}</span>
                        {isActive && (
                          <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-lg shadow-primary/50" />
                        )}
                      </Link>
                    )}
                  </div>
                )
              })}
              
              {/* Separator */}
              <div className="w-px h-5 bg-gradient-to-b from-transparent via-border to-transparent mx-1" />
              
              {/* Playbook link */}
              {SEPARATE_NAV_LINKS.map((link, idx) => {
                const isActive = pathname.startsWith(link.route)
                
                return (
                  <div
                    key={link.fragment}
                    className="opacity-0 animate-fadeSlide relative"
                    style={{ animationDelay: `${(NAV_LINKS.length + idx) * 40}ms` }}
                  >
                    <Link
                      href={link.route}
                      className={cn(
                        "relative px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-300",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {isActive && (
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-primary/10 to-accent/15 rounded-xl border border-primary/20" />
                      )}
                      <div className="absolute inset-0 bg-muted/0 hover:bg-muted/50 rounded-xl transition-colors" />
                      <span className="relative">{link.label}</span>
                      {isActive && (
                        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-lg shadow-primary/50" />
                      )}
                    </Link>
                    <span className="absolute -top-2 -right-1 text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-gradient-to-r from-accent to-primary text-white shadow-md animate-pulse">
                      NEW
                    </span>
                  </div>
                )
              })}
              
              {/* Separator before theme toggle */}
              <div className="w-px h-5 bg-gradient-to-b from-transparent via-border to-transparent mx-1" />
              
              {/* Theme toggle inside nav */}
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
