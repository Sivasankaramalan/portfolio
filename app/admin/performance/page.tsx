import type { Metadata } from "next"
import { AdminPerformanceDashboard } from "@/components/admin-performance-dashboard"

export const metadata: Metadata = {
  title: "Performance Monitor | Admin Dashboard",
  description: "Internal performance monitoring and analytics dashboard",
  robots: {
    index: false,
    follow: false,
  },
}

export default function PerformanceMonitorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950/60 via-slate-900/70 to-pink-950/60">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent mb-4">
              Performance & Analytics Monitor
            </h1>
            <p className="text-slate-300 text-lg">
              Internal development and production performance monitoring dashboard
            </p>
          </div>
          
          <div className="grid gap-6">
            {/* Performance Dashboard Component */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                Real-Time Performance Metrics
              </h2>
              <AdminPerformanceDashboard />
            </div>
            
            {/* Additional Admin Info */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                Monitoring Information
              </h2>
              <div className="grid md:grid-cols-2 gap-4 text-slate-300">
                <div>
                  <h3 className="text-lg font-medium text-purple-400 mb-2">Core Web Vitals</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• LCP (Largest Contentful Paint): &lt; 2.5s target</li>
                    <li>• FID (First Input Delay): &lt; 100ms target</li>
                    <li>• CLS (Cumulative Layout Shift): &lt; 0.1 target</li>
                    <li>• FCP (First Contentful Paint): &lt; 1.8s target</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-purple-400 mb-2">Analytics Features</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Google Analytics 4 integration</li>
                    <li>• Performance metrics tracking</li>
                    <li>• User engagement monitoring</li>
                    <li>• Error tracking and reporting</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* SEO Status */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">
                SEO Optimization Status
              </h2>
              <div className="grid md:grid-cols-3 gap-4 text-slate-300">
                <div>
                  <h3 className="text-lg font-medium text-purple-400 mb-2">Structured Data</h3>
                  <ul className="space-y-1 text-sm">
                    <li>✅ Person Schema</li>
                    <li>✅ WebSite Schema</li>
                    <li>✅ Organization Schema</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-purple-400 mb-2">Technical SEO</h3>
                  <ul className="space-y-1 text-sm">
                    <li>✅ Dynamic Sitemap</li>
                    <li>✅ Robots.txt</li>
                    <li>✅ Meta Tags</li>
                    <li>✅ Open Graph</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-purple-400 mb-2">PWA Features</h3>
                  <ul className="space-y-1 text-sm">
                    <li>✅ Service Worker</li>
                    <li>✅ Web Manifest</li>
                    <li>✅ Install Prompt</li>
                    <li>✅ Offline Support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              This page is not indexed by search engines and is not linked in the public navigation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}