"use client"

import { Card } from "@/components/ui/card"
import {
  Sparkles,
  Wrench,
  Code,
  TestTube,
  GitBranch,
  Cloud,
  Activity,
  Users,
  Palette,
  Terminal,
  FileJson,
  Globe,
} from "lucide-react"

interface SkillCategory {
  title: string
  icon: React.ComponentType<{ className?: string }>
  skills: string[]
  isAI?: boolean
}

const skillCategories: SkillCategory[] = [
  {
    title: "AI Core",
    icon: Sparkles,
    skills: ["Cursor", "GitHub Copilot", "Claude", "ChatGPT", "Codex", "MCP"],
    isAI: true,
  },
  {
    title: "AI Toolchain",
    icon: Wrench,
    skills: ["agent.md", "Goose", "Jules", "LangChain", "LlamaIndex", "Ollama", "OpenAI API", "Vercel AI SDK"],
    isAI: true,
  },
  {
    title: "Languages",
    icon: Code,
    skills: ["Java", "JavaScript", "Kotlin", "Python", "Shell Script"],
  },
  {
    title: "Automation & Testing",
    icon: TestTube,
    skills: ["Selenium", "Appium", "Playwright", "RestAssured", "Postman"],
  },
  {
    title: "CI/CD & DevOps",
    icon: GitBranch,
    skills: ["Jenkins", "GitLab", "Docker", "Kubernetes"],
  },
  {
    title: "Cloud & Platforms",
    icon: Cloud,
    skills: ["AWS", "Google Cloud"],
  },
  {
    title: "Monitoring & Observability",
    icon: Activity,
    skills: ["Grafana", "Kibana"],
  },
  {
    title: "Product & Collaboration",
    icon: Users,
    skills: ["Jira", "Confluence", "ClickUp", "Notion", "Miro"],
  },
  {
    title: "Product Design",
    icon: Palette,
    skills: ["Figma", "Sketch", "Affinity"],
  },
  {
    title: "Development Tools",
    icon: Terminal,
    skills: ["VS Code", "Warp", "Zed", "LM Studio"],
  },
  {
    title: "API & Documentation",
    icon: FileJson,
    skills: ["Swagger", "OpenAPI"],
  },
  {
    title: "Social & Community",
    icon: Globe,
    skills: ["LinkedIn", "Medium", "Stack Overflow", "Dev.to", "Hashnode"],
  },
]

export function Skills() {
  return (
    <section id="skills" className="section-accent px-6 py-24 bg-card/50 scroll-mt-32">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A comprehensive toolkit spanning AI-native development, automation, and product engineering.
          </p>
        </div>

        {/* 4x3 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {skillCategories.map((category) => {
            const Icon = category.icon
            const isAI = category.isAI

            return (
              <Card
                key={category.title}
                className={`
                  p-5 flex flex-col gap-4 transition-all duration-300
                  border rounded-xl backdrop-blur
                  ${isAI 
                    ? 'ai-card hover:shadow-lg hover:shadow-primary/10' 
                    : 'bg-card/80 hover:shadow-lg hover:border-border/80'
                  }
                `}
              >
                {/* Header with icon and title */}
                <div className="flex items-center gap-3">
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                    ${isAI 
                      ? 'bg-gradient-to-br from-primary/20 to-violet-500/20' 
                      : 'bg-primary/10'
                    }
                  `}>
                    <Icon className={`w-5 h-5 ${isAI ? 'text-primary' : 'text-primary'}`} />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-semibold leading-tight">{category.title}</h3>
                    {isAI && (
                      <span className="ai-badge">
                        <Sparkles className="w-3 h-3" />
                        AI
                      </span>
                    )}
                  </div>
                </div>

                {/* Skills list */}
                <ul className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className={`
                        px-2.5 py-1 rounded-md text-xs font-medium border
                        ${isAI 
                          ? 'bg-primary/5 text-foreground/90 border-primary/20' 
                          : 'bg-secondary/60 text-secondary-foreground/90 border-border/40'
                        }
                      `}
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
