"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div>
        <button disabled aria-label="Loading theme controls" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-muted/50 text-muted-foreground/50">
          <Moon className="h-4 w-4" />
        </button>
      </div>
    )
  }

  const nextTheme = theme === "dark" ? "light" : "dark"
  const ToggleIcon = theme === "dark" ? Sun : Moon
  const toggleLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode"

  return (
    <div>
      <button
        type="button"
        onClick={() => setTheme(nextTheme)}
        aria-label={toggleLabel}
        title={toggleLabel}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-muted/40 text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        <ToggleIcon className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}
