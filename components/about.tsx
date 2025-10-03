"use client"
import { Card } from "@/components/ui/card"
import { Award, Target, TrendingUp, GraduationCap } from "lucide-react"

export function About() {
  return (
  <section id="about" className="reveal-section is-visible section-accent px-6 py-20 bg-card scroll-mt-32">
      <div className="max-w-4xl mx-auto">
  <h2 className="text-3xl md:text-4xl font-bold mb-8">About Me</h2>
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground mb-12">
          <p>
            I'm a Quality Engineering professional with a decade of experience ensuring mobile applications meet the
            highest standards of quality, performance, and reliability. My expertise lies in designing and implementing
            comprehensive mobile automation strategies that scale with product growth.
          </p>
          <p>
            Throughout my career, I've worked with cross-functional teams to establish quality processes, build
            automation frameworks from the ground up, and mentor engineers on testing best practices. I believe in
            shifting quality left and empowering teams to deliver with confidence.
          </p>
        </div>

  <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Philosophy</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Quality is not an afterthought—it's a continuous journey. I advocate for building quality into every
                stage of development.
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Achievements</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Reduced testing cycles by 70%, mentored 15+ engineers, and built frameworks used by teams across
                multiple organizations.
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Impact</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Delivered quality solutions for apps with 10M+ users, ensuring seamless experiences across iOS and
                Android platforms.
              </p>
            </div>
          </Card>
        </div>

        {/* Education Subsection moved below the philosophy/achievements/impact row */}
        <div className="mt-20 space-y-8" aria-labelledby="education-subheading">
          <h3 id="education-subheading" className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            Education
          </h3>
          <div className="space-y-6">
            <div className="p-4 rounded-lg border bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/50">
              <div className="flex flex-col gap-1">
                <div className="text-lg font-semibold leading-snug">Indian Institute of Technology Madras (IITM)</div>
                <div className="text-sm text-muted-foreground font-medium">EMBA - Product Engineering</div>
                <div className="text-xs uppercase tracking-wide text-primary font-semibold">Jan 2022 – Dec 2023</div>
              </div>
            </div>
            <div className="p-4 rounded-lg border bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/50">
              <div className="flex flex-col gap-1">
                <div className="text-lg font-semibold leading-snug">Anna University, Chennai</div>
                <div className="text-sm text-muted-foreground font-medium">Mechanical Engineering <span className="ml-1 text-primary/80">(Bachelor of Engineering)</span></div>
                <div className="text-xs uppercase tracking-wide text-primary font-semibold">Jun 2011 – Apr 2015</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
