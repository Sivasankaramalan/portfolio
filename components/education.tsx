"use client"

import Image from "next/image"
import { GraduationCap } from "lucide-react"

interface EducationEntry {
  institution: string
  program: string
  period: string
  degree?: string
  logo: string
}

const education: EducationEntry[] = [
  {
    institution: "Indian Institute of Technology Madras (IITM)",
    program: "Executive Master of Business Administration",
    period: "2022 – 2023",
    degree: "Product Engineering",
    logo: "/logos/iit-madras.webp",
  },
  {
    institution: "Anna University, Chennai",
    program: "Mechanical Engineering",
    period: "2011 – 2015",
    degree: "Bachelor of Engineering",
    logo: "/logos/anna-university.png",
  },
]

export function Education() {
  return (
    <section
      id="education"
      className="reveal-section section-accent px-6 py-16 md:py-24 bg-card/50 scroll-mt-32"
      aria-labelledby="education-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 md:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <h2
              id="education-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
            >
              <span className="text-gradient">Education</span>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Academic foundations in product engineering and mechanical engineering.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pt-2">
          {/* Axis line */}
          <div
            className="absolute left-0 right-0 top-[1.15rem] h-0.5 bg-gradient-to-r from-primary via-primary/50 to-primary/20"
            aria-hidden="true"
          />

          <ol className="relative grid grid-cols-1 md:grid-cols-2 gap-6 list-none p-0 m-0">
            {education.map((ed, index) => {
              const isCurrent = index === 0

              return (
                <li key={ed.institution} className="relative flex flex-col">
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
                      flex flex-1 flex-col rounded-2xl border p-6 md:p-8 transition-colors
                      ${isCurrent
                        ? "border-primary/35 bg-primary/[0.07]"
                        : "border-border/50 bg-card/75 hover:border-primary/25"
                      }
                    `}
                  >
                    <time
                      className={`
                        block text-xs font-semibold uppercase tracking-wide tabular-nums mb-4
                        ${isCurrent ? "text-primary" : "text-muted-foreground"}
                      `}
                    >
                      {ed.period}
                    </time>

                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-background/80 border border-border/50 flex items-center justify-center p-2.5 shrink-0">
                        <Image
                          src={ed.logo}
                          alt={`${ed.institution} logo`}
                          width={52}
                          height={52}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg md:text-xl font-semibold leading-snug tracking-tight">
                          {ed.institution}
                        </h3>
                        <p className="text-sm font-medium text-primary mt-1.5">
                          {ed.program}
                          {ed.degree ? (
                            <span className="text-muted-foreground"> · {ed.degree}</span>
                          ) : null}
                        </p>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
