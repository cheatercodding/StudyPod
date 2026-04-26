"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Sparkles, Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const navLinks = [
  { href: "#features", id: "features", label: "Özellikler" },
  { href: "#how-it-works", id: "how-it-works", label: "Nasıl Çalışır" },
  { href: "#app", id: "app", label: "Uygulama" },
  // { href: "#pricing", id: "pricing", label: "Fiyatlandırma" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = ""

      for (const link of navLinks) {
        const element = document.getElementById(link.id)

        if (!element) continue

        const rect = element.getBoundingClientRect()

        if (rect.top <= 120 && rect.bottom >= 120) {
          currentSection = link.id
          break
        }
      }

      setActiveSection(currentSection)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <img
            src="/StudyPodicon.png"
            alt="StudyPod logosu"
            className="h-10 w-10 rounded-xl shadow-lg shadow-cyan-500/20"
          />

          <span className="text-xl font-bold tracking-tight text-foreground">
            StudyPod
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative px-1 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}

              <span
                className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-cyan-400 transition-all duration-300 ${
                  activeSection === link.id
                    ? "w-full opacity-100"
                    : "w-0 opacity-0 group-hover:w-full group-hover:opacity-70"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Giriş Yap
          </Link>

          <Link
            href="#app"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 px-5 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/25 transition-all hover:shadow-xl hover:shadow-cyan-500/30"
          >
            <Sparkles className="h-4 w-4" />
            Başla
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-secondary"
            aria-label="Menüyü aç/kapat"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
              <Link
                href="/login"
                className="block rounded-lg px-4 py-3 text-center text-base font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Giriş Yap
              </Link>

              <Link
                href="#app"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 px-4 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-cyan-500/25"
              >
                <Sparkles className="h-4 w-4" />
                Başla
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}