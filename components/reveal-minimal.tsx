"use client"
import { useEffect } from 'react'

export function RevealMinimal(){
  useEffect(()=>{
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal-section'))
    if(!els.length) return
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('is-visible')
          obs.unobserve(e.target)
        }
      })
    },{ threshold:0.12, rootMargin:"0px 0px -10% 0px" })
    els.forEach(el=>obs.observe(el))
    return ()=>obs.disconnect()
  },[])
  return null
}
