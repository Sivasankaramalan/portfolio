// Content Optimization Pipeline
'use client'

import { useCallback, useRef, useEffect, useState } from 'react'

interface OptimizationTask {
  id: string
  type: 'image' | 'text' | 'css' | 'js' | 'html'
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  startTime?: number
  endTime?: number
  originalSize?: number
  optimizedSize?: number
  error?: string
}

interface OptimizationResult {
  success: boolean
  originalSize: number
  optimizedSize: number
  compressionRatio: number
  timeMs: number
  error?: string
}

class ContentOptimizer {
  private queue: OptimizationTask[] = []
  private workers: Worker[] = []
  private maxConcurrent = 4
  private processing = new Set<string>()

  constructor() {
    this.initializeWorkers()
  }

  private initializeWorkers() {
    if (typeof window === 'undefined') return

    // Create web workers for CPU-intensive optimization tasks
    for (let i = 0; i < this.maxConcurrent; i++) {
      try {
        // In a real implementation, you'd have separate worker files
        const workerCode = `
          self.onmessage = function(e) {
            const { task, data } = e.data;
            
            try {
              let result;
              switch(task.type) {
                case 'image':
                  result = optimizeImage(data);
                  break;
                case 'text':
                  result = compressText(data);
                  break;
                case 'css':
                  result = optimizeCSS(data);
                  break;
                case 'js':
                  result = optimizeJS(data);
                  break;
                default:
                  result = { success: false, error: 'Unknown task type' };
              }
              
              self.postMessage({ taskId: task.id, result });
            } catch (error) {
              self.postMessage({ 
                taskId: task.id, 
                result: { success: false, error: error.message } 
              });
            }
          };
          
          function optimizeImage(data) {
            // Simulate image optimization
            const originalSize = data.length;
            const optimizedSize = Math.floor(originalSize * 0.7); // 30% reduction
            return {
              success: true,
              originalSize,
              optimizedSize,
              compressionRatio: optimizedSize / originalSize,
              data: data.slice(0, optimizedSize) // Simulated compressed data
            };
          }
          
          function compressText(text) {
            // Simple text compression simulation
            const originalSize = text.length;
            const compressed = text.replace(/\\s+/g, ' ').trim();
            const optimizedSize = compressed.length;
            return {
              success: true,
              originalSize,
              optimizedSize,
              compressionRatio: optimizedSize / originalSize,
              data: compressed
            };
          }
          
          function optimizeCSS(css) {
            // CSS minification simulation
            const originalSize = css.length;
            const minified = css
              .replace(/\\/\\*[\\s\\S]*?\\*\\//g, '') // Remove comments
              .replace(/\\s+/g, ' ') // Collapse whitespace
              .replace(/;\\s*}/g, '}') // Remove unnecessary semicolons
              .trim();
            const optimizedSize = minified.length;
            return {
              success: true,
              originalSize,
              optimizedSize,
              compressionRatio: optimizedSize / originalSize,
              data: minified
            };
          }
          
          function optimizeJS(js) {
            // Basic JS minification simulation
            const originalSize = js.length;
            const minified = js
              .replace(/\\/\\/.*$/gm, '') // Remove single-line comments
              .replace(/\\/\\*[\\s\\S]*?\\*\\//g, '') // Remove multi-line comments
              .replace(/\\s+/g, ' ') // Collapse whitespace
              .trim();
            const optimizedSize = minified.length;
            return {
              success: true,
              originalSize,
              optimizedSize,
              compressionRatio: optimizedSize / originalSize,
              data: minified
            };
          }
        `;

        const blob = new Blob([workerCode], { type: 'application/javascript' })
        const worker = new Worker(URL.createObjectURL(blob))
        
        worker.onmessage = (e) => {
          this.handleWorkerResult(e.data.taskId, e.data.result)
        }
        
        this.workers.push(worker)
      } catch (error) {
        console.warn('Could not create worker:', error)
      }
    }
  }

