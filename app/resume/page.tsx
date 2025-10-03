"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, ExternalLink, AlertCircle, RefreshCw } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ResumePage() {
  const [mounted, setMounted] = useState(false)
  const [pdfError, setPdfError] = useState(false)
  const [loading, setLoading] = useState(true)
  // Internal debug state (kept for potential future logging). Not rendered in UI.
  const [debugInfo, setDebugInfo] = useState("")

  // Correct static public path (served from /public)
  const staticPath = "/resume/Sivasankaramalan.pdf"
  const apiUrl = "/api/resume/view" // keep as secondary option

  useEffect(() => {
    setMounted(true)
    
    // First attempt: fetch HEAD of static file to confirm existence
    const testStatic = async () => {
      try {
        const res = await fetch(staticPath, { method: 'HEAD' })
        if (res.ok) {
          setDebugInfo(`✅ Static file OK (${res.status})`)
          return 'static'
        }
      } catch (e) {
        // ignore
      }
      // Fallback: test API route
      try {
        const apiRes = await fetch(apiUrl, { method: 'HEAD' })
        if (apiRes.ok) {
          setDebugInfo(`✅ API route OK (${apiRes.status})`)
          return 'api'
        } else {
          setDebugInfo(`❌ API route failed (${apiRes.status})`)
        }
      } catch (e) {
        setDebugInfo(`❌ Both failed (${e})`)
      }
      return null
    }
    testStatic().then(mode => {
      if (!mode) setPdfError(true)
      setLoading(false)
    })
  }, [])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="animate-pulse text-muted-foreground flex items-center gap-2 justify-center">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Loading resume...
          </div>
          {/* debugInfo intentionally not rendered */}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/#home" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Portfolio
              </Link>
            </Button>
            <h1 className="text-lg font-semibold">Resume</h1>
            {/* debugInfo hidden from UI */}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href="/api/resume/download" download className="gap-2">
                <Download className="h-4 w-4" />
                Download
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href={apiUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Open in New Tab
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* PDF Viewer */}
      <main className="container mx-auto px-4 py-6">
        <div className="mx-auto max-w-5xl">
          {pdfError && (
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="flex items-center justify-between">
                  <span>Unable to load PDF. Please use the download or "Open in New Tab" options above.</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => window.location.reload()}
                    className="ml-4"
                  >
                    Retry
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
          
          <div className="relative rounded-lg border bg-card overflow-hidden shadow-lg">
            {!pdfError ? (
              <object
                data={`${staticPath}#view=FitH`}
                type="application/pdf"
                className="w-full h-[calc(100vh-8rem)] min-h-[600px]"
                onError={() => setPdfError(true)}
              >
                <iframe
                  src={`${apiUrl}`}
                  className="w-full h-full"
                  title="Resume PDF Fallback"
                  style={{ border: 'none' }}
                  onError={() => setPdfError(true)}
                />
              </object>
            ) : (
              <div className="flex items-center justify-center bg-muted h-[600px]">
                <div className="text-center space-y-4 p-8 max-w-md">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
                  <h3 className="text-lg font-semibold">PDF Viewer Unavailable</h3>
                  <p className="text-muted-foreground">Unable to display the PDF. Use the buttons below.</p>
                  <div className="flex justify-center gap-3 pt-4">
                    <Button asChild>
                      <a href={staticPath} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />Open Static
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="/api/resume/download" download>
                        <Download className="h-4 w-4 mr-2" />Download PDF
                      </a>
                    </Button>
                  </div>
                  {/* debugInfo hidden */}
                </div>
              </div>
            )}
          </div>
          
          {/* Alternative options section */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Need to download or view in a separate tab?
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Button variant="outline" size="sm" asChild>
                <a href="/api/resume/download" download>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={staticPath} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in New Tab
                </a>
              </Button>
            </div>
            {/* debugInfo status hidden */}
          </div>
        </div>
      </main>
    </div>
  )
}