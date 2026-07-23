"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, ExternalLink, AlertCircle, RefreshCw } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { resumeUrl, RESUME_PUBLIC_PATH, RESUME_VIEW_URL, RESUME_DOWNLOAD_URL } from "@/lib/resume"

export default function ResumePage() {
  const [mounted, setMounted] = useState(false)
  const [pdfError, setPdfError] = useState(false)
  const [loading, setLoading] = useState(true)

  const staticPath = resumeUrl(RESUME_PUBLIC_PATH)
  const apiUrl = resumeUrl(RESUME_VIEW_URL)
  const downloadUrl = resumeUrl(RESUME_DOWNLOAD_URL)

  useEffect(() => {
    setMounted(true)

    const testSources = async () => {
      try {
        const res = await fetch(staticPath, { method: "HEAD", cache: "no-store" })
        if (res.ok) return "static"
      } catch {
        // fall through
      }
      try {
        const apiRes = await fetch(apiUrl, { method: "HEAD", cache: "no-store" })
        if (apiRes.ok) return "api"
      } catch {
        // fall through
      }
      return null
    }

    testSources().then((mode) => {
      if (!mode) setPdfError(true)
      setLoading(false)
    })
  }, [apiUrl, staticPath])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="animate-pulse text-muted-foreground flex items-center gap-2 justify-center">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Loading resume...
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
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
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={downloadUrl} download className="gap-2">
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

      <main className="container mx-auto px-4 py-6">
        <div className="mx-auto max-w-5xl">
          {pdfError && (
            <Alert className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <span>
                    Unable to load PDF. Please use the download or &quot;Open in New Tab&quot; options above.
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.reload()}
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
                data={`${apiUrl}#view=FitH`}
                type="application/pdf"
                className="w-full h-[calc(100vh-8rem)] min-h-[600px]"
                onError={() => setPdfError(true)}
              >
                <iframe
                  src={apiUrl}
                  className="w-full h-full"
                  title="Resume PDF Fallback"
                  style={{ border: "none" }}
                  onError={() => setPdfError(true)}
                />
              </object>
            ) : (
              <div className="flex items-center justify-center bg-muted h-[600px]">
                <div className="text-center space-y-4 p-8 max-w-md">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
                  <h3 className="text-lg font-semibold">PDF Viewer Unavailable</h3>
                  <p className="text-muted-foreground">
                    Unable to display the PDF. Use the buttons below.
                  </p>
                  <div className="flex justify-center gap-3 pt-4">
                    <Button asChild>
                      <a href={apiUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open PDF
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href={downloadUrl} download>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Need to download or view in a separate tab?
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <Button variant="outline" size="sm" asChild>
                <a href={downloadUrl} download>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={apiUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in New Tab
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
