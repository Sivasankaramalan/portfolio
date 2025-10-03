"use client"
import { Award, Target, TrendingUp, GraduationCap } from "lucide-react"

export function About() {
  return (
    <section id="about" className="section-accent accent-blue px-6 py-20 scroll-mt-32">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">About Me</h2>
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground mb-12 max-w-3xl">
          <p>
            I'm a Quality Engineering professional with a decade of experience ensuring mobile applications meet the highest standards of quality, performance, and reliability. My focus: scalable automation, sustainable processes, measurable impact.
          </p>
          <p>
            I partner with cross-functional teams to shift quality left, build frameworks from the ground up, mentor engineers, and enable rapid, confident delivery. I believe in pragmatic automation and data-informed improvement loops.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-xl border bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60 text-center space-y-3">
            <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Philosophy</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Quality is a continuous discipline—integrated, observable, and owned collectively.</p>
          </div>
          <div className="p-6 rounded-xl border bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60 text-center space-y-3">
            <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Achievements</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">70% cycle reduction, 15+ engineers mentored, frameworks adopted org-wide.</p>
          </div>
          <div className="p-6 rounded-xl border bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60 text-center space-y-3">
            <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Impact</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Delivered quality at scale for apps with 10M+ users across iOS & Android.</p>
          </div>
        </div>

        <div className="space-y-8" aria-labelledby="education-subheading">
          <h3 id="education-subheading" className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" /> Education
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-5 rounded-lg border bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/50">
              <div className="flex flex-col gap-1">
                <div className="text-base font-semibold leading-snug">Indian Institute of Technology Madras (IITM)</div>
                <div className="text-sm text-muted-foreground font-medium">EMBA - Product Engineering</div>
                <div className="text-xs uppercase tracking-wide text-primary font-semibold">Jan 2022 – Dec 2023</div>
              </div>
            </div>
            <div className="p-5 rounded-lg border bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/50">
              <div className="flex flex-col gap-1">
                <div className="text-base font-semibold leading-snug">Anna University, Chennai</div>
                <div className="text-sm text-muted-foreground font-medium">Mechanical Engineering <span className="ml-1 text-primary/80">(B.E.)</span></div>
                <div className="text-xs uppercase tracking-wide text-primary font-semibold">Jun 2011 – Apr 2015</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
