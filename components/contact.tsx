"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Linkedin, Github, FileText, Heart, Send } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="section-accent px-6 py-24 bg-card/50 scroll-mt-32">
      <div className="max-w-4xl mx-auto">
        {/* Main content */}
        <div className="text-center space-y-6 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Send className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Let&apos;s <span className="text-gradient">Connect</span>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I&apos;m always interested in hearing about new opportunities, challenging projects, or just connecting with
            fellow engineers. Feel free to reach out!
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" className="gap-2 card-glow" asChild>
              <a href="mailto:sivasankaramalan@gmail.com">
                <Mail className="h-4 w-4" />
                sivasankaramalan@gmail.com
              </a>
            </Button>
          </div>
        </div>

        {/* Social links */}
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          <a 
            href="https://github.com/Sivasankaramalan" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group block"
          >
            <Card className="card-glow p-6 text-center bg-card/80 backdrop-blur border border-border/50 rounded-xl hover:border-primary/30 transition-all duration-300 h-full cursor-pointer">
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">GitHub</h3>
                  <p className="text-sm text-muted-foreground">@Sivasankaramalan</p>
                </div>
              </div>
            </Card>
          </a>
          <a 
            href="https://www.linkedin.com/in/sivasankaramalan/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group block"
          >
            <Card className="card-glow p-6 text-center bg-card/80 backdrop-blur border border-border/50 rounded-xl hover:border-primary/30 transition-all duration-300 h-full cursor-pointer">
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Linkedin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">LinkedIn</h3>
                  <p className="text-sm text-muted-foreground">@sivasankaramalan</p>
                </div>
              </div>
            </Card>
          </a>
          <a 
            href="/api/resume/download"
            className="group block"
          >
            <Card className="card-glow p-6 text-center bg-card/80 backdrop-blur border border-border/50 rounded-xl hover:border-primary/30 transition-all duration-300 h-full cursor-pointer">
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">Resume</h3>
                  <p className="text-sm text-muted-foreground">Download PDF</p>
                </div>
              </div>
            </Card>
          </a>
        </div>

        {/* Footer */}
        <div className="text-center space-y-4 pt-8 border-t border-border/30">
          <p className="text-sm text-muted-foreground">
            Shipping code, breaking builds, fixing bugs — repeat.
          </p>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
            Made with
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            and a mass of caffeine
          </p>
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} Sivasankaramalan Gunasekarasivam
          </p>
        </div>
      </div>
    </section>
  )
}
