'use client'
import React from 'react'
import Link from 'next/link'
import { Smartphone, Monitor, ArrowRight, BookOpen, Zap } from 'lucide-react'

export default function PlaybookPage() {
  return (
    <main id="playbook" className="px-3 pt-12 pb-12 max-w-7xl mx-auto">
      <header className="text-center py-8 mb-12 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[1.1] bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent animate-in fade-in slide-in-from-top duration-1000">
          Automation Playbooks
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
          Comprehensive implementation guides and strategic patterns for test automation across different platforms and technologies.
        </p>
        <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom duration-1000 delay-400">
          <BookOpen className="w-4 h-4" />
          <span>Choose your automation journey</span>
        </div>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Mobile Automation Playbook */}
        <Link href="/playbook/mobile" className="group">
          <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/30 dark:to-indigo-900/30 border border-blue-200/50 dark:border-blue-800/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-2xl -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Smartphone className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h2 className="text-2xl font-bold text-foreground mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                Mobile Automation
              </h2>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Comprehensive guide for iOS and Android test automation using Appium, including setup, best practices, and advanced patterns for mobile testing at scale.
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  <span>iOS & Android Testing</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  <span>Appium Framework Setup</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  <span>Device Management</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  <span>Cross-Platform Strategies</span>
                </li>
              </ul>

              {/* CTA */}
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium group-hover:gap-3 transition-all duration-300">
                <span>Explore Mobile Guide</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </Link>

        {/* Web Automation Playbook */}
        <div className="group relative">
          <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900/30 dark:to-gray-800/30 border border-slate-200/50 dark:border-slate-700/30 transition-all duration-300 overflow-hidden opacity-60">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-400/20 to-gray-500/20 rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-500 to-gray-600 flex items-center justify-center mb-6 shadow-lg">
                <Monitor className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Web Automation
              </h2>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Complete guide for web application testing using Selenium, Playwright, and modern testing frameworks with CI/CD integration and best practices.
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>
                  <span>Selenium & Playwright</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                  <span>Cross-Browser Testing</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                  <span>CI/CD Integration</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                  <span>Performance Testing</span>
                </li>
              </ul>

              {/* Coming Soon Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700/50 text-amber-700 dark:text-amber-300 text-sm font-medium">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                <span>Coming Soon</span>
              </div>
            </div>
          </div>
        </div>

        {/* API Automation Playbook */}
        <div className="group relative">
          <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-950/30 dark:to-teal-900/30 border border-emerald-200/50 dark:border-emerald-800/30 transition-all duration-300 overflow-hidden opacity-60">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-2xl -translate-y-16 translate-x-16"></div>
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-6 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h2 className="text-2xl font-bold text-foreground mb-4">
                API Automation
              </h2>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Complete guide for API testing and automation using REST, GraphQL, and modern testing tools with comprehensive validation strategies and performance testing.
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <span>REST & GraphQL Testing</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                  <span>Postman & Newman</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
                  <span>Contract Testing</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-600"></div>
                  <span>Performance & Load Testing</span>
                </li>
              </ul>

              {/* Coming Soon Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700/50 text-amber-700 dark:text-amber-300 text-sm font-medium">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                <span>Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/30 text-sm text-muted-foreground">
          <BookOpen className="w-4 h-4" />
          <span>More playbooks coming soon</span>
        </div>
      </div>
    </main>
  )
}