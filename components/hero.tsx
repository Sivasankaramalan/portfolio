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
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-44 pb-24 scroll-mt-32">
      <div className="max-w-4xl w-full">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground rounded px-3 py-1">
          Skip to content
        </a>
        <div id="main" className="scroll-mt-24">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            <div className="shrink-0 w-48 md:w-56 overflow-hidden rounded-2xl">
              <Image
                src="/Image/Sivasankaramalan.png"
                alt="Portrait of Sivasankaramalan"
                width={320}
                height={400}
                priority
                className="max-w-full h-auto object-contain bg-transparent"
              />
            </div>
            <div className="space-y-6 text-center md:text-left max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-bold text-balance">
                Hola! 👋, I’m <span className="text-primary">Sivasankaramalan</span> <span role="img" aria-label="technologist"></span>
              </h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-muted-foreground font-medium tracking-tight">
                <span>{subhead}</span>
                {showCaret && <span className="ml-1 inline-block w-2 h-7 md:h-8 bg-primary align-middle animate-pulse rounded-sm" aria-hidden />}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Over the past decade, I’ve led QA initiatives at scale from shift-left testing practices to AI-driven automation frameworks. My mission is simple: help teams build software that’s reliable, scalable, and loved by users.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 justify-center md:justify-start">
                <Button size="lg" className="gap-2" asChild>
                  <a href="#contact">
                    <Mail className="h-4 w-4" />
                    Get in Touch
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="gap-2 bg-transparent" asChild>
                  <a href="/api/resume/view" target="_blank" rel="noopener noreferrer">
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
