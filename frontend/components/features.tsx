"use client"

import {
  Mic,
  Camera,
  Share2,
  Search,
  FolderTree,
  Cloud,
  Zap,
  Shield,
} from "lucide-react"

const features = [
  {
    icon: Mic,
    title: "Sesli Not",
    description: "Sesinizi metne donusturun ve notlariniza ekleyin.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 dark:bg-cyan-400/10",
  },
  {
    icon: Camera,
    title: "OCR Destegi",
    description: "Gorsellerden metin cikartin ve duzenlenebilir hale getirin.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 dark:bg-cyan-400/10",
  },
  {
    icon: Share2,
    title: "Kolay Paylasim",
    description: "Notlarinizi arkadaslarinizla tek tikla paylasin.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 dark:bg-cyan-400/10",
  },
  {
    icon: Search,
    title: "Akilli Arama",
    description: "Tum notlarinizda hizlica arama yapin ve bulun.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 dark:bg-cyan-400/10",
  },
  {
    icon: FolderTree,
    title: "Klasor Sistemi",
    description: "Notlarinizi kategorilere ayirarak organize edin.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 dark:bg-cyan-400/10",
  },
  {
    icon: Cloud,
    title: "Bulut Senkronizasyon",
    description: "Tum cihazlarinizda notlariniza erisin.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 dark:bg-cyan-400/10",
  },
  {
    icon: Zap,
    title: "Hizli Performans",
    description: "Aninda yuklenen ve cevap veren arayuz deneyimi.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 dark:bg-cyan-400/10",
  },
  {
    icon: Shield,
    title: "Guvenli Depolama",
    description: "Verileriniz sifrelenerek guvenle saklanir.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 dark:bg-cyan-400/10",
  },
]

export function Features() {
  return (
    <section
      id="features"
      className="relative border-t border-border bg-secondary/30 py-16 dark:bg-secondary/20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Ozellikler
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Tum Ihtiyaclariniz Tek Yerde
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            StudyPod, calisma rutininizi gelistirmek icin ihtiyaciniz olan tum
            araclari sunar.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 sm:p-6"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Icon */}
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg} ${feature.color} transition-transform duration-300 group-hover:scale-110`}
              >
                <feature.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>

              {/* Hover Glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/5 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
