// Master Architectural Control Dashboard
'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useAdvancedPerformance } from '@/components/advanced-performance-system'
import { useContentOptimization } from '@/components/content-optimization-pipeline'
import { useErrorRecovery, ErrorBoundary } from '@/components/error-recovery-system'
import { 
  Activity, 
  Zap, 
  Shield, 
  Layers, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Clock,
  Database,
  Cpu,
  Network
} from 'lucide-react'

export default function ArchitecturalDashboard() {
  const { metrics, cacheStats, alerts, clearAlerts } = useAdvancedPerformance()
  const { tasks, queueStats, clearCompleted } = useContentOptimization()
  const { errors, errorStats, clearErrors } = useErrorRecovery()
  const [systemHealth, setSystemHealth] = useState<'excellent' | 'good' | 'warning' | 'critical'>('good')

  // Calculate overall system health
  useEffect(() => {
    const criticalErrors = errors.filter(e => e.severity === 'critical' && !e.recovered).length
    const highErrors = errors.filter(e => e.severity === 'high' && !e.recovered).length
    const criticalAlerts = alerts.filter(a => a.level === 'poor').length
    const processingTasks = tasks.filter(t => t.status === 'processing').length

    if (criticalErrors > 0 || criticalAlerts > 5) {
      setSystemHealth('critical')
    } else if (highErrors > 2 || criticalAlerts > 2 || processingTasks > 10) {
      setSystemHealth('warning')
    } else if (highErrors === 0 && criticalAlerts === 0 && processingTasks < 5) {
      setSystemHealth('excellent')
    } else {
      setSystemHealth('good')
    }
  }, [errors, alerts, tasks])

  const getHealthColor = (health: typeof systemHealth) => {
    switch (health) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200'
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'critical': return 'text-red-600 bg-red-50 border-red-200'
    }
  }

  const getHealthIcon = (health: typeof systemHealth) => {
    switch (health) {
      case 'excellent': return <CheckCircle className="h-5 w-5" />
      case 'good': return <Activity className="h-5 w-5" />
      case 'warning': return <AlertTriangle className="h-5 w-5" />
      case 'critical': return <XCircle className="h-5 w-5" />
    }
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`
    return `${(ms / 60000).toFixed(1)}m`
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        {/* System Health Overview */}
        <Card className={`border-2 ${getHealthColor(systemHealth)}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getHealthIcon(systemHealth)}
              System Health: {systemHealth.charAt(0).toUpperCase() + systemHealth.slice(1)}
            </CardTitle>
            <CardDescription>
              Advanced ISR Content Management Architecture Status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{errorStats.recoveryRate ? (errorStats.recoveryRate * 100).toFixed(1) : '0'}%</div>
                <div className="text-sm text-muted-foreground">Error Recovery Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{cacheStats.avgHitRate?.toFixed(1) || '0'}</div>
                <div className="text-sm text-muted-foreground">Avg Cache Hit Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{queueStats.avgCompressionRatio ? (queueStats.avgCompressionRatio * 100).toFixed(1) : '0'}%</div>
                <div className="text-sm text-muted-foreground">Compression Ratio</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{formatBytes(queueStats.totalSavings || 0)}</div>
                <div className="text-sm text-muted-foreground">Space Saved</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="optimization" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Optimization
            </TabsTrigger>
            <TabsTrigger value="errors" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Error Recovery
            </TabsTrigger>
            <TabsTrigger value="architecture" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Architecture
            </TabsTrigger>
          </TabsList>

          {/* Performance Monitoring Tab */}
          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Cache Performance</CardTitle>
                  <Database className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{cacheStats.totalEntries || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {formatBytes(cacheStats.memoryUsage * 1024 * 1024 || 0)} memory used
                  </p>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs">
                      <span>Hit Rate</span>
                      <span>{cacheStats.avgHitRate?.toFixed(1) || '0'}%</span>
                    </div>
                    <Progress value={cacheStats.avgHitRate || 0} className="mt-1" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Performance Metrics</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metrics.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Active measurements
                  </p>
                  <div className="mt-2 space-y-1">
                    {['performance', 'user', 'business', 'technical'].map(category => {
                      const count = metrics.filter(m => m.category === category).length
                      return (
                        <div key={category} className="flex justify-between text-xs">
                          <span className="capitalize">{category}</span>
                          <Badge variant="outline" className="h-4 text-xs">
                            {count}
                          </Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Alerts</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{alerts.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Performance alerts
                  </p>
                  {alerts.length > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 w-full" 
                      onClick={clearAlerts}
                    >
                      Clear Alerts
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recent Alerts */}
            {alerts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Performance Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {alerts.slice(-5).map((alert, index) => (
                      <Alert key={index} variant={alert.level === 'poor' ? 'destructive' : 'default'}>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>{alert.metric.name}</AlertTitle>
                        <AlertDescription>
                          Value: {alert.metric.value.toFixed(2)} (Threshold: {alert.metric.threshold.good})
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Content Optimization Tab */}
          <TabsContent value="optimization" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Queue Status</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{queueStats.total || 0}</div>
                  <p className="text-xs text-muted-foreground">Total tasks</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Pending</span>
                      <Badge variant="secondary">{queueStats.pending || 0}</Badge>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Processing</span>
                      <Badge variant="default">{queueStats.processing || 0}</Badge>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Completed</span>
                      <Badge variant="outline">{queueStats.completed || 0}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Optimization Savings</CardTitle>
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatBytes(queueStats.totalSavings || 0)}</div>
                  <p className="text-xs text-muted-foreground">Space saved</p>
                  {queueStats.avgCompressionRatio && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs">
                        <span>Compression</span>
                        <span>{(queueStats.avgCompressionRatio * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={queueStats.avgCompressionRatio * 100} className="mt-1" />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Task Types</CardTitle>
                  <Layers className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {['image', 'text', 'css', 'js', 'html'].map(type => {
                      const count = tasks.filter(t => t.type === type).length
                      return (
                        <div key={type} className="flex justify-between text-xs">
                          <span className="uppercase">{type}</span>
                          <Badge variant="outline">{count}</Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Actions</CardTitle>
                  <Network className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full" 
                      onClick={clearCompleted}
                      disabled={!queueStats.completed}
                    >
                      Clear Completed ({queueStats.completed || 0})
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Active Tasks */}
            {tasks.filter(t => t.status === 'processing').length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Active Optimization Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {tasks.filter(t => t.status === 'processing').map(task => (
                      <div key={task.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{task.type.toUpperCase()} Task</span>
                          <Badge variant="default">{task.priority}</Badge>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Progress: {task.progress.toFixed(0)}%</span>
                          {task.startTime && (
                            <span>Running: {formatDuration(Date.now() - task.startTime)}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Error Recovery Tab */}
          <TabsContent value="errors" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Error Statistics</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{errorStats.total || 0}</div>
                  <p className="text-xs text-muted-foreground">Total errors captured</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Recent (1h)</span>
                      <Badge variant="secondary">{errorStats.recent || 0}</Badge>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Recovered</span>
                      <Badge variant="outline" className="text-green-600">{errorStats.recovered || 0}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recovery Rate</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {errorStats.recoveryRate ? (errorStats.recoveryRate * 100).toFixed(1) : '0'}%
                  </div>
                  <p className="text-xs text-muted-foreground">Automatic recovery success</p>
                  <Progress value={errorStats.recoveryRate * 100 || 0} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Error Types</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {errorStats.byType && Object.entries(errorStats.byType).map(([type, count]) => (
                      <div key={type} className="flex justify-between text-xs">
                        <span className="capitalize">{type}</span>
                        <Badge variant="outline">{count as number}</Badge>
                      </div>
                    ))}
                  </div>
                  {errorStats.total > 0 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 w-full" 
                      onClick={clearErrors}
                    >
                      Clear Error Log
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Recent Errors */}
            {errors.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Error Recovery Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {errors.slice(-5).map(error => (
                      <Alert key={error.id} variant={error.recovered ? 'default' : 'destructive'}>
                        {error.recovered ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                        <AlertTitle>
                          {error.type.toUpperCase()} Error
                          {error.recovered && (
                            <Badge variant="outline" className="ml-2 text-green-600">Recovered</Badge>
                          )}
                        </AlertTitle>
                        <AlertDescription>
                          {error.message}
                          {error.recoveryStrategy && (
                            <div className="text-xs mt-1">
                              Recovery: {error.recoveryStrategy} (Attempts: {error.recoveryAttempts})
                            </div>
                          )}
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Architecture Overview Tab */}
          <TabsContent value="architecture" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Advanced ISR Content Management Architecture</CardTitle>
                <CardDescription>
                  Enterprise-grade system with intelligent caching, real-time optimization, and automated error recovery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Core Components</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">ISR Content Management API</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Advanced Performance Monitoring</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Content Optimization Pipeline</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Error Recovery System</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Intelligent Caching Layer</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Architecture Benefits</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Dynamic content updates without rebuilds</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm">Automatic content optimization</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Self-healing error recovery</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-purple-600" />
                        <span className="text-sm">Enterprise-grade caching</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-red-600" />
                        <span className="text-sm">Real-time performance insights</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Scalability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>• Redis-ready caching architecture</div>
                    <div>• Worker-based content processing</div>
                    <div>• Horizontal scaling support</div>
                    <div>• Load balancing compatible</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>• Intelligent cache eviction (LRU)</div>
                    <div>• Content compression pipeline</div>
                    <div>• Real-time metrics collection</div>
                    <div>• Performance threshold alerting</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Reliability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>• Automatic error recovery</div>
                    <div>• Graceful degradation</div>
                    <div>• Circuit breaker patterns</div>
                    <div>• Health monitoring</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  )
}