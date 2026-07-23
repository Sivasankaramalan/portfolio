"use client"

import { Badge } from "@/components/ui/badge"
import { Award, BadgeCheck, ExternalLink } from "lucide-react"

interface Certification {
  title: string
  issuer: string
  platform: "Credly" | "Microsoft Learn"
  focus: string
  href: string
  accent: "claude" | "github" | "gemini"
}

const certifications: Certification[] = [
  {
    title: "Claude Certified Architect",
    issuer: "Anthropic",
    platform: "Credly",
    focus: "Foundations",
    href: "https://www.credly.com/badges/6a66934b-a962-431f-a7fd-c64ca9256179",
    accent: "claude",
  },
  {
    title: "Claude Certified Developer",
    issuer: "Anthropic",
    platform: "Credly",
    focus: "Foundations",
    href: "https://www.credly.com/badges/74ab7907-b315-4a91-8759-f47c4f068569",
    accent: "claude",
  },
  {
    title: "GitHub Copilot",
    issuer: "GitHub / Microsoft",
    platform: "Microsoft Learn",
    focus: "AI-assisted development",
    href: "https://learn.microsoft.com/en-us/users/sivasankaramalan/credentials/9f2b9433ce3c091c",
    accent: "github",
  },
  {
    title: "Gemini Enterprise Agent Development",
    issuer: "Google",
    platform: "Credly",
    focus: "Partner Specialist",
    href: "https://www.credly.com/badges/af9bcd35-3f2e-4475-b704-68a522bb05d3",
    accent: "gemini",
  },
  {
    title: "Gemini Enterprise Deployment",
    issuer: "Google",
    platform: "Credly",
    focus: "Partner Specialist",
    href: "https://www.credly.com/badges/1e5b6b2d-c06b-44ae-8baa-b58ce5e69d42",
    accent: "gemini",
  },
]

const accentStyles: Record<Certification["accent"], string> = {
  claude:
    "from-[oklch(0.55_0.14_55)]/20 to-[oklch(0.62_0.16_40)]/10 border-[oklch(0.62_0.16_40)]/25",
  github:
    "from-[oklch(0.45_0.02_260)]/25 to-[oklch(0.55_0.08_250)]/10 border-border/50",
  gemini:
    "from-[oklch(0.62_0.16_250)]/20 to-[oklch(0.65_0.14_200)]/10 border-[oklch(0.62_0.16_250)]/25",
}

export function Certifications() {
  return (
    <section
      id="certifications"
      className="reveal-section section-accent px-6 py-16 md:py-24 scroll-mt-32"
      aria-labelledby="certifications-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <div className="flex items-start gap-3">
            <div className="mt-1 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <div className="min-w-0 space-y-3">
              <h2
                id="certifications-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
              >
                AI <span className="text-gradient">Certifications</span>
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-pretty md:max-w-none max-w-xl">
                Verified credentials across Claude, GitHub Copilot, and Gemini Enterprise — the AI tools and systems I use every day.
              </p>
            </div>
          </div>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none p-0 m-0">
          {certifications.map((cert) => (
            <li key={cert.href}>
              <a
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  group relative flex h-full flex-col gap-4 rounded-2xl border p-6
                  bg-gradient-to-br backdrop-blur transition-all duration-300
                  hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                  focus-visible:ring-offset-2 focus-visible:ring-offset-background
                  ${accentStyles[cert.accent]}
                `}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="w-11 h-11 rounded-xl bg-background/60 border border-border/40 flex items-center justify-center shrink-0">
                    <BadgeCheck className="w-5 h-5 text-primary" />
                  </div>
                  <ExternalLink
                    className="w-4 h-4 text-muted-foreground opacity-60 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </div>

                <div className="space-y-2 flex-1">
                  <h3 className="text-lg font-semibold leading-snug tracking-tight group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{cert.focus}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <Badge
                    variant="secondary"
                    className="text-xs font-medium bg-background/50 border border-border/40"
                  >
                    {cert.issuer}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{cert.platform}</span>
                </div>

                <span className="sr-only">View credential (opens in new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
