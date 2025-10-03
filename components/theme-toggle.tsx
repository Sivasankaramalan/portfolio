"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Laptop } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [systemPref, setSystemPref] = useState<'light' | 'dark'>('light')

  // Track system prefers-color-scheme manually (for immediate UI reflection when choosing System)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      const dark = 'matches' in e ? e.matches : (e as MediaQueryList).matches
      setSystemPref(dark ? 'dark' : 'light')
    }
    handler(mq)
    mq.addEventListener('change', handler as any)
    return () => mq.removeEventListener('change', handler as any)
  }, [])

  useEffect(() => setMounted(true), [])

  // Close on escape / outside click
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('[data-theme-dropdown-root]')) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('mousedown', onClick)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('mousedown', onClick)
    }
  }, [open])

  if (!mounted) {
    return (
      <Button size="sm" variant="ghost" aria-label="Theme loading" disabled className="opacity-50">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  const current = theme === 'system' ? (systemTheme || systemPref) : (resolvedTheme || theme)

  const icon = current === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />
  const labelMap: Record<string,string> = { light: 'Light', dark: 'Dark', system: 'System' }

  const choose = (mode: 'light' | 'dark' | 'system') => {
    setTheme(mode)
    setOpen(false)
  }

  return (
    <div className="relative" data-theme-dropdown-root>
      <Button
        size="sm"
        variant="ghost"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Toggle theme menu"
        onClick={() => setOpen(o => !o)}
        className={"relative gap-2 rounded-md border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
          (open ? "bg-primary text-primary-foreground border-primary" : "bg-secondary/90 text-foreground hover:bg-secondary border-border dark:bg-secondary/70 dark:hover:bg-secondary/60")}
      >
        {theme === 'system' ? <Laptop className="h-4 w-4" /> : icon}
        <span className="hidden lg:inline text-xs font-medium">{labelMap[theme || 'system']}</span>
      </Button>
      {open && (
        <div
          role="menu"
          aria-label="Theme options"
          className="absolute z-50 mt-2 w-44 rounded-lg border backdrop-blur-sm bg-background/90 dark:bg-background/85 shadow-lg focus:outline-none p-1 animate-in fade-in slide-in-from-top-2 ring-1 ring-border"
        >
          {(['light','dark','system'] as const).map(opt => {
            const active = theme === opt
            const resolved = opt === 'system' ? (systemTheme || systemPref) : opt
            const optIcon = opt === 'system' ? <Laptop className="h-4 w-4" /> : (resolved === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />)
            return (
              <button
                key={opt}
                role="menuitemradio"
                aria-checked={active}
                onClick={() => choose(opt)}
                className={
                  `flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background ${active ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'}`
                }
              >
                {optIcon}
                <span>{labelMap[opt]}</span>
                {opt === 'system' && <span className="ml-auto text-[10px] uppercase tracking-wide opacity-60">{systemPref}</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
