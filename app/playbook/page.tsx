'use client'
import React, { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight, ArrowUp } from 'lucide-react'
import CodeBlock from '../../components/code-block'

export default function PlaybookPage() {
  const [raw, setRaw] = useState<string>('')
  // State for managing collapsed sections - must be declared before any conditional returns
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set())
  const [showScrollTop, setShowScrollTop] = useState(false)

  const toggleSection = (slug: string) => {
    const newCollapsed = new Set(collapsedSections)
    if (newCollapsed.has(slug)) {
      newCollapsed.delete(slug)
    } else {
      newCollapsed.add(slug)
    }
    setCollapsedSections(newCollapsed)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  useEffect(() => {
    // Load the markdown content
    fetch('/playbooks/Appium.mdx')
      .then(res => res.text())
      .then(setRaw)
      .catch(console.error)
  }, [])

  useEffect(() => {
    // Show/hide scroll to top button based on scroll position
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  if (!raw) return <div className="flex items-center justify-center min-h-screen">Loading...</div>

  // Enhanced lightweight markdown renderer with collapsible sections
  const lines = raw.split(/\r?\n/)
  const sections: { heading: { level: number; text: string; slug: string }; content: React.ReactNode[] }[] = []
  const headings: { level:number; text:string; slug:string }[] = []
  let currentSection: { heading: { level: number; text: string; slug: string }; content: React.ReactNode[] } | null = null
  let list: { type:'ul'|'ol'; items:string[] } | null = null
  let blockquote: string[] | null = null
  let code: { lang?: string; lines: string[] } | null = null
  const slugCounts: Record<string, number> = {}
  let skipTocSection = false
  let mainTitle = ""

  const slugify = (txt:string) => {
    const base = txt.toLowerCase().replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-')
    const count = slugCounts[base] = (slugCounts[base]||0)+1
    return count>1 ? `${base}-${count}` : base
  }

  const esc = (s:string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
  const inline = (s:string) => {
    // Escape then restore markdown tokens we will format
    let out = esc(s)
    out = out.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-muted/60 text-primary font-mono text-[0.8em]">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/!?\[([^\]]+)\]\(([^)]+)\)/g, (m, text, href) => {
        if (m.startsWith('!')) return m // (skip images for now)
        const safeHref = href.startsWith('#')? href : href
        return `<a href="${safeHref}" class="text-primary hover:underline">${text}</a>`
      })
    return out
  }

  const flushList = () => { if (list && currentSection) { const Tag = list.type === 'ul' ? 'ul' : 'ol';
    currentSection.content.push(
      <Tag key={currentSection.content.length+list.type} className={`${Tag==='ul'? 'list-disc':'list-decimal'} pl-6 space-y-1`}
        dangerouslySetInnerHTML={{ __html: list.items.map(li=>`<li>${inline(li.trim())}</li>`).join('') }} />
    ); list=null }
  }
  const flushQuote = () => { if (blockquote && currentSection) { currentSection.content.push(
    <blockquote key={currentSection.content.length+'bq'} className="border-l-4 border-accent pl-4 italic text-muted-foreground space-y-2" dangerouslySetInnerHTML={{ __html: blockquote.map(l=>inline(l)).join('<br/>') }} />
  ); blockquote=null } }
  const flushCode = () => { if (code && currentSection) { currentSection.content.push(
    <CodeBlock key={currentSection.content.length+'code'} lang={code.lang} code={code.lines.join('\n')} />
  ); code=null } }

  lines.forEach((line: string) => {
    const fence = line.match(/^```(.*)$/)
    if (fence) { if (code) { flushCode() } else { flushList(); flushQuote(); code={ lang:fence[1]||undefined, lines:[] } } return }
    if (code) { code.lines.push(line); return }
    if (!line.trim()) { flushList(); flushQuote(); return }

    // Blockquote
    if (line.startsWith('>')) { 
      if (skipTocSection) return
      if (!blockquote) { flushList(); blockquote=[] } 
      blockquote.push(line.replace(/^>\s?/,'')) 
      return 
    }

    // Ordered list
    const ol = line.match(/^\d+\.\s+(.*)$/)
    if (ol) { 
      if (skipTocSection) return
      if (!list) list={ type:'ol', items:[] }; if (list.type!=='ol') { flushList(); list={ type:'ol', items:[] } } 
      list.items.push(ol[1]) 
      return 
    }
    // Unordered list
    const li = line.match(/^[-*+]\s+(.*)$/)
    if (li) { 
      if (skipTocSection) return
      if (!list) list={ type:'ul', items:[] }; if (list.type!=='ul') { flushList(); list={ type:'ul', items:[] } } 
      list.items.push(li[1]) 
      return 
    }

    // Headings
    const heading = line.match(/^(#{1,6})\s+(.*)$/)
    if (heading) {
      flushList(); flushQuote()
      const level = heading[1].length
      const text = heading[2].trim()
      
      // Capture the main title (first h1) and skip rendering it
      if (level === 1 && !mainTitle) {
        mainTitle = text
        return
      }
      
      // Skip Table of Contents section
      if (level === 2 && text.toLowerCase().includes('table of contents')) {
        skipTocSection = true
        return
      }
      
      // End TOC section when we hit the next main section
      if (skipTocSection && level <= 2 && !text.toLowerCase().includes('table of contents')) {
        skipTocSection = false
      }
      
      // Skip rendering if we're in TOC section
      if (skipTocSection) {
        return
      }
      
      const slug = slugify(text)
      
      // Enhanced typography for different heading levels
      let size = ''
      if (level === 1) {
        size = 'text-4xl md:text-5xl font-bold text-primary border-b-2 border-primary/20 pb-4 mb-8'
      } else if (level === 2) {
        size = 'text-2xl md:text-3xl font-bold text-foreground bg-gradient-to-r from-muted/60 to-muted/30 backdrop-blur-sm p-5 rounded-xl border border-border/50 shadow-sm mb-6 mt-8 cursor-pointer hover:from-muted/80 hover:to-muted/50 hover:border-primary/30 transition-all duration-300 flex items-center justify-between group'
      } else if (level === 3) {
        size = 'text-base md:text-lg font-semibold text-primary border-l-2 border-primary/70 bg-primary/15 pl-4 pr-3 py-2 rounded-r-lg mb-2 mt-4 hover:border-primary/90 hover:bg-primary/20 transition-all duration-200'
      } else {
        size = 'text-sm md:text-base font-medium text-foreground/80 mb-2 mt-3 pl-2 border-l-2 border-muted-foreground/20'
      }
      
      if (level>1) headings.push({ level, text, slug })

      // Create new section for level 2 headings (main sections)
      if (level === 2) {
        // Finish current section if exists
        if (currentSection) {
          sections.push(currentSection)
        }
        
        // Start new section
        currentSection = {
          heading: { level, text, slug },
          content: []
        }
        return
      } else if (currentSection) {
        // Add subsection headings to current section content
        const Tag = ('h'+Math.min(level,6)) as keyof JSX.IntrinsicElements
        currentSection.content.push(
          <Tag id={slug} key={currentSection.content.length+'h'} className={`${size} scroll-mt-28 group relative`}> 
            <a href={`#${slug}`} className="no-underline after:content-['#'] after:opacity-0 group-hover:after:opacity-60 after:ml-2 after:text-accent/70 transition-opacity">{text}</a>
          </Tag>
        )
      }
      return
    }

    // Skip content if we're in TOC section
    if (skipTocSection) {
      return
    }

    flushList(); flushQuote()
    if (currentSection) {
      currentSection.content.push(<p key={currentSection.content.length+'p'} className="body-muted" dangerouslySetInnerHTML={{ __html: inline(line.trim()) }} />)
    }
  })
  flushList(); flushQuote(); flushCode()
  
  // Add final section if exists
  if (currentSection) {
    sections.push(currentSection)
  }

  const toggleAllSections = () => {
    const allSlugs = sections.map(section => section.heading.slug)
    const allCollapsed = allSlugs.every(slug => collapsedSections.has(slug))
    
    if (allCollapsed) {
      // If all sections are collapsed, expand all
      setCollapsedSections(new Set())
    } else {
      // If any sections are expanded, collapse all
      setCollapsedSections(new Set(allSlugs))
    }
  }

  return (
    <main id="playbook" className="px-3 pt-12 pb-12 max-w-7xl mx-auto">
      <header className="text-center py-4 mb-6 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2 leading-[1.1] bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent animate-in fade-in slide-in-from-top duration-1000">
          Automation Playbook
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
          Curated implementation guidance and strategic patterns for test automation at scale.
        </p>
        {mainTitle && (
          <h2 className="text-xs md:text-sm font-medium bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent mt-3 leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-400">
            {mainTitle}
          </h2>
        )}
      </header>
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] gap-6 items-start">
        <div className="relative">
          
          <article className="prose dark:prose-invert max-w-none space-y-4 leading-relaxed">
            {sections.map((section) => {
              const isCollapsed = collapsedSections.has(section.heading.slug)
              const Icon = isCollapsed ? ChevronRight : ChevronDown
              
              return (
                <div key={section.heading.slug} className="section-container relative">
                  {/* Subtle section background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent rounded-lg -m-0.5" />
                  
                  {/* Collapsible Section Header */}
                  <div
                    onClick={() => toggleSection(section.heading.slug)}
                    className="relative text-lg md:text-xl font-bold text-foreground bg-gradient-to-r from-muted/60 to-muted/30 backdrop-blur-sm p-3 rounded-lg border border-border/50 shadow-sm mb-3 mt-2 cursor-pointer hover:from-muted/80 hover:to-muted/50 hover:border-primary/30 transition-all duration-300 flex items-center justify-between group"
                    id={section.heading.slug}
                  >
                    <span className="flex items-center gap-2">
                      {section.heading.text.replace(/^\d+\.\s*/, '')}
                    </span>
                    <Icon className="w-4 h-4 text-primary transition-all duration-300 group-hover:scale-110 group-hover:text-primary/80" />
                  </div>
                  
                  {/* Collapsible Content */}
                  <div 
                    className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
                      isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[10000px] opacity-100'
                    }`}
                  >
                    <div className="space-y-3 pb-4 px-0.5">
                      {section.content}
                    </div>
                  </div>
                </div>
              )
            })}
          </article>
        </div>
        <aside className="hidden lg:block sticky top-24 h-[calc(100dvh-6rem)] overflow-y-auto pl-2 pr-2 text-sm">
          <div className="flex gap-2 mb-3 mt-2 ml-2">
            {/* Table of Contents */}
            <div
              onClick={() => toggleSection('table-of-contents')}
              className="flex-1 text-lg md:text-xl font-bold text-foreground bg-gradient-to-r from-muted/60 to-muted/30 backdrop-blur-sm p-3 rounded-lg border border-border/50 shadow-sm cursor-pointer hover:from-muted/80 hover:to-muted/50 hover:border-primary/30 transition-all duration-300 flex items-center justify-between group"
            >
              <span className="flex items-center gap-2">
                Table of Contents
              </span>
              <ChevronDown className={`w-4 h-4 text-primary transition-all duration-300 group-hover:scale-110 group-hover:text-primary/80 ${
                collapsedSections.has('table-of-contents') ? 'rotate-180' : ''
              }`} />
            </div>
            
            {/* Collapse/Expand All Button - Right of TOC */}
            <button
              onClick={toggleAllSections}
              className="text-lg md:text-xl font-bold text-foreground bg-gradient-to-r from-muted/60 to-muted/30 backdrop-blur-sm p-3 rounded-lg border border-border/50 shadow-sm hover:from-muted/80 hover:to-muted/50 hover:border-primary/30 transition-all duration-300 group flex items-center justify-center min-w-[60px]"
              title={sections.every(section => collapsedSections.has(section.heading.slug)) ? "Expand All Sections" : "Collapse All Sections"}
            >
              {sections.every(section => collapsedSections.has(section.heading.slug)) ? (
                <ChevronDown className="w-5 h-5 text-primary transition-all duration-300 group-hover:scale-110" />
              ) : (
                <ChevronRight className="w-5 h-5 text-primary transition-all duration-300 group-hover:scale-110" />
              )}
            </button>
          </div>
          <div 
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              collapsedSections.has('table-of-contents') ? 'max-h-0 opacity-0' : 'max-h-[10000px] opacity-100'
            }`}
          >
            <nav className="space-y-0.5 px-0.5 pb-4 ml-2">
              {sections.map((section, index) => {
                // Remove leading numbers from section text for TOC display
                const cleanText = section.heading.text.replace(/^\d+\.\s*/, '')
                
                return (
                  <div key={section.heading.slug} className="group">
                    <a 
                      href={`#${section.heading.slug}`} 
                      className="block py-1.5 px-2 rounded-md text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border/30"
                    >
                      <span className="font-medium leading-tight text-sm group-hover:text-foreground transition-colors">
                        {cleanText}
                      </span>
                    </a>
                  </div>
                )
              })}
            </nav>
          </div>
        </aside>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
          title="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      )}
    </main>
  )
}
