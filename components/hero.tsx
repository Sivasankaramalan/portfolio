"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Mail, FileText } from "lucide-react"
import Image from "next/image"

const SUBHEADLINE_FULL = "Driving the Future of Quality Engineering"
const TYPING_INTERVAL = 42 // ms per character
const PAUSE_END = 1200 // pause after full text

export function Hero() {
  const [subhead, setSubhead] = useState("")
  const [showCaret, setShowCaret] = useState(true)
  const indexRef = useRef(0)
  const doneRef = useRef(false)

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

  useEffect(() => {
    if (!showCaret) return
    const blink = setInterval(() => {
      // trigger re-render by toggling a class via state flip if needed
      setShowCaret(prev => prev) // noop to keep future extensibility
    }, 1000)
    return () => clearInterval(blink)
  }, [showCaret])

  return (
    <section id="home" className="section-accent accent-blue px-6 pt-40 pb-24 scroll-mt-32">
      <div className="max-w-5xl mx-auto">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground rounded px-3 py-1">
          Skip to content
        </a>
        <div id="main" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
            <div className="shrink-0 w-48 md:w-60 overflow-hidden rounded-2xl shadow-sm bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/50 border border-border/60">
              <Image
                src="/Image/Sivasankaramalan.png"
                alt="Portrait of Sivasankaramalan"
                width={320}
                height={400}
                priority
                className="max-w-full h-auto object-contain bg-transparent"
              />
            </div>
            <div className="space-y-7 text-center md:text-left max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance headline-gradient">
                Hola! 👋 I’m <span className="text-primary">Sivasankaramalan</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground tracking-tight">
                <span>{subhead}</span>
                {showCaret && <span className="ml-1 inline-block w-2 h-6 md:h-7 bg-primary align-middle animate-pulse rounded-sm" aria-hidden />}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed subhead-muted">
                Over the past decade, I’ve led QA initiatives at scale—from shift-left practices to AI-driven automation frameworks—helping teams ship reliable, scalable, user-loved software.
              </p>
              <div className="flex flex-wrap gap-4 pt-3 justify-center md:justify-start">
                <Button size="lg" className="gap-2" asChild>
                  <a href="#contact">
                    <Mail className="h-4 w-4" />
                    Get in Touch
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="gap-2 bg-transparent" asChild>
                  <a href="/resume">
                    <FileText className="h-4 w-4" />
                    View Resume
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
