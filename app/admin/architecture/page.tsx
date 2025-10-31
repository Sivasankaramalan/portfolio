import ArchitecturalDashboard from '@/components/architectural-dashboard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'System Architecture | Sivasankaramalan',
  description: 'Advanced ISR content management system architecture dashboard',
  robots: 'noindex, nofollow', // Keep private
}

export default function ArchitecturePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          System Architecture Dashboard
        </h1>
        <p className="text-muted-foreground">
          Advanced ISR Content Management System with intelligent caching, real-time optimization, and automated error recovery
        </p>
      </div>
      
      <ArchitecturalDashboard />
    </div>
  )
}