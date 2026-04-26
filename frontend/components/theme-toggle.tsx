"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex h-9 items-center gap-1 rounded-lg border border-border bg-card p-1">
        <div className="h-7 w-7 rounded-md bg-muted animate-pulse" />
        <div className="h-7 w-7 rounded-md bg-muted/50" />
        <div className="h-7 w-7 rounded-md bg-muted/50" />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
      <button
        onClick={() => setTheme("light")}
        className={`flex h-7 w-7 items-center justify-center rounded-md transition-all duration-200 ${
          theme === "light"
            ? "bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
        }`}
        aria-label="Light mode"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`flex h-7 w-7 items-center justify-center rounded-md transition-all duration-200 ${
          theme === "dark"
            ? "bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
        }`}
        aria-label="Dark mode"
      >
        <Moon className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`flex h-7 w-7 items-center justify-center rounded-md transition-all duration-200 ${
          theme === "system"
            ? "bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
        }`}
        aria-label="System mode"
      >
        <Monitor className="h-4 w-4" />
      </button>
    </div>
  )
}
