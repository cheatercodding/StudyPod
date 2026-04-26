"use client"

import Link from "next/link"
import { Check, Sparkles } from "lucide-react"

const plans = [
  {
    name: "Ucretsiz",
    price: "0",
    period: "sonsuza kadar",
    description: "Baslangic icin mukemmel",
    features: [
      "50 not limiti",
      "10 gorsel yukleme",
      "Temel AI ozellikleri",
      "1 GB depolama",
      "Web erisimi",
    ],
    cta: "Ucretsiz Basla",
    href: "/signup",
    popular: false,
  },
  {
    name: "Pro",
    price: "49",
    period: "ay",
    description: "Ciddi ogrenciler icin",
    features: [
      "Sinirsiz not",
      "Sinirsiz gorsel",
      "Gelismis AI ozellikleri",
      "50 GB depolama",
      "Oncelikli destek",
      "Takim paylasimi",
      "Mobil uygulama",
      "Offline erisim",
    ],
    cta: "Pro ile Basla",
    href: "/signup?plan=pro",
    popular: true,
  },
  {
    name: "Takim",
    price: "99",
    period: "ay",
    description: "Gruplar ve kurumlar icin",
    features: [
      "Pro planindaki her sey",
      "Sinirsiz takim uyesi",
      "Yonetim paneli",
      "API erisimi",
      "Ozel entegrasyonlar",
      "7/24 oncelikli destek",
      "SSO giris",
      "Analitik raporlar",
    ],
    cta: "Iletisime Gec",
    href: "/contact",
    popular: false,
  },
]

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative border-t border-border bg-secondary/30 py-16 dark:bg-secondary/20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Fiyatlandirma
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Basit ve Seffaf Fiyatlandirma
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            Ihtiyaclariniza uygun plani secin. Istediginiz zaman iptal edin.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-5xl gap-6 sm:gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 sm:p-8 ${
                plan.popular
                  ? "border-cyan-500/50 bg-card shadow-xl shadow-cyan-500/10 dark:border-cyan-400/40 dark:shadow-cyan-400/5"
                  : "border-border bg-card hover:border-primary/30 hover:shadow-lg"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -right-12 top-6 rotate-45 bg-gradient-to-r from-cyan-500 to-cyan-400 px-12 py-1 text-xs font-semibold text-slate-900">
                  Populer
                </div>
              )}

              {/* Plan Info */}
              <div className="mb-6">
                <h3 className="mb-1 text-xl font-semibold text-foreground">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground sm:text-5xl">
                    {plan.price}
                  </span>
                  <span className="text-xl font-medium text-foreground">TL</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  /{plan.period}
                </span>
              </div>

              {/* Features */}
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 dark:bg-cyan-400/10">
                      <Check className="h-3 w-3 text-cyan-500 dark:text-cyan-400" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href={plan.href}
                className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl text-base font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30"
                    : "border border-border bg-card text-foreground hover:bg-secondary hover:shadow-sm"
                }`}
              >
                {plan.popular && <Sparkles className="h-4 w-4" />}
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <p className="mt-8 text-center text-sm text-muted-foreground sm:mt-12">
          14 gunluk ucretsiz deneme. Kredi karti gerektirmez.
        </p>
      </div>
    </section>
  )
}
