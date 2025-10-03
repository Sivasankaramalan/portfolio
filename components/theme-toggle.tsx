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
      <div className="flex gap-1">
        <button disabled className="px-2 py-1 text-sm rounded-full transition-colors opacity-50">
          <Sun className="h-4 w-4" />
        </button>
        <button disabled className="px-2 py-1 text-sm rounded-full transition-colors opacity-50">
          <Moon className="h-4 w-4" />
        </button>
        <button disabled className="px-2 py-1 text-sm rounded-full transition-colors opacity-50">
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
    <div className="flex gap-1" role="radiogroup" aria-label="Theme selection">
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
              "px-2 py-1 text-sm rounded-full transition-colors hover:text-primary focus-gradient outline-none",
              isActive
                ? "bg-primary text-primary-foreground ring-2 ring-offset-2 ring-offset-background ring-primary"
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            <Icon className="h-4 w-4" />
          </button>
        )
      })}
    </div>
  )
}
