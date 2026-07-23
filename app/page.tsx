import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Education } from "@/components/education"
import { Certifications } from "@/components/certifications"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Blog } from "@/components/blog"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Experience />
      <Education />
      <Certifications />
      <Skills />
      <Projects />
      <Blog />
      <Contact />
    </div>
  )
}
