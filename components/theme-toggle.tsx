"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun, Laptop } from "lucide-react"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="flex gap-0.5 p-1 rounded-xl bg-muted/50 border border-border/50">
        <button disabled className="p-2 rounded-lg text-muted-foreground/50">
          <Sun className="h-4 w-4" />
        </button>
        <button disabled className="p-2 rounded-lg text-muted-foreground/50">
          <Moon className="h-4 w-4" />
        </button>
        <button disabled className="p-2 rounded-lg text-muted-foreground/50">
          <Laptop className="h-4 w-4" />
        </button>
      </div>
    )
  }

  const themeOptions = [
    { value: 'light', icon: Sun, label: 'Light mode' },
    { value: 'dark', icon: Moon, label: 'Dark mode' },
    { value: 'system', icon: Laptop, label: 'System mode' }
  ] as const

  return (
    <div 
      className="flex gap-0.5 p-1 rounded-xl bg-muted/50 border border-border/50" 
      role="radiogroup" 
      aria-label="Theme selection"
    >
      {themeOptions.map(({ value, icon: Icon, label }) => {
        const isActive = theme === value
        return (
          <button
            key={value}
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            onClick={() => setTheme(value)}
            className={cn(
              "p-2 rounded-lg transition-all duration-200 outline-none",
              isActive
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                : "text-muted-foreground hover:text-foreground hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary/50"
            )}
          >
            <Icon className="h-4 w-4" />
          </button>
        )
      })}
    </div>
  )
}
