"use client"
import { useEffect, useState } from 'react'
import { Paintbrush } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AccentToggle(){
  const [accent,setAccent] = useState<'teal'|'pink'>('teal')
  useEffect(()=>{
    const saved = window.localStorage.getItem('accent-scheme') as 'teal'|'pink'|null
    if(saved){
      setAccent(saved)
      if(saved==='pink') document.documentElement.setAttribute('data-accent','pink')
    }
  },[])
  const toggle = () => {
    setAccent(prev => {
      const next = prev==='teal' ? 'pink' : 'teal'
      if(next==='pink') document.documentElement.setAttribute('data-accent','pink')
      else document.documentElement.removeAttribute('data-accent')
      window.localStorage.setItem('accent-scheme', next)
      return next
    })
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle accent color"
      className={cn('focus-gradient inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-accent/10', accent==='pink' ? 'text-[oklch(0.55_0.18_15)]' : 'text-primary')}
    >
      <Paintbrush className="h-4 w-4" />
      {accent === 'pink' ? 'Pink' : 'Teal'}
    </button>
  )
}
