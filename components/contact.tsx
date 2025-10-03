import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Linkedin, Github, FileText } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="section-accent px-6 py-20 bg-card scroll-mt-32">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Let's Work Together</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I'm always interested in hearing about new opportunities, challenging projects, or just connecting with
            fellow QE professionals. Feel free to reach out!
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" className="gap-2" asChild>
              <a href="mailto:sivasankaramalan@example.com">
                <Mail className="h-4 w-4" />
                sivasankaramalan@example.com
              </a>
            </Button>
          </div>
        </div>
  <div className="grid md:grid-cols-3 gap-4 mt-12">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <a href="https://github.com/sivasankaramalan" className="flex flex-col items-center gap-3 group">
              <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Github className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">GitHub</h3>
                <p className="text-sm text-muted-foreground">@sivasankaramalan</p>
              </div>
            </a>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <a href="https://linkedin.com/in/sivasankaramalan" className="flex flex-col items-center gap-3 group">
              <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Linkedin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">LinkedIn</h3>
                <p className="text-sm text-muted-foreground">@sivasankaramalan</p>
              </div>
            </a>
          </Card>
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <a href="/api/resume/download" className="flex flex-col items-center gap-3 group">
              <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Resume</h3>
                <p className="text-sm text-muted-foreground">Download PDF</p>
              </div>
            </a>
          </Card>
        </div>
      </div>
    </section>
  )
}
