import { Card } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"

interface EducationEntry {
  institution: string
  program: string
  period: string
  degree?: string
}

const education: EducationEntry[] = [
  {
    institution: "Indian Institute of Technology Madras (IITM)",
    program: "Product Engineering",
    period: "2022 – 2023",
  },
  {
    institution: "Anna University, Chennai",
    program: "Mechanical Engineering",
    period: "2011 – 2015",
    degree: "Bachelor of Engineering",
  },
]

export function Education() {
  return (
    <section
      id="education"
      className="reveal-section section-accent accent-amber px-6 py-16 md:py-20 bg-card scroll-mt-32"
      aria-labelledby="education-heading"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          id="education-heading"
          className="text-3xl md:text-4xl font-bold mb-8 tracking-tight"
        >
          Education
        </h2>

        <div className="grid gap-5 md:gap-6">
          {education.map((ed) => (
            <Card
              key={ed.institution}
              className="p-5 md:p-6 bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60 border hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>

                {/* All text shares one left edge — years included */}
                <div className="min-w-0 flex-1 space-y-1.5">
                  <h3 className="text-lg md:text-xl font-semibold leading-snug tracking-tight">
                    {ed.institution}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium leading-snug">
                    {ed.program}
                    {ed.degree ? (
                      <span className="text-primary/80"> · {ed.degree}</span>
                    ) : null}
                  </p>
                  <time className="block pt-1 text-sm font-medium text-primary tabular-nums">
                    {ed.period}
                  </time>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
