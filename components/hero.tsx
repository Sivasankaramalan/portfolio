"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mail, FileText, ArrowDown, Rocket, Bot } from "lucide-react"
import Image from "next/image"

const SUBHEADLINE_FULL = "Product Engineer × AI Native × Quality at Scale"
const TYPING_INTERVAL = 38
const PAUSE_END = 1400

export function Hero() {
  const [subhead, setSubhead] = useState("")
  const [showCaret, setShowCaret] = useState(true)
  const [mounted, setMounted] = useState(false)
  const indexRef = useRef(0)
  const doneRef = useRef(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setSubhead(SUBHEADLINE_FULL)
      setShowCaret(false)
      return
    }
    let frame: number | undefined
    let timeout: number | undefined

    const typeNext = () => {
      if (indexRef.current <= SUBHEADLINE_FULL.length) {
        setSubhead(SUBHEADLINE_FULL.slice(0, indexRef.current))
        indexRef.current += 1
        frame = window.setTimeout(typeNext, TYPING_INTERVAL)
      } else if (!doneRef.current) {
        doneRef.current = true
        timeout = window.setTimeout(() => setShowCaret(false), PAUSE_END)
      }
    }
    typeNext()
    return () => {
      if (frame) window.clearTimeout(frame)
      if (timeout) window.clearTimeout(timeout)
    }
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Floating gradient blobs */}
      <div className="glow-blob -top-32 -left-32 bg-[var(--primary)]" />
      <div className="glow-blob top-1/2 -right-48 bg-[var(--accent)]" style={{ animationDelay: '-7s' }} />
      
      {/* Radial glow from top */}
      <div 
        className="absolute inset-x-0 top-0 h-[600px] pointer-events-none"
        style={{ background: 'var(--gradient-glow)' }}
      />
      
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-32 pb-20">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground rounded px-3 py-1">
          Skip to content
        </a>
        
        <div id="main" className="scroll-mt-24">
          {/* Asymmetric grid layout */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Text content - spans 7 columns on large screens */}
            <div className="lg:col-span-7 order-2 lg:order-1 space-y-8">
              
              {/* Main headline */}
              <div className="space-y-4">
                <h1 
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                  <span className="block text-foreground/80">Hello, I'm</span>
                  <span className="block text-gradient mt-2">Sivasankaramalan</span>
                </h1>
                
                {/* Animated subheadline */}
                <h2 
                  className={`text-xl sm:text-2xl md:text-3xl font-heading font-medium text-muted-foreground tracking-tight transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                  <span>{subhead}</span>
                  {showCaret && (
                    <span className="ml-1 inline-block w-[3px] h-6 md:h-8 bg-primary align-middle animate-pulse rounded-full" aria-hidden />
                  )}
                </h2>
              </div>
              
              {/* Description */}
              <p 
                className={`text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                I build products, own systems end to end, and use 
                <span className="text-foreground font-medium"> AI as a native engineering layer</span> to move faster without compromising quality. From shift-left testing to intelligent automation — shipping 
                <span className="text-foreground font-medium"> reliable</span>, 
                <span className="text-foreground font-medium"> scalable</span> software loved by users.
              </p>
              
              {/* CTA buttons */}
              <div 
                className={`flex flex-wrap gap-4 pt-4 transition-all duration-700 delay-[400ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                <Button size="lg" className="gap-2 rounded-full px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all" asChild>
                  <a href="#contact">
                    <Mail className="h-4 w-4" />
                    Get in Touch
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="gap-2 rounded-full px-8 bg-transparent hover:bg-primary/5 transition-all" asChild>
                  <a href="/api/resume/view" target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4" />
                    View Resume
                  </a>
                </Button>
              </div>
            </div>
            
            {/* Portrait - spans 5 columns, overlaps grid */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
              <div 
                className={`relative transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              >
                {/* Decorative rings - multiple layers with different speeds */}
                <div className="absolute inset-0 -m-4 rounded-3xl border border-primary/30 animate-spin-slow" style={{ animationDuration: '25s' }} />
                <div className="absolute inset-0 -m-8 rounded-3xl border border-accent/20 animate-spin-slow" style={{ animationDuration: '35s', animationDirection: 'reverse' }} />
                <div className="absolute inset-0 -m-12 rounded-3xl border border-primary/10 animate-spin-slow" style={{ animationDuration: '45s' }} />
                
                {/* Accent shape behind image */}
                <div className="absolute -bottom-6 -right-6 w-full h-full rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-sm" />
                
                {/* Main image container */}
                <div className="relative w-56 sm:w-64 md:w-72 lg:w-80 aspect-[4/5] rounded-3xl overflow-hidden border-2 border-border/50 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent z-10" />
                  <Image
                    src="/Image/Sivasankaramalan.png"
                    alt="Portrait of Sivasankaramalan"
                    fill
                    priority
                    className="object-cover object-top"
                  />
                </div>
                
                {/* Floating badge */}
                <div className="absolute -bottom-2 -left-4 px-4 py-2 rounded-xl glass-elevated shadow-lg animate-float">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-primary/15">
                      <Rocket className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs text-muted-foreground">Product Engineer at</div>
                      <div className="text-sm font-semibold">EPAM Systems</div>
                    </div>
                  </div>
                </div>
                
                {/* Second floating badge */}
                <div className="absolute -top-2 -right-4 px-3 py-1.5 rounded-lg glass-elevated shadow-lg animate-float" style={{ animationDelay: '-3s' }}>
                  <div className="flex items-center gap-1.5">
                    <Bot className="h-4 w-4 text-accent" />
                    <span className="text-xs font-medium">AI Native</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div 
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60 transition-all duration-700 delay-[600ms] ${mounted ? 'opacity-100' : 'opacity-0'}`}
        >
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
