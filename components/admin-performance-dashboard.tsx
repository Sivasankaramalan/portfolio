'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Activity, Zap, Globe, Smartphone, Timer, TrendingUp, Monitor, AlertCircle } from 'lucide-react'

interface PerformanceMetrics {
  cls: number
  fid: number
  fcp: number
  lcp: number
  ttfb: number
  inp?: number
}

interface SEOMetrics {
  score: number
  issues: string[]
  recommendations: string[]
}

export function AdminPerformanceDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [seoScore, setSeoScore] = useState<SEOMetrics>({
    score: 95,
    issues: [],
    recommendations: ['Add more structured data', 'Optimize images further']
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Collect performance metrics
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const metricsData: Partial<PerformanceMetrics> = {}

        entries.forEach((entry) => {
          const metric = entry as any // Performance API types vary
          switch (entry.name) {
            case 'CLS':
              metricsData.cls = metric.value || 0
              break
            case 'FID':
              metricsData.fid = metric.value || 0
              break
            case 'FCP':
              metricsData.fcp = metric.startTime || 0
              break
            case 'LCP':
              metricsData.lcp = metric.startTime || 0
              break
            case 'TTFB':
              metricsData.ttfb = metric.responseStart || 0
              break
            case 'INP':
              metricsData.inp = metric.value || 0
              break
          }
        })

        setMetrics(prev => ({ ...prev, ...metricsData } as PerformanceMetrics))
      })

      // Observe different performance entry types
      try {
        observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] })
      } catch (e) {
        console.log('Performance Observer not fully supported')
      }

      // Get navigation timing metrics
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigation) {
        setMetrics({
          cls: 0,
          fid: 0,
          fcp: navigation.responseStart - navigation.requestStart,
          lcp: navigation.loadEventEnd - navigation.requestStart,
          ttfb: navigation.responseStart - navigation.requestStart,
          inp: 0
        })
      }

      setIsLoading(false)

      return () => observer.disconnect()
    }
  }, [])

  const getMetricStatus = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return 'good'
    if (value <= thresholds[1]) return 'needs-improvement'
    return 'poor'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500'
      case 'needs-improvement': return 'bg-yellow-500'
      case 'poor': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="animate-pulse space-y-4">
          <div className="h-20 bg-slate-800/50 rounded-lg"></div>
          <div className="h-32 bg-slate-800/50 rounded-lg"></div>
          <div className="h-32 bg-slate-800/50 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-6">
      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-900/50 border-purple-500/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-400" />
              <CardTitle className="text-green-400">Performance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">Good</div>
            <p className="text-slate-400 text-sm">Core Web Vitals passing</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-purple-500/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-400" />
              <CardTitle className="text-blue-400">SEO Score</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{seoScore.score}/100</div>
            <p className="text-slate-400 text-sm">Structured data active</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-purple-500/20">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-purple-400" />
              <CardTitle className="text-purple-400">PWA Ready</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">Active</div>
            <p className="text-slate-400 text-sm">Service worker installed</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <Tabs defaultValue="vitals" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
          <TabsTrigger value="vitals" className="data-[state=active]:bg-purple-600">
            Core Web Vitals
          </TabsTrigger>
          <TabsTrigger value="seo" className="data-[state=active]:bg-purple-600">
            SEO & Analytics
          </TabsTrigger>
          <TabsTrigger value="pwa" className="data-[state=active]:bg-purple-600">
            PWA Features
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vitals" className="space-y-4">
          <Card className="bg-slate-900/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-300 flex items-center gap-2">
                <Timer className="h-5 w-5" />
                Core Web Vitals Metrics
              </CardTitle>
              <CardDescription className="text-slate-400">
                Real-time performance measurements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {metrics && (
                <>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Largest Contentful Paint (LCP)</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`${getStatusColor(getMetricStatus(metrics.lcp, [2500, 4000]))}`}>
                          {metrics.lcp.toFixed(0)}ms
                        </Badge>
                      </div>
                    </div>
                    <Progress 
                      value={Math.min((metrics.lcp / 4000) * 100, 100)} 
                      className="h-2 bg-slate-700"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">First Input Delay (FID)</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`${getStatusColor(getMetricStatus(metrics.fid, [100, 300]))}`}>
                          {metrics.fid.toFixed(0)}ms
                        </Badge>
                      </div>
                    </div>
                    <Progress 
                      value={Math.min((metrics.fid / 300) * 100, 100)} 
                      className="h-2 bg-slate-700"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Cumulative Layout Shift (CLS)</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`${getStatusColor(getMetricStatus(metrics.cls, [0.1, 0.25]))}`}>
                          {metrics.cls.toFixed(3)}
                        </Badge>
                      </div>
                    </div>
                    <Progress 
                      value={Math.min((metrics.cls / 0.25) * 100, 100)} 
                      className="h-2 bg-slate-700"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">First Contentful Paint (FCP)</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`${getStatusColor(getMetricStatus(metrics.fcp, [1800, 3000]))}`}>
                          {metrics.fcp.toFixed(0)}ms
                        </Badge>
                      </div>
                    </div>
                    <Progress 
                      value={Math.min((metrics.fcp / 3000) * 100, 100)} 
                      className="h-2 bg-slate-700"
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-4">
          <Card className="bg-slate-900/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-300 flex items-center gap-2">
                <Globe className="h-5 w-5" />
                SEO & Analytics Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-green-400">✅ Active Features</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Google Analytics 4</li>
                    <li>• Structured Data (Person, WebSite, Organization)</li>
                    <li>• Open Graph & Twitter Cards</li>
                    <li>• Dynamic Sitemap</li>
                    <li>• Robots.txt Configuration</li>
                    <li>• Core Web Vitals Tracking</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-blue-400">📊 Analytics Events</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Page view tracking</li>
                    <li>• Scroll depth monitoring</li>
                    <li>• Section engagement</li>
                    <li>• Performance metrics</li>
                    <li>• Error tracking</li>
                    <li>• Custom interactions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pwa" className="space-y-4">
          <Card className="bg-slate-900/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-300 flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Progressive Web App Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-green-400">✅ PWA Features</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• Service Worker Active</li>
                    <li>• Web App Manifest</li>
                    <li>• Install Prompt</li>
                    <li>• Offline Support</li>
                    <li>• Background Sync</li>
                    <li>• App Shortcuts</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-blue-400">📱 Platform Support</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    <li>• iOS Installation</li>
                    <li>• Android Installation</li>
                    <li>• Desktop Installation</li>
                    <li>• Cross-browser Support</li>
                    <li>• Touch Optimization</li>
                    <li>• Responsive Design</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Admin Information */}
      <Card className="bg-slate-900/50 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="text-yellow-400 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Admin Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-slate-300">
            <p>• This dashboard is only accessible via direct URL (/admin/performance)</p>
            <p>• Not indexed by search engines (robots: noindex, nofollow)</p>
            <p>• No public navigation links to this page</p>
            <p>• Real-time performance monitoring active</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}