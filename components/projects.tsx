"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Star, Rocket } from "lucide-react"

interface Project {
  title: string
  org: string
  description: string
  highlights: string[]
  technologies: string[]
  featured?: boolean
}

const projects: Project[] = [
  {
    title: "Test Orchestration Agent for Unified Automation",
    org: "EPAM Systems",
    description: "Centralized agent enabling unified execution of Web, API & Mobile suites across CI/CD pipelines with intelligent scheduling and observability.",
    highlights: [
      "Integrated with Jenkins & device clouds (40% pipeline effort reduction)",
      "Observability hooks + artifact capture improved traceability",
      "Reduced execution flakiness by 30% via stability heuristics",
    ],
    technologies: ["Jenkins", "Appium", "REST", "Docker", "Allure", "GraphQL"],
    featured: true,
  },
  {
    title: "Device Farm for Test Automation",
    org: "EPAM Systems",
    description: "Scalable internal mobile device lab using Appium Grid & OpenSTF for distributed execution with containerized provisioning.",
    highlights: [
      "75% increase in real-device coverage",
      "50% reduction in end-to-end test time via parallel scheduling",
      "Containerized provisioning for rapid lab spin-up",
    ],
    technologies: ["Appium Grid", "OpenSTF", "Docker", "K8s", "NGINX"],
    featured: true,
  },
  {
    title: "Negative Experience / Resilience Testing",
    org: "Navi",
    description: "Framework to simulate adverse conditions (network, battery, interrupts) for mobile app resilience.",
    highlights: [
      "10% reduction in defect leakage (pre-production)",
      "Automated chaos scenarios integrated into CI",
      "Risk-based edge case catalog for prioritization",
    ],
    technologies: ["Android", "iOS", "Appium", "Proxy", "Chaos Scripts"],
  },
  {
    title: "Intelligent Test Execution for Mobile Apps",
    org: "OkCredit",
    description: "Smart regression layer using code diff + risk scoring to choose minimal high-value test set.",
    highlights: [
      "60% reduction in regression cycle time",
      "90% mobile test coverage maintained",
      "Dynamic prioritization based on impacted modules",
    ],
    technologies: ["Git Diff", "Appium", "Python", "Prioritization Engine"],
  },
]

export function Projects() {
  const featuredProjects = projects.filter(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)

  return (
    <section id="projects" className="section-accent px-6 py-24 bg-card/30 scroll-mt-32">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Featured <span className="text-gradient">Initiatives</span>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Key projects that showcase my approach to building quality at scale.
          </p>
        </div>

        {/* Featured projects - larger cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {featuredProjects.map((project) => (
            <Card
              key={project.title}
              className="card-glow p-8 bg-card/80 backdrop-blur border border-border/50 rounded-2xl hover:border-primary/30 transition-all duration-300 flex flex-col"
            >
              {/* Featured badge */}
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Featured</span>
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm font-medium text-primary">{project.org}</p>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <TrendingUp className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-6 mt-auto border-t border-border/30">
                {project.technologies.map((tech) => (
                  <Badge 
                    key={tech} 
                    variant="secondary" 
                    className="text-xs py-1 px-2.5 font-medium bg-secondary/50"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Other projects - standard cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {otherProjects.map((project) => (
            <Card
              key={project.title}
              className="card-glow p-6 bg-card/70 backdrop-blur border border-border/40 rounded-xl hover:border-primary/20 transition-all duration-300 flex flex-col"
            >
              <div className="space-y-3 flex-1">
                <div>
                  <h3 className="text-lg font-semibold mb-1 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs font-medium text-primary uppercase tracking-wide">{project.org}</p>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights - condensed */}
                <ul className="space-y-1.5">
                  {project.highlights.slice(0, 2).map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <TrendingUp className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-4 mt-auto">
                {project.technologies.slice(0, 4).map((tech) => (
                  <Badge 
                    key={tech} 
                    variant="secondary" 
                    className="text-[10px] py-0.5 px-2 font-medium bg-secondary/40"
                  >
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 4 && (
                  <Badge variant="outline" className="text-[10px] py-0.5 px-2">
                    +{project.technologies.length - 4}
                  </Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
