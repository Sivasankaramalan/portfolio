"use client"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface ExperienceItem {
  title: string
  company: string
  period: string
  logo: string
  description: string
}

// Technologies were previously captured but removed from UI per request.
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
  <section id="experience" className="reveal-section is-visible section-accent accent-blue px-6 md:px-10 lg:px-14 py-24 scroll-mt-32">
      <div className="max-w-6xl mx-auto">
  <h2 className="text-4xl md:text-5xl font-bold mb-14 tracking-tight">Experience</h2>
  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="p-8 flex flex-col hover:shadow-xl transition-shadow border bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60 rounded-xl"
            >
              <div className="flex flex-col gap-5 flex-1">
                <div className="space-y-1.5">
                  <h3 className="text-xl md:text-2xl font-semibold leading-snug line-clamp-2">{exp.title}</h3>
                  <div className="flex items-center gap-2.5">
                    {exp.logo && (
                      <Image
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        width={32}
                        height={32}
                        className="h-7 w-7 md:h-8 md:w-8 object-contain rounded-sm shadow-sm bg-background"
                        loading="lazy"
                      />
                    )}
                    <div className="text-sm uppercase tracking-wide text-primary font-semibold">
                      {exp.company}
                    </div>
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground font-medium">{exp.period}</div>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {exp.description}
                </p>
                {/* Achievements removed per request */}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
