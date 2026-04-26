"use client"

import Link from "next/link"
import { ArrowRight, Brain, ImagePlus, FileText, Play, CheckCircle2 } from "lucide-react"

const highlights = [
  "Sinirsiz not olusturma",
  "AI destekli ozetleme",
  "Tum cihazlarda senkronizasyon",
]

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-8 sm:pb-24 sm:pt-12 lg:pb-32 lg:pt-16">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/8 blur-3xl dark:bg-cyan-400/5" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/4 translate-y-1/4 rounded-full bg-cyan-400/8 blur-3xl dark:bg-cyan-500/5" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium text-primary sm:mb-8">
            <Brain className="h-4 w-4" />
            <span>AI Destekli Ogrenme Platformu</span>
            <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground">
              Yeni
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
            Notlarinizi{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-cyan-500 to-cyan-400 bg-clip-text text-transparent">
                Akilli
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-3 bg-cyan-500/15 dark:bg-cyan-400/10" />
            </span>{" "}
            Hale Getirin
          </h1>

          {/* Description */}
          <p className="mx-auto mb-8 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg lg:text-xl">
            StudyPod ile notlarinizi alin, gorseller yukleyin ve yapay zeka
            destegi ile calisma verimliliginizi en ust seviyeye cikarin.
          </p>

          {/* Highlights */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 px-8 text-base font-semibold text-slate-900 shadow-xl shadow-cyan-500/25 transition-all hover:shadow-2xl hover:shadow-cyan-500/30 sm:w-auto"
            >
              Ucretsiz Basla
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#demo"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-8 text-base font-semibold text-foreground shadow-sm transition-all hover:bg-secondary hover:shadow-md sm:w-auto"
            >
              <Play className="h-4 w-4" />
              Demo Izle
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-2 sm:gap-6 lg:mt-24 lg:grid-cols-3">
          <FeatureCard
            icon={<FileText className="h-6 w-6" />}
            title="Akilli Not Alma"
            description="Zengin metin editoru ile notlarinizi kolayca olusturun ve duzenleyin."
          />
          <FeatureCard
            icon={<ImagePlus className="h-6 w-6" />}
            title="Gorsel Yukleme"
            description="Gorselleri surukleyip birakin veya kameradan direkt cekim yapin."
          />
          <FeatureCard
            icon={<Brain className="h-6 w-6" />}
            title="AI Analiz"
            description="Yapay zeka notlarinizi ozetlesin ve sorularinizi cevaplasin."
            className="sm:col-span-2 lg:col-span-1"
          />
        </div>
      </div>
    </section>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  className = "",
}: {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 sm:p-8 ${className}`}
    >
      {/* Hover Gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-cyan-500 group-hover:to-cyan-400 group-hover:text-slate-900 dark:bg-cyan-400/10 dark:text-cyan-400">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
        {description}
      </p>
    </div>
  )
}
