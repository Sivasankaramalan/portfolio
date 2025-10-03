import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

const projects = [
  {
    title: "Test Orchestration Agent for Unified Automation",
    org: "EPAM Systems",
    description: "Centralized agent enabling unified execution of Web, API & Mobile suites across CI/CD pipelines.",
    highlights: [
      "Integrated with Jenkins & device clouds (40% pipeline effort reduction)",
      "Observability hooks + artifact capture improved traceability",
      "Reduced execution flakiness by 30% via stability heuristics",
    ],
    technologies: ["Jenkins", "Appium", "REST", "Docker", "Allure", "GraphQL/REST APIs"],
  },
  {
    title: "Device Farm for Test Automation",
    org: "EPAM Systems",
    description: "Scalable internal mobile device lab using Appium Grid & OpenSTF for distributed execution.",
    highlights: [
      "75% increase in real-device coverage",
      "50% reduction in end-to-end test time via parallel scheduling",
      "Containerized provisioning for rapid lab spin-up",
    ],
    technologies: ["Appium Grid", "OpenSTF", "Docker", "K8s", "NGINX"],
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
  return (
    <section id="projects" className="section-accent px-6 md:px-10 lg:px-14 py-24 scroll-mt-32">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-14 tracking-tight">Featured Initiatives</h2>
  <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 auto-rows-fr max-w-5xl mx-auto">
          {projects.map(project => (
            <Card
              key={project.title}
              className="p-7 md:p-8 flex flex-col gap-5 hover:shadow-xl transition-shadow border bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60 rounded-2xl"
            >
              <div className="space-y-3 flex-1">
                <div className="space-y-1">
                  <h3 className="text-lg md:text-xl font-semibold leading-snug line-clamp-3">{project.title}</h3>
                  {project.org && (
                    <p className="text-[11px] uppercase tracking-wide text-primary font-semibold">{project.org}</p>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                  {project.description}
                </p>
                {project.highlights && (
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    {project.highlights.map(h => (
                      <li key={h} className="flex gap-2">
                        <TrendingUp className="h-4 w-4 text-primary shrink-0 mt-[1px]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2 mt-auto">
                {project.technologies.map(tech => (
                  <Badge key={tech} variant="secondary" className="text-[10px] py-0.5 px-2 font-medium">
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
