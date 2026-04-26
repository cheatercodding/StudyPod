"use client"

import { Upload, Wand2, Lightbulb, ArrowDown } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: Upload,
    title: "Iceriginizi Yukleyin",
    description:
      "Notlarinizi yazin veya gorsel, PDF gibi dosyalarinizi surukleyip birakin. Coklu format destegi ile istediginiz icerigi ekleyin.",
    gradient: "from-cyan-500 to-cyan-400",
  },
  {
    step: "02",
    icon: Wand2,
    title: "AI Analiz Etsin",
    description:
      "Yapay zeka icerigizi analiz eder, ozetler ve anahtar noktalari cikarir. Otomatik etiketleme ile organizasyonu kolaylastirir.",
    gradient: "from-cyan-400 to-cyan-500",
  },
  {
    step: "03",
    icon: Lightbulb,
    title: "Akilli Ogren",
    description:
      "Ozetleri inceleyin, sorular sorun ve konulari derinlemesine anlayin. Quiz modlari ile ogrenmenizi pekistirin.",
    gradient: "from-cyan-500 to-cyan-400",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16 lg:mb-20">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Nasil Calisir
          </span>
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
            Uc Basit Adimda Baslayin
          </h2>
          <p className="text-base text-muted-foreground sm:text-lg">
            Dakikalar icinde calisma verimliliginizi artirmaya baslayin.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="absolute left-1/2 top-[60px] hidden h-0.5 w-[calc(66.666%-120px)] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/50 to-transparent lg:block" />

          <div className="grid gap-8 sm:gap-12 lg:grid-cols-3 lg:gap-8">
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Mobile Arrow */}
                {index < steps.length - 1 && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-primary lg:hidden">
                    <ArrowDown className="h-5 w-5" />
                  </div>
                )}

                <div className="flex flex-col items-center text-center">
                  {/* Step Number & Icon */}
                  <div className="relative mb-6">
                    <div
                      className={`flex h-[120px] w-[120px] items-center justify-center rounded-3xl bg-gradient-to-br ${step.gradient} shadow-xl shadow-cyan-500/20 dark:shadow-cyan-400/10`}
                    >
                      <step.icon className="h-12 w-12 text-slate-900" />
                    </div>
                    <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-card text-sm font-bold text-foreground shadow-lg">
                      {step.step}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 text-xl font-semibold text-foreground sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
