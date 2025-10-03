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
    <section id="projects" className="section-accent px-6 py-20 scroll-mt-32">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Featured Initiatives</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.title} className="p-6 hover:shadow-lg transition-shadow flex flex-col">
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold leading-snug">{project.title}</h3>
                  {project.org && <p className="text-xs uppercase tracking-wide text-primary font-semibold mt-1">{project.org}</p>}
                </div>
                <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                {project.highlights && (
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {project.highlights.map(h => (
                      <li key={h} className="flex gap-2">
                        <TrendingUp className="h-4 w-4 text-primary shrink-0 mt-[2px]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-[10px] py-0.5 px-2 font-medium">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
