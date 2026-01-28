"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"
import { Briefcase } from "lucide-react"

interface ExperienceItem {
  title: string
  company: string
  period: string
  logo: string
  description: string
}

const experiences: ExperienceItem[] = [
  {
    title: "Lead QA Engineer",
    company: "EPAM Systems",
    period: "Oct 2023 – Present",
    logo: "/logos/epam.png",
    description:
      "Leading unified automation strategy across mobile, web, and API layers while scaling global quality engineering practices and reliability tooling.",
  },
  {
    title: "Senior SDET",
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
    title: "Software Test Engineer",
    company: "AB Innovative",
    period: "May 2015 – May 2017",
    logo: "/logos/ab-innovative.webp",
    description:
      "Introduced automation to legacy B2B mobile systems to modernize QA maturity and reduce manual overhead.",
  },
]

export function Experience() {
  return (
    <section id="experience" className="section-accent px-6 py-24 scroll-mt-32">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Experience
            </h2>
          </div>
          <p className="text-lg text-muted-foreground">
            A decade of building quality at scale—from startups to enterprises.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line - visible on larger screens */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />

          <div className="space-y-12 lg:space-y-0">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0
              
              return (
                <div
                  key={index}
                  className={`
                    relative lg:grid lg:grid-cols-2 lg:gap-8
                    ${index !== experiences.length - 1 ? 'lg:pb-16' : ''}
                  `}
                >
                  {/* Timeline dot - desktop */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-background z-10">
                    <div className="absolute inset-0 rounded-full bg-primary animate-pulse-glow" />
                  </div>

                  {/* Card */}
                  <div
                    className={`
                      ${isEven ? 'lg:col-start-1 lg:pr-12' : 'lg:col-start-2 lg:pl-12'}
                      ${!isEven ? 'lg:text-left' : 'lg:text-right'}
                    `}
                  >
                    <Card
                      className="card-glow p-6 md:p-8 bg-card/80 backdrop-blur border border-border/50 rounded-xl hover:border-primary/30 transition-all duration-300"
                    >
                      {/* Mobile timeline indicator */}
                      <div className="lg:hidden flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-primary ring-2 ring-primary/30" />
                        <span className="text-sm font-medium text-primary">{exp.period}</span>
                      </div>

                      <div className={`flex flex-col gap-4 ${!isEven ? '' : 'lg:items-end'}`}>
                        {/* Company logo and info */}
                        <div className={`flex items-center gap-3 ${!isEven ? '' : 'lg:flex-row-reverse'}`}>
                          {exp.logo && (
                            <div className="w-12 h-12 rounded-lg bg-background/80 border border-border/50 flex items-center justify-center p-2">
                              <Image
                                src={exp.logo}
                                alt={`${exp.company} logo`}
                                width={40}
                                height={40}
                                className="w-full h-full object-contain"
                                loading="lazy"
                              />
                            </div>
                          )}
                          <div className={`${!isEven ? '' : 'lg:text-right'}`}>
                            <h3 className="text-xl font-semibold">{exp.title}</h3>
                            <div className="text-sm font-medium text-primary">{exp.company}</div>
                          </div>
                        </div>

                        {/* Period - desktop only */}
                        <div className="hidden lg:block text-sm text-muted-foreground font-medium">
                          {exp.period}
                        </div>

                        {/* Description */}
                        <p className={`text-muted-foreground leading-relaxed ${!isEven ? '' : 'lg:text-right'}`}>
                          {exp.description}
                        </p>
                      </div>
                    </Card>
                  </div>

                  {/* Empty space for alternating layout */}
                  {isEven && <div className="hidden lg:block" />}
                  {!isEven && <div className="hidden lg:block lg:col-start-1 lg:row-start-1" />}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