  private handleWorkerResult(taskId: string, result: OptimizationResult & { data?: any }) {
    const task = this.queue.find(t => t.id === taskId)
    if (!task) return

    task.endTime = Date.now()
    task.originalSize = result.originalSize
    task.optimizedSize = result.optimizedSize

    if (result.success) {
      task.status = 'completed'
      task.progress = 100
    } else {
      task.status = 'failed'
      task.error = result.error
    }

    this.processing.delete(taskId)
    this.processQueue()

    // Dispatch completion event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('optimization-complete', {
        detail: { task, result }
      }))
    }
  }

  addTask(type: OptimizationTask['type'], data: any, priority: OptimizationTask['priority'] = 'medium'): string {
    const task: OptimizationTask = {
      id: `opt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      priority,
      status: 'pending',
      progress: 0
    }

    // Insert based on priority
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
    const insertIndex = this.queue.findIndex(t => 
      priorityOrder[t.priority] > priorityOrder[priority]
    )

    if (insertIndex === -1) {
      this.queue.push(task)
    } else {
      this.queue.splice(insertIndex, 0, task)
    }

    // Store data reference
    ;(task as any)._data = data

    this.processQueue()
    return task.id
  }

  private processQueue() {
    if (this.processing.size >= this.maxConcurrent) return

    const nextTask = this.queue.find(t => 
      t.status === 'pending' && !this.processing.has(t.id)
    )

    if (!nextTask || this.workers.length === 0) return

    const availableWorker = this.workers.find(w => w)
    if (!availableWorker) return

    this.processing.add(nextTask.id)
    nextTask.status = 'processing'
    nextTask.startTime = Date.now()
    nextTask.progress = 10

    // Send task to worker
    availableWorker.postMessage({
      task: nextTask,
      data: (nextTask as any)._data
    })

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      if (nextTask.status === 'processing' && nextTask.progress < 90) {
        nextTask.progress += Math.random() * 20
        if (nextTask.progress > 90) nextTask.progress = 90
      } else {
        clearInterval(progressInterval)
      }
    }, 100)

    // Continue processing if more capacity
    if (this.processing.size < this.maxConcurrent) {
      this.processQueue()
    }
  }

  getQueueStatus() {
    const stats = {
      total: this.queue.length,
      pending: this.queue.filter(t => t.status === 'pending').length,
      processing: this.queue.filter(t => t.status === 'processing').length,
      completed: this.queue.filter(t => t.status === 'completed').length,
      failed: this.queue.filter(t => t.status === 'failed').length,
      totalSavings: 0,
      avgCompressionRatio: 0
    }

    const completedTasks = this.queue.filter(t => 
      t.status === 'completed' && t.originalSize && t.optimizedSize
    )

    if (completedTasks.length > 0) {
      stats.totalSavings = completedTasks.reduce(
        (sum, task) => sum + (task.originalSize! - task.optimizedSize!), 0
      )
      stats.avgCompressionRatio = completedTasks.reduce(
        (sum, task) => sum + (task.optimizedSize! / task.originalSize!), 0
      ) / completedTasks.length
    }

    return stats
  }

  getTasks(): OptimizationTask[] {
    return [...this.queue]
  }

  removeTask(taskId: string): boolean {
    const index = this.queue.findIndex(t => t.id === taskId)
    if (index === -1) return false

    const task = this.queue[index]
    if (task.status === 'processing') {
      // Can't remove processing task, mark for cancellation
      return false
    }

    this.queue.splice(index, 1)
    return true
  }

  clearCompleted(): number {
    const initialLength = this.queue.length
    this.queue = this.queue.filter(t => t.status !== 'completed')
    return initialLength - this.queue.length
  }

  destroy() {
    this.workers.forEach(worker => worker.terminate())
    this.workers = []
    this.queue = []
    this.processing.clear()
  }
}

// Singleton instance
let contentOptimizer: ContentOptimizer | null = null

export function useContentOptimization() {
  const [tasks, setTasks] = useState<OptimizationTask[]>([])
  const [queueStats, setQueueStats] = useState<any>({})
  const intervalRef = useRef<NodeJS.Timeout>()

  const getOptimizer = useCallback(() => {
    if (!contentOptimizer && typeof window !== 'undefined') {
      contentOptimizer = new ContentOptimizer()
    }
    return contentOptimizer
  }, [])

  const optimizeContent = useCallback((
    type: OptimizationTask['type'], 
    data: any, 
    priority: OptimizationTask['priority'] = 'medium'
  ) => {
    const optimizer = getOptimizer()
    return optimizer ? optimizer.addTask(type, data, priority) : null
  }, [getOptimizer])

  const removeTask = useCallback((taskId: string) => {
    const optimizer = getOptimizer()
    return optimizer ? optimizer.removeTask(taskId) : false
  }, [getOptimizer])

  const clearCompleted = useCallback(() => {
    const optimizer = getOptimizer()
    return optimizer ? optimizer.clearCompleted() : 0
  }, [getOptimizer])

  // Convenience methods for specific content types
  const optimizeImage = useCallback((imageData: any, priority?: OptimizationTask['priority']) => {
    return optimizeContent('image', imageData, priority)
  }, [optimizeContent])

  const optimizeText = useCallback((text: string, priority?: OptimizationTask['priority']) => {
    return optimizeContent('text', text, priority)
  }, [optimizeContent])

  const optimizeCSS = useCallback((css: string, priority?: OptimizationTask['priority']) => {
    return optimizeContent('css', css, priority)
  }, [optimizeContent])

  const optimizeJS = useCallback((js: string, priority?: OptimizationTask['priority']) => {
    return optimizeContent('js', js, priority)
  }, [optimizeContent])

  useEffect(() => {
    const optimizer = getOptimizer()
    if (!optimizer) return

    // Listen for optimization completion events
    const handleOptimizationComplete = (event: CustomEvent) => {
      // Force update of tasks and stats
      setTasks(optimizer.getTasks())
      setQueueStats(optimizer.getQueueStatus())
    }

    window.addEventListener('optimization-complete', handleOptimizationComplete as EventListener)

    // Update tasks and stats periodically
    intervalRef.current = setInterval(() => {
      setTasks(optimizer.getTasks())
      setQueueStats(optimizer.getQueueStatus())
    }, 1000)

    return () => {
      window.removeEventListener('optimization-complete', handleOptimizationComplete as EventListener)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [getOptimizer])

  useEffect(() => {
    return () => {
      if (contentOptimizer) {
        contentOptimizer.destroy()
        contentOptimizer = null
      }
    }
  }, [])

  return {
    tasks,
    queueStats,
    optimizeContent,
    optimizeImage,
    optimizeText,
    optimizeCSS,
    optimizeJS,
    removeTask,
    clearCompleted
  }
}

export { ContentOptimizer }