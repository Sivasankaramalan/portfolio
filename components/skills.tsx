"use client"
import { Card } from "@/components/ui/card"
import {
  Beaker,
  GitBranch,
  Code,
  Wrench,
  Gauge,
  ShieldCheck,
  Boxes,
  Cloud,
  Database,
  Layers,
  Users,
  Lightbulb,
} from "lucide-react"

interface SkillCategory {
  title: string
  icon: any
  skills: string[]
}

// Updated categories based on provided content
const skillCategories: SkillCategory[] = [
  {
    title: "Testing Practices",
    icon: Beaker,
    skills: [
      "Shift-left Testing",
      "Component Testing",
      "Contract Testing",
      "Chaos Engineering",
      "BDD",
      "Exploratory Testing",
    ],
  },
  {
    title: "Agile Methodologies",
    icon: GitBranch,
    skills: ["Scrum", "Kanban", "SAFe Agile"],
  },
  {
    title: "Languages & Frameworks",
    icon: Code,
    skills: ["Java", "Kotlin", "Rest Assured", "Cucumber", "JUnit", "TestNG"],
  },
  {
    title: "Automation Tools",
    icon: Wrench,
    skills: ["Appium", "Selenium", "Espresso", "XCUITest", "Playwright", "UIAutomator"],
  },
  {
    title: "Performance & Security",
    icon: Gauge,
    skills: ["K6.io", "Apptim", "Gatling", "OWASP ZAP", "Burp Suite"],
  },
  {
    title: "CI/CD & DevOps",
    icon: Boxes,
    skills: ["Jenkins", "GitHub Actions", "Docker", "Kubernetes", "GoCD"],
  },
  {
    title: "Observability & Monitoring",
    icon: ShieldCheck,
    skills: ["Grafana", "Kibana", "Elasticsearch", "Prometheus", "Splunk"],
  },
  {
    title: "Cloud & Device Infrastructure",
    icon: Cloud,
    skills: [
      "HeadSpin",
      "PCloudy",
      "BrowserStack",
      "Sauce Labs",
      "Kobiton",
      "Google Cloud",
      "K8s",
      "Docker",
    ],
  },
  {
    title: "Databases & Messaging",
    icon: Database,
    skills: ["SQL", "Redis", "Kafka"],
  },
  {
    title: "Architecture & Integration",
    icon: Layers,
    skills: ["API Design", "Service Contracts", "Test Data Strategy"],
  },
  {
    title: "Collaboration & Softskills",
    icon: Lightbulb,
    skills: [
      "Agile Coaching",
      "Stakeholder Alignment",
      "Risk Management",
      "Release Readiness",
      "Mentoring",
    ],
  },
  {
    title: "Leadership Skills",
    icon: Users,
    skills: [
      "People Management",
      "Strategic Planning",
      "Hiring & Team Building",
      "Conflict Resolution",
      "Decision Making",
      "Coaching & Mentorship",
    ],
  },
]

export function Skills() {
  return (
  <section id="skills" className="reveal-section is-visible section-accent px-6 md:px-10 lg:px-14 py-24 bg-card scroll-mt-32">
      <div className="max-w-6xl mx-auto">
  <h2 className="text-4xl md:text-5xl font-bold mb-14 tracking-tight">Skills & Expertise</h2>
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => {
            const Icon = category.icon
            return (
              <Card
                key={category.title}
                className="p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow border bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60 rounded-xl"
              >
                <div className="flex items-center justify-center gap-3 text-center">
                  <div className="p-2 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold leading-tight">{category.title}</h3>
                </div>
                <ul className="flex flex-wrap gap-2 justify-center">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="px-2.5 py-1 rounded-md text-xs font-medium bg-secondary/70 text-secondary-foreground/90 border border-border/40"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
