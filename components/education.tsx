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
    period: "2022-01 – 2023-12",
  },
  {
    institution: "Anna University, Chennai",
    program: "Mechanical Engineering",
    period: "2011-06 – 2015-04",
    degree: "Bachelor of Engineering",
  },
]

export function Education() {
  return (
    <section
      id="education"
  className="reveal-section section-accent accent-amber px-6 py-20 bg-card scroll-mt-32"
      aria-labelledby="education-heading"
    >
      <div className="max-w-4xl mx-auto">
        <h2 id="education-heading" className="text-3xl md:text-4xl font-bold mb-8">
          Education
        </h2>
        <div className="grid gap-8">
          {education.map((ed, idx) => (
            <Card
              key={idx}
              className="p-6 flex flex-col md:flex-row md:items-start gap-5 bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60 border hover:shadow-lg transition-shadow"
            >
              <div className="shrink-0 p-3 rounded-md bg-primary/10 w-fit h-fit">
                <GraduationCap className="h-7 w-7 text-primary" />
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <h3 className="text-xl font-semibold leading-snug tracking-tight">
                    {ed.institution}
                  </h3>
                  <div className="text-sm text-muted-foreground font-medium">
                    {ed.program}
                    {ed.degree && <span className="ml-2 text-xs text-primary/80">({ed.degree})</span>}
                  </div>
                </div>
                <div className="text-xs uppercase tracking-wide text-primary font-semibold">
                  {ed.period}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
