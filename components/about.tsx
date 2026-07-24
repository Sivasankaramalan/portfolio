"use client"

import { Cpu, Layers, Users, Sparkles, UserRound } from "lucide-react"

const highlights = [
  {
    icon: Cpu,
    title: "Product Engineering",
    description:
      "Building products from 0 to 1, owning the full lifecycle from ideation to production with a quality-first mindset.",
  },
  {
    icon: Sparkles,
    title: "AI Native Engineer",
    description:
      "Using AI as a native engineering layer: Cursor, Copilot, Claude, and custom agents to accelerate development without shortcuts.",
  },
  {
    icon: Layers,
    title: "Systems Ownership",
    description:
      "End-to-end ownership of systems, from architecture to observability, ensuring reliability at scale.",
  },
  {
    icon: Users,
    title: "Program Leadership",
    description:
      "Leading cross-functional teams, driving quality culture, and mentoring engineers into quality champions.",
  },
]

export function About() {
  return (
    <section
      id="about"
      className="reveal-section section-accent px-6 py-10 md:min-h-[calc(100vh-72px)] md:flex md:flex-col md:justify-center scroll-mt-32"
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <UserRound className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Building Products{" "}
              <span className="text-gradient">at Scale</span>
            </h2>
          </div>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            Over a decade specializing in mobile engineering across iOS, Android, and cross-platform stacks, architecting automation frameworks that scale with products and teams. AI is now central to how I work: Cursor, Claude, Copilot, and custom MCP agents built into the engineering workflow, not bolted on. At EPAM Systems I lead mobile quality strategy across global teams, keeping reliability high without slowing release velocity.
          </p>
        </div>

        {/* Single column on phones so icon + text stay aligned; 2/4 from sm/lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {highlights.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="card-glow flex items-start gap-3.5 p-5 md:p-6 rounded-xl bg-card/80 backdrop-blur border border-border/50 hover:border-primary/30 transition-all duration-300 h-full"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <h3 className="text-base font-semibold leading-snug tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
