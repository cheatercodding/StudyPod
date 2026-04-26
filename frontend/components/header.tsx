"use client"

import Link from "next/link"
import { useState } from "react"
import { BookOpen, Sparkles, Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

const navLinks = [
  { href: "#features", label: "Ozellikler" },
  { href: "#how-it-works", label: "Nasil Calisir" },
  { href: "#pricing", label: "Fiyatlandirma" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-400 shadow-lg shadow-cyan-500/25">
            <BookOpen className="h-5 w-5 text-slate-900" />
          </div>
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
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
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
            Giris Yap
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 px-5 text-sm font-semibold text-slate-900 shadow-lg shadow-cyan-500/25 transition-all hover:shadow-xl hover:shadow-cyan-500/30"
          >
            <Sparkles className="h-4 w-4" />
            Basla
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-secondary"
            aria-label="Toggle menu"
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
                Giris Yap
              </Link>
              <Link
                href="/signup"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 px-4 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-cyan-500/25"
              >
                <Sparkles className="h-4 w-4" />
                Ucretsiz Basla
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
