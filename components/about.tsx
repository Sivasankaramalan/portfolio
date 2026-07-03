"use client"

import { Cpu, Layers, Settings2, Users, GraduationCap, Sparkles } from "lucide-react"

const highlights = [
  {
    icon: Cpu,
    title: "Product Engineering",
    description: "Building products from 0 to 1, owning the full lifecycle from ideation to production with a quality-first mindset."
  },
  {
    icon: Sparkles,
    title: "AI Native Engineer",
    description: "Using AI as a native engineering layer: Cursor, Copilot, Claude, and custom agents to accelerate development without shortcuts."
  },
  {
    icon: Layers,
    title: "Systems Ownership",
    description: "End-to-end ownership of systems, from architecture to observability, ensuring reliability at scale."
  },
  {
    icon: Users,
    title: "Program Leadership",
    description: "Leading cross-functional teams, driving quality culture, and mentoring engineers into quality champions."
  }
]

export function About() {
  return (
    <section id="about" className="section-accent px-6 py-10 md:min-h-[calc(100vh-72px)] md:flex md:flex-col md:justify-center scroll-mt-32">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            Building Products{" "}
            <span className="text-gradient">at Scale</span>
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            Over a decade specializing in mobile engineering across iOS, Android, and cross-platform stacks, architecting automation frameworks that scale with products and teams.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground mt-4">
            AI is now central to how I work: Cursor, Claude, Copilot, and custom MCP agents built into the engineering workflow, not bolted on. At EPAM Systems I lead mobile quality strategy across global teams, keeping reliability high without slowing release velocity.
          </p>
        </div>

        {/* Highlight cards — 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
          {highlights.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="card-glow p-4 md:p-6 rounded-xl bg-card/80 backdrop-blur border border-border/50 flex items-start gap-3 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-semibold leading-snug">{item.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mt-1 hidden sm:block">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Education section */}
        <div className="space-y-4 md:space-y-6">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            </div>
            Education
          </h3>
          
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            <div className="card-glow p-4 md:p-6 rounded-xl bg-card/80 backdrop-blur border border-border/50">
              <div className="space-y-1 md:space-y-2">
                <div className="text-sm md:text-base font-semibold leading-snug">
                  IIT Madras
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  EMBA, Product Engineering
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-primary pt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  2022 – 2023
                </div>
              </div>
            </div>
            
            <div className="card-glow p-4 md:p-6 rounded-xl bg-card/80 backdrop-blur border border-border/50">
              <div className="space-y-1 md:space-y-2">
                <div className="text-sm md:text-base font-semibold leading-snug">
                  Anna University
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  B.E., Mechanical Engineering
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-primary pt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  2011 – 2015
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
