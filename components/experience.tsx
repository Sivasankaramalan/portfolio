"use client"

import Image from "next/image"
import { Briefcase, ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"

interface ExperienceItem {
  title: string
  company: string
  period: string
  logo: string
  description: string
}

const experiences: ExperienceItem[] = [
  {
    title: "Lead SDET | Native AI Engineering",
    company: "EPAM Systems",
    period: "Oct 2023 – Present",
    logo: "/logos/epam.png",
    description:
      "Leading unified automation strategy across mobile, web, and API layers while scaling global quality engineering practices and reliability tooling.",
  },
  {
    title: "Senior SDET | App Experience",
    company: "Navi Technologies",
    period: "Apr 2022 – Oct 2023",
    logo: "/logos/navi.png",
    description:
      "Owned mobile & chatbot automation strategy delivering near-complete E2E coverage and resilient quality signals through chaos and negative testing.",
  },
  {
    title: "Associate Tech Lead",
    company: "OkCredit",
    period: "Apr 2020 – Apr 2022",
    logo: "/logos/okcredit.png",
    description:
      "Founded and led SDET function, establishing full-stack automation and risk-based quality acceleration for a 1M+ user platform.",
  },
  {
    title: "Senior Software Engineer",
    company: "Rakuten Viki",
    period: "Nov 2019 – Apr 2020",
    logo: "/logos/rakuten-viki.png",
    description:
      "Managed cross‑platform automation for streaming apps (iOS, Android, OTT) optimizing release readiness and regression efficiency.",
  },
  {
    title: "Software Engineer",
    company: "Altisource",
    period: "Jun 2017 – Oct 2019",
    logo: "/logos/altisource.png",
    description:
      "Engineered scalable mobile automation and QA processes reducing leakage and enabling predictable delivery.",
  },
  {
    title: "Software Engineer",
    company: "AB Innovative",
    period: "May 2015 – May 2017",
    logo: "/logos/ab-innovative.webp",
    description:
      "Introduced automation to legacy B2B mobile systems to modernize QA maturity and reduce manual overhead.",
  },
]

export function Experience() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollBy = (direction: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    const amount = Math.min(360, el.clientWidth * 0.8)
    el.scrollBy({ left: direction * amount, behavior: "smooth" })
  }

  return (
    <section
      id="experience"
      className="reveal-section section-accent px-6 py-16 md:py-24 scroll-mt-32"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 md:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                <span className="text-gradient">Experience</span>
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-xl">
              A decade of building quality at scale, from startups to enterprises.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/70 text-foreground hover:border-primary/40 hover:bg-primary/10 transition-colors"
              aria-label="Scroll timeline left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/70 text-foreground hover:border-primary/40 hover:bg-primary/10 transition-colors"
              aria-label="Scroll timeline right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Horizontal timeline */}
        <div
          ref={scrollerRef}
          className="overflow-x-auto overflow-y-visible overscroll-x-contain scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [mask-image:linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)]"
        >
          <div className="relative min-w-max px-1 pt-2">
            {/* Axis line */}
            <div
              className="absolute left-0 right-0 top-[1.15rem] h-0.5 bg-gradient-to-r from-primary via-primary/50 to-primary/20"
              aria-hidden="true"
            />

            <ol className="relative flex list-none p-0 m-0 gap-0">
              {experiences.map((exp, index) => {
                const isCurrent = index === 0

                return (
                  <li
                    key={`${exp.company}-${exp.period}`}
                    className="relative flex w-[min(82vw,20rem)] shrink-0 flex-col px-3 first:pl-0 last:pr-6"
                  >
                    {/* Node on the axis */}
                    <div className="relative mb-6 flex shrink-0 justify-start pl-1">
                      <span
                        className={`
                          relative z-10 h-4 w-4 rounded-full border-[3px] border-background
                          ${isCurrent
                            ? "bg-primary shadow-[0_0_0_4px] shadow-primary/25"
                            : "bg-primary/55"
                          }
                        `}
                        aria-hidden="true"
                      />
                    </div>

                    <article
                      className={`
                        flex flex-1 flex-col rounded-2xl border p-5 transition-colors
                        ${isCurrent
                          ? "border-primary/35 bg-primary/[0.07]"
                          : "border-border/50 bg-card/75 hover:border-primary/25"
                        }
                      `}
                    >
                      <time
                        className={`
                          block text-xs font-semibold uppercase tracking-wide tabular-nums mb-3
                          ${isCurrent ? "text-primary" : "text-muted-foreground"}
                        `}
                      >
                        {exp.period}
                      </time>

                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-background/80 border border-border/50 flex items-center justify-center p-1.5 shrink-0">
                          <Image
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            width={32}
                            height={32}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base font-semibold leading-snug tracking-tight">
                            {exp.title}
                          </h3>
                          <p className="text-sm font-medium text-primary mt-0.5">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {exp.description}
                      </p>
                    </article>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
