'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Activity, Zap, Globe, Smartphone, Timer, TrendingUp } from 'lucide-react'

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

export function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [seoScore, setSeoScore] = useState<SEOMetrics>({
    score: 95,
    issues: [],
    recommendations: ['Add more structured data', 'Optimize images further']
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development mode
    setIsVisible(process.env.NODE_ENV === 'development')

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

        setMetrics(current => ({ ...current, ...metricsData } as PerformanceMetrics))
      })

      observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] })

      return () => observer.disconnect()
    }
  }, [])

  const getScoreColor = (score: number, thresholds: [number, number]) => {
    if (score <= thresholds[0]) return 'text-green-600'
    if (score <= thresholds[1]) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreStatus = (score: number, thresholds: [number, number]) => {
    if (score <= thresholds[0]) return 'Good'
    if (score <= thresholds[1]) return 'Needs Improvement'
    return 'Poor'
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 w-96 z-50">
      <Card className="bg-background/95 backdrop-blur border border-purple-500/20 shadow-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Activity className="h-4 w-4 text-purple-500" />
            Performance & SEO Monitor
          </CardTitle>
          <CardDescription className="text-xs">
            Development mode analytics dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="performance" className="text-xs">
                <Zap className="h-3 w-3 mr-1" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="seo" className="text-xs">
                <Globe className="h-3 w-3 mr-1" />
                SEO
              </TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-3 mt-3">
              {metrics ? (
                <>
                  {metrics.lcp && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs flex items-center gap-1">
                        <Timer className="h-3 w-3" />
                        LCP
                      </span>
                      <div className="text-right">
                        <div className={`text-xs font-medium ${getScoreColor(metrics.lcp, [2500, 4000])}`}>
                          {Math.round(metrics.lcp)}ms
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {getScoreStatus(metrics.lcp, [2500, 4000])}
                        </Badge>
                      </div>
                    </div>
                  )}

                  {metrics.fcp && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs flex items-center gap-1">
                        <Zap className="h-3 w-3" />
                        FCP
                      </span>
                      <div className="text-right">
                        <div className={`text-xs font-medium ${getScoreColor(metrics.fcp, [1800, 3000])}`}>
                          {Math.round(metrics.fcp)}ms
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {getScoreStatus(metrics.fcp, [1800, 3000])}
                        </Badge>
                      </div>
                    </div>
                  )}

                  {metrics.cls !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs flex items-center gap-1">
                        <Smartphone className="h-3 w-3" />
                        CLS
                      </span>
                      <div className="text-right">
                        <div className={`text-xs font-medium ${getScoreColor(metrics.cls, [0.1, 0.25])}`}>
                          {metrics.cls.toFixed(3)}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {getScoreStatus(metrics.cls, [0.1, 0.25])}
                        </Badge>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-xs text-muted-foreground">
                  Collecting performance metrics...
                </div>
              )}
            </TabsContent>

            <TabsContent value="seo" className="space-y-3 mt-3">
              <div className="flex items-center justify-between">
                <span className="text-xs flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  SEO Score
                </span>
                <div className="text-right">
                  <div className="text-xs font-medium text-green-600">
                    {seoScore.score}/100
                  </div>
                  <Progress value={seoScore.score} className="w-16 h-1" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-medium">Features Active:</div>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary" className="text-xs">Structured Data</Badge>
                  <Badge variant="secondary" className="text-xs">PWA</Badge>
                  <Badge variant="secondary" className="text-xs">Analytics</Badge>
                  <Badge variant="secondary" className="text-xs">Sitemap</Badge>
                  <Badge variant="secondary" className="text-xs">Robots.txt</Badge>
                </div>
              </div>

              {seoScore.recommendations.length > 0 && (
                <div className="space-y-1">
                  <div className="text-xs font-medium">Recommendations:</div>
                  {seoScore.recommendations.map((rec, index) => (
                    <div key={index} className="text-xs text-muted-foreground">
                      • {rec}
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}