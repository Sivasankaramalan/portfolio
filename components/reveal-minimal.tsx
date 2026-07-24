"use client"
import { useEffect } from 'react'

export function RevealMinimal(){
  useEffect(()=>{
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal-section'))
    if(!els.length) return

    // A section already on-screen (e.g. landed directly on a #hash link, or a
    // fast fling/programmatic scroll that IntersectionObserver's frame-based
    // checks can skip past) should reveal immediately rather than risk being
    // stuck at opacity:0 forever.
    const revealIfInView = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-visible')
        return true
      }
      return false
    }

    let pending = els.filter((el) => !revealIfInView(el))
    if (!pending.length) return

    // threshold:0 + a generous top rootMargin means a section is considered
    // "intersecting" well before it visually enters the viewport, giving the
    // browser far more opportunity to fire the callback during fast scrolls.
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.classList.add('is-visible')
          obs.unobserve(e.target)
          pending = pending.filter((el) => el !== e.target)
        }
      })
    },{ threshold:0, rootMargin:"200px 0px -5% 0px" })
    pending.forEach(el=>obs.observe(el))

    // Backstop for edge cases IntersectionObserver's frame-based checks can
    // miss (e.g. a single very large instantaneous scroll jump): re-verify
    // remaining sections against the viewport on scroll/resize.
    let ticking = false
    const recheck = () => {
      ticking = false
      if (!pending.length) return
      pending.filter((el) => revealIfInView(el)).forEach((el) => obs.unobserve(el))
      pending = pending.filter((el) => !el.classList.contains('is-visible'))
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(recheck)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      obs.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  },[])
  return null
}
