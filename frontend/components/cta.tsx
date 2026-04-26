"use client"

import Link from "next/link"
import { Sparkles, ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 shadow-2xl sm:p-12 lg:p-16">
          {/* Background Effects */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-2xl" />
            {/* Grid Pattern */}
            <svg
              className="absolute inset-0 h-full w-full opacity-[0.03]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="grid"
                  width="32"
                  height="32"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M0 32V0h32"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>10.000+ ogrenci kullaniyor</span>
            </div>

            <h2 className="mb-4 text-balance text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Hemen Baslayin
            </h2>

            <p className="mx-auto mb-8 max-w-lg text-pretty text-base text-slate-300 sm:text-lg">
              Binlerce ogrenci StudyPod ile daha verimli calisiyor. Siz de
              aramiza katilin ve farki hissedin!
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 px-8 text-base font-semibold text-slate-900 shadow-xl shadow-cyan-500/25 transition-all hover:shadow-2xl hover:shadow-cyan-500/30 sm:w-auto"
              >
                Ucretsiz Hesap Olustur
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#pricing"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-600 px-8 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-slate-500 hover:bg-white/5 sm:w-auto"
              >
                Planlari Incele
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
