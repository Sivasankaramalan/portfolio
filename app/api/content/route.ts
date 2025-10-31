import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

// Advanced content management with ISR
interface ContentItem {
  id: string
  type: 'experience' | 'project' | 'skill' | 'achievement' | 'certification'
  title: string
  content: any
  metadata: {
    lastModified: string
    version: number
    priority: number
    tags: string[]
    status: 'draft' | 'published' | 'archived'
  }
  performance: {
    views: number
    engagement: number
    lastAccessed: string
  }
}

// In-memory cache with persistence (in production, use Redis/Database)
let contentCache = new Map<string, ContentItem>()
let performanceMetrics = new Map<string, any>()

// Initialize with your current content
const initializeContent = () => {
  const defaultContent: ContentItem[] = [
    {
      id: 'lead-sdet-experience',
      type: 'experience',
      title: 'Lead SDET - Quality Engineering Excellence',
      content: {
        company: 'Tech Innovators Inc.',
        duration: '2023 - Present',
        highlights: [
          'Led test automation initiatives across 15+ microservices',
          'Implemented shift-left testing reducing bugs by 60%',
          'Established CI/CD pipelines with 99.9% reliability',
          'Mentored team of 8 SDETs and QA engineers'
        ],
        technologies: ['Appium', 'Selenium', 'Playwright', 'Docker', 'Kubernetes', 'Jenkins']
      },
      metadata: {
        lastModified: new Date().toISOString(),
        version: 1,
        priority: 10,
        tags: ['leadership', 'automation', 'quality'],
        status: 'published'
      },
      performance: {
        views: 0,
        engagement: 0,
        lastAccessed: new Date().toISOString()
      }
    },
    {
      id: 'mobile-automation-framework',
      type: 'project',
      title: 'Enterprise Mobile Test Automation Framework',
      content: {
        description: 'Architected and developed a comprehensive mobile test automation framework supporting iOS and Android applications across multiple environments.',
        features: [
          'Cross-platform test execution (iOS/Android)',
          'Parallel test execution with device farms',
          'Real-time reporting and analytics',
          'Integration with CI/CD pipelines',
          'Custom test data management'
        ],
        technologies: ['Appium', 'WebDriverIO', 'Docker', 'AWS Device Farm', 'Allure Reports'],
        impact: {
          testCoverage: '85%',
          executionTime: '70% reduction',
          bugDetection: '45% increase'
        }
      },
      metadata: {
        lastModified: new Date().toISOString(),
        version: 1,
        priority: 9,
        tags: ['mobile', 'automation', 'framework'],
        status: 'published'
      },
      performance: {
        views: 0,
        engagement: 0,
        lastAccessed: new Date().toISOString()
      }
    }
  ]

  defaultContent.forEach(item => {
    contentCache.set(item.id, item)
  })
}

// Initialize content on module load
initializeContent()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const id = searchParams.get('id')
    const includeMetrics = searchParams.get('metrics') === 'true'

    // Single item request
    if (id) {
      const item = contentCache.get(id)
      if (!item) {
        return NextResponse.json({ error: 'Content not found' }, { status: 404 })
      }

      // Update performance metrics
      item.performance.views++
      item.performance.lastAccessed = new Date().toISOString()
      contentCache.set(id, item)

      const response = includeMetrics ? item : { ...item, performance: undefined }
      return NextResponse.json(response)
    }

    // List items with filtering
    let items = Array.from(contentCache.values())
    
    if (type) {
      items = items.filter(item => item.type === type)
    }

    // Sort by priority and last modified
    items.sort((a, b) => {
      if (a.metadata.priority !== b.metadata.priority) {
        return b.metadata.priority - a.metadata.priority
      }
      return new Date(b.metadata.lastModified).getTime() - new Date(a.metadata.lastModified).getTime()
    })

    // Filter published content for public API
    const publishedItems = items.filter(item => item.metadata.status === 'published')
    
    const response = includeMetrics 
      ? publishedItems 
      : publishedItems.map(item => ({ ...item, performance: undefined }))

    return NextResponse.json({
      items: response,
      total: response.length,
      lastUpdated: new Date().toISOString()
    })

  } catch (error) {
    console.error('Content API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body

    switch (action) {
      case 'create':
      case 'update':
        const item: ContentItem = {
          ...data,
          id: data.id || `${data.type}-${Date.now()}`,
          metadata: {
            ...data.metadata,
            lastModified: new Date().toISOString(),
            version: (data.metadata?.version || 0) + 1
          },
          performance: data.performance || {
            views: 0,
            engagement: 0,
            lastAccessed: new Date().toISOString()
          }
        }

        contentCache.set(item.id, item)
        
        // Revalidate relevant pages
        revalidateTag('content')
        revalidateTag(`content-${item.type}`)
        revalidateTag(`content-${item.id}`)

        return NextResponse.json({ success: true, item })

      case 'delete':
        const { id } = data
        if (contentCache.has(id)) {
          contentCache.delete(id)
          revalidateTag('content')
          return NextResponse.json({ success: true })
        }
        return NextResponse.json({ error: 'Content not found' }, { status: 404 })

      case 'analytics':
        const { itemId, event, value } = data
        const analyticsItem = contentCache.get(itemId)
        if (analyticsItem) {
          switch (event) {
            case 'view':
              analyticsItem.performance.views++
              break
            case 'engagement':
              analyticsItem.performance.engagement += value || 1
              break
          }
          analyticsItem.performance.lastAccessed = new Date().toISOString()
          contentCache.set(itemId, analyticsItem)
        }
        return NextResponse.json({ success: true })

      case 'performance-metrics':
        const metrics = Array.from(contentCache.values()).map(item => ({
          id: item.id,
          type: item.type,
          title: item.title,
          performance: item.performance,
          priority: item.metadata.priority
        }))
        return NextResponse.json({ metrics })

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

  } catch (error) {
    console.error('Content API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Bulk operations endpoint
export async function PUT(request: NextRequest) {
  try {
    const { action, items } = await request.json()

    switch (action) {
      case 'bulk-update':
        items.forEach((item: ContentItem) => {
          const updated = {
            ...item,
            metadata: {
              ...item.metadata,
              lastModified: new Date().toISOString(),
              version: (item.metadata?.version || 0) + 1
            }
          }
          contentCache.set(item.id, updated)
        })
        revalidateTag('content')
        return NextResponse.json({ success: true, updated: items.length })

      case 'reorder':
        items.forEach((item: { id: string; priority: number }) => {
          const existing = contentCache.get(item.id)
          if (existing) {
            existing.metadata.priority = item.priority
            existing.metadata.lastModified = new Date().toISOString()
            contentCache.set(item.id, existing)
          }
        })
        revalidateTag('content')
        return NextResponse.json({ success: true })

      default:
        return NextResponse.json({ error: 'Invalid bulk action' }, { status: 400 })
    }

  } catch (error) {
    console.error('Bulk Content API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}