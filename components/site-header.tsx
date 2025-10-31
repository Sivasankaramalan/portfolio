"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet"
import { Menu, X, ArrowLeft, Sparkles } from "lucide-react"
import { useInPageNav } from "@/hooks/use-in-page-nav"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"

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
  // Unified accent; no per-section dynamic color now
  const pathname = usePathname()

  const headerRef = useRef<HTMLElement | null>(null)
  const [headerHeight, setHeaderHeight] = useState<number>(56)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // IntersectionObserver + persist last visited section (rootMargin adapts to header)
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
      const h = headerRef.current?.getBoundingClientRect().height || 56
      setHeaderHeight(Math.round(h))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(headerRef.current)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

  // Lock body scroll when menu open (mobile)
  useEffect(() => {
    if (menuOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = original }
    }
  }, [menuOpen])

  // NOTE: Relying on native anchor navigation + CSS scroll-mt-* on sections.
  // If offset issues persist, reintroduce minimal scroll adjustment.

  // Use extracted navigation hook for delegated in-page nav with focus management
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
        "fixed top-0 left-0 right-0 z-50 flex items-center px-4 transition-colors",
        "h-14 min-h-14", // stabilize height
        "bg-gradient-to-br from-purple-950/60 via-slate-900/70 to-pink-950/60 border-b border-purple-500/20 backdrop-blur"
      )}
      role="banner"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground rounded px-3 py-1"
      >
        Skip to content
      </a>


      {/* Mobile sheet controller & persistent header left cluster */}
      <div className="md:hidden mr-3 flex items-center gap-2">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <div className="relative w-12 h-12">
            {!menuOpen && (
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className="absolute inset-0 inline-flex items-center justify-center rounded-xl p-3.5 bg-primary text-primary-foreground shadow-sm hover:brightness-110 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition-all animate-in fade-in zoom-in"
                >
                  <Menu className="h-6 w-6 transition-transform duration-300" />
                </button>
              </SheetTrigger>
            )}
            {menuOpen && (
              <SheetClose asChild>
                <button
                  aria-label="Close menu"
                  className="absolute inset-0 inline-flex items-center justify-center rounded-xl p-3.5 bg-primary text-primary-foreground shadow-sm hover:brightness-110 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition-all animate-in fade-in rotate-in"
                >
                  <X className="h-6 w-6 transition-transform duration-300" />
                </button>
              </SheetClose>
            )}
          </div>
          <SheetContent
            side="left"
            showClose={false}
            offsetTop={headerHeight}
            className="p-0 flex inset-0 w-full max-w-none bg-primary text-primary-foreground data-[state=open]:animate-in data-[state=closed]:animate-out"
          >
            <div className="flex flex-col h-full w-full pt-4">
              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 pb-12">
                <ul className="space-y-2 pointer-events-auto">
                  {NAV_LINKS.map(link => {
                    const fragmentHash = `#${link.fragment}`
                    const href = pathname === '/' ? fragmentHash : `/${fragmentHash}`
                    
                    // For fragment-based links, only consider them active if we're on the home page
                    const isActive = pathname === '/' && active === fragmentHash
                    
                    return (
                      <li
                        key={link.fragment}
                        style={{ animationDelay: `${NAV_LINKS.findIndex(l=>l.fragment===link.fragment) * 50}ms` }}
                        className="opacity-0 animate-fadeSlide"
                      >
                        <SheetClose asChild>
                          {pathname === '/' ? (
                            <a
                              href={fragmentHash}
                              data-nav-fragment={link.fragment}
                              className={cn(
                                "flex w-full items-center justify-between rounded-md px-4 py-3 text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 tracking-tight",
                                isActive
                                  ? "bg-primary-foreground text-primary"
                                  : "bg-primary/25 hover:bg-primary/35 text-primary-foreground"
                              )}
                              aria-current={isActive ? 'page' : undefined}
                            >
                              <span>{link.label}</span>
                            </a>
                          ) : (
                            <Link
                              href={href}
                              className={cn(
                                "flex w-full items-center justify-between rounded-md px-4 py-3 text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 tracking-tight",
                                isActive
                                  ? "bg-primary-foreground text-primary"
                                  : "bg-primary/25 hover:bg-primary/35 text-primary-foreground"
                              )}
                              scroll={true}
                            >
                              <span>{link.label}</span>
                            </Link>
                          )}
                        </SheetClose>
                      </li>
                    )
                  })}
                </ul>
                
                {/* Separator with icon */}
                <div className="flex items-center justify-center my-4 mx-4">
                  <div className="flex-1 h-px bg-primary-foreground/20"></div>
                  <Sparkles className="w-3 h-3 text-primary-foreground/40 mx-3" />
                  <div className="flex-1 h-px bg-primary-foreground/20"></div>
                </div>
                
                {/* Back button for mobile playbook */}
                {pathname === '/playbook/mobile' && (
                  <ul className="space-y-2 pointer-events-auto mb-4">
                    <li className="opacity-0 animate-fadeSlide">
                      <SheetClose asChild>
                        <Link
                          href="/playbook"
                          className="flex w-full items-center gap-3 rounded-md px-4 py-3 text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 tracking-tight bg-primary/25 hover:bg-primary/35 text-primary-foreground"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back to Playbooks</span>
                        </Link>
                      </SheetClose>
                    </li>
                  </ul>
                )}
                
                {/* Separate Playbook Navigation */}
                <ul className="space-y-2 pointer-events-auto">
                  {SEPARATE_NAV_LINKS.map(link => {
                    const isActive = pathname.startsWith(link.route)
                    
                    return (
                      <li
                        key={link.fragment}
                        style={{ animationDelay: `${(NAV_LINKS.length + SEPARATE_NAV_LINKS.findIndex(l=>l.fragment===link.fragment)) * 50}ms` }}
                        className="opacity-0 animate-fadeSlide relative"
                      >
                        <SheetClose asChild>
                          <Link
                            href={link.route}
                            className={cn(
                              "flex w-full items-center justify-between rounded-md px-4 py-3 text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/50 tracking-tight",
                              isActive
                                ? "bg-primary-foreground text-primary"
                                : "bg-primary/25 hover:bg-primary/35 text-primary-foreground"
                            )}
                          >
                            <span className="flex items-center gap-2">
                              {link.label}
                              {/* NEW badge for Playbook in mobile */}
                              {link.fragment === 'playbook' && (
                                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full new-badge shadow-lg border border-orange-400/50">
                                  NEW
                                </span>
                              )}
                            </span>
                          </Link>
                        </SheetClose>
                      </li>
                    )
                  })}
                </ul>
              </nav>
              <div className="px-5 py-4 text-[11px] tracking-wide uppercase opacity-70">© {new Date().getFullYear()}</div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Mobile: top-right theme toggle */}
      <div className="md:hidden ml-auto flex items-center pr-2">
        <div aria-label="Theme selector" role="group" className="inline-flex">
          <span className="sr-only">Theme</span>
          <ThemeToggle />
        </div>
      </div>

      {/* Desktop: compact unified navigation */}
      <div className="hidden md:flex items-center mx-auto pr-2">
        <div className="flex items-center bg-slate-900/95 backdrop-blur-md border border-slate-700/50 shadow-md rounded-xl px-3 py-2 ring-1 ring-white/10">
          {/* Main Navigation - Group 1 */}
          <nav aria-label="Primary" className="flex">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map(link => {
                const fragmentHash = `#${link.fragment}`
                const href = pathname === '/' ? fragmentHash : `/${fragmentHash}`
                const isActive = pathname === '/' && active === fragmentHash
                
                return (
                  <li key={link.fragment} className="opacity-0 animate-fadeSlide" style={{ animationDelay: `${NAV_LINKS.findIndex(l=>l.fragment===link.fragment) * 40}ms` }}>
                    {pathname === '/' ? (
                      <a
                        href={fragmentHash}
                        data-nav-fragment={link.fragment}
                        className={cn(
                          "nav-link",
                          isActive ? "is-active" : ""
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className={cn(
                          "nav-link",
                          isActive ? "is-active" : ""
                        )}
                        scroll={true}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
          
          {/* Separator between Group 1 and Group 2 with icon */}
          <div className="flex items-center mx-4">
            <Sparkles className="w-3 h-3 nav-separator-icon nav-separator-sparkles" />
          </div>
          
          {/* Playbook Navigation - Group 2 */}
          <nav aria-label="Secondary" className="flex">
            <ul className="flex items-center gap-1">
              {SEPARATE_NAV_LINKS.map(link => {
                const isActive = pathname.startsWith(link.route)
                
                return (
                  <li key={link.fragment} className="opacity-0 animate-fadeSlide relative" style={{ animationDelay: `${(NAV_LINKS.length + SEPARATE_NAV_LINKS.findIndex(l=>l.fragment===link.fragment)) * 40}ms` }}>
                    <Link
                      href={link.route}
                      className={cn(
                        "nav-link",
                        isActive ? "is-active" : ""
                      )}
                    >
                      {link.label}
                    </Link>
                    {/* Compact NEW badge */}
                    {link.fragment === 'playbook' && (
                      <span className="absolute -top-1 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm animate-pulse">
                        NEW
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
          
          {/* Separator between Group 2 and Group 3 with icon */}
          <div className="flex items-center mx-4">
            <Sparkles className="w-3 h-3 nav-separator-icon nav-separator-sparkles" />
          </div>
          
          {/* Theme Toggle - Group 3 */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>

    </header>
  )
}
