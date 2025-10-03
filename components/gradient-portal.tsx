"use client"
import { useEffect, useRef } from 'react'

/*
  GradientPortal: lightweight animated radial gradient field inspired by nelsonlai.dev.
  Implementation: canvas with multiple moving color stops blended via 'lighter'.
  Keeps GPU cost low by throttling to ~40fps and respecting reduced-motion.
*/
export function GradientPortal(){
  const canvasRef = useRef<HTMLCanvasElement|null>(null)
  const frameRef = useRef<number>()
  const lastRef = useRef<number>(0)
  const pointsRef = useRef<Array<{x:number,y:number,dx:number,dy:number,color:string,r:number}>>([])

  useEffect(()=>{
    const canvas = canvasRef.current
    if(!canvas) return
    const ctx = canvas.getContext('2d')
    if(!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize points (soft teal + complementary hues)
    const palette = [
      'oklch(0.78 0.12 190)',
      'oklch(0.82 0.10 250)',
      'oklch(0.75 0.14 170)',
      'oklch(0.70 0.16 220)',
    ]
    const pts = Array.from({length: 4}, (_,i) => ({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      dx: (Math.random()*0.4+0.15) * (Math.random()>0.5?1:-1),
      dy: (Math.random()*0.4+0.15) * (Math.random()>0.5?1:-1),
      color: palette[i % palette.length],
      r: Math.min(canvas.width, canvas.height) * 0.55
    }))
    pointsRef.current = pts

    const render = (t: number) => {
      if(prefersReduced){
        ctx.fillStyle = 'oklch(0.30 0.04 210)'
        ctx.fillRect(0,0,canvas.width,canvas.height)
        return
      }
      const since = t - lastRef.current
      if(since < 25){ // ~40fps cap
        frameRef.current = requestAnimationFrame(render)
        return
      }
      lastRef.current = t
      ctx.clearRect(0,0,canvas.width,canvas.height)
      ctx.globalCompositeOperation = 'lighter'
      for(const p of pointsRef.current){
        p.x += p.dx
        p.y += p.dy
        if(p.x < -p.r || p.x > canvas.width + p.r) p.dx *= -1
        if(p.y < -p.r || p.y > canvas.height + p.r) p.dy *= -1
        const g = ctx.createRadialGradient(p.x, p.y, p.r*0.05, p.x, p.y, p.r)
        g.addColorStop(0, p.color)
        g.addColorStop(1, 'transparent')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'
      frameRef.current = requestAnimationFrame(render)
    }
    frameRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', resize)
      if(frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full" />
  <div className="absolute inset-0 backdrop-blur-[96px] bg-background/50 mix-blend-plus-lighter" />
  <div className="absolute inset-0 bg-gradient-to-b from-background/15 via-background/35 to-background" />
    </div>
  )
}
