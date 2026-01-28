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
    description: "Using AI as a native engineering layer—Cursor, Copilot, Claude, and custom agents to accelerate development without shortcuts."
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
    <section id="about" className="section-accent px-6 py-24 scroll-mt-32">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            Building Products{" "}
            <span className="text-gradient">at Scale</span>
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            Over the past decade, I&apos;ve been at the intersection of product engineering and quality—building systems that scale, leading teams that ship, and integrating AI to move faster without compromising reliability.
          </p>
        </div>

        {/* Main content */}
        <div className="space-y-8 text-lg leading-relaxed text-muted-foreground mb-16">
          <p>
            I believe in owning systems end-to-end. From architecting automation frameworks that serve millions of users to building products like <span className="font-semibold text-foreground">GoLocally</span> and <span className="font-semibold text-foreground">Local.Ally</span>, my approach combines technical depth with product thinking.
          </p>
          <p>
            Quality isn&apos;t just testing—it&apos;s a continuous discipline woven into every commit, every deploy, every user interaction. I champion shift-left practices, architect AI-driven automation frameworks, and shape reliable, scalable digital experiences.
          </p>
          <p>
            Currently, I&apos;m exploring how AI can transform the way we build software—not as a replacement for engineering judgment, but as a native layer that amplifies what we can achieve.
          </p>
        </div>

        {/* Highlight cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {highlights.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="card-glow p-6 rounded-xl bg-card/80 backdrop-blur border border-border/50 space-y-4 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Education section */}
        <div className="space-y-8">
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            Education
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-glow p-6 rounded-xl bg-card/80 backdrop-blur border border-border/50">
              <div className="space-y-2">
                <div className="text-lg font-semibold">
                  Indian Institute of Technology Madras
                </div>
                <div className="text-muted-foreground">
                  EMBA - Product Engineering
                </div>
                <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Jan 2022 – Dec 2023
                </div>
              </div>
            </div>
            
            <div className="card-glow p-6 rounded-xl bg-card/80 backdrop-blur border border-border/50">
              <div className="space-y-2">
                <div className="text-lg font-semibold">
                  Anna University, Chennai
                </div>
                <div className="text-muted-foreground">
                  Mechanical Engineering (B.E.)
                </div>
                <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  Jun 2011 – Apr 2015
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
