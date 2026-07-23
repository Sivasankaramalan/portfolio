import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { RESUME_CANDIDATE_FILES } from "@/lib/resume"

// Serves the resume PDF inline so the browser displays it.
export async function GET() {
  try {
    const resumeDir = path.join(process.cwd(), "public", "resume")
    let finalName: string | null = null
    let mtimeMs = Date.now()

    for (const candidate of RESUME_CANDIDATE_FILES) {
      const p = path.join(resumeDir, candidate)
      try {
        const stat = await fs.stat(p)
        if (stat.isFile()) {
          finalName = candidate
          mtimeMs = stat.mtimeMs
          break
        }
      } catch {
        // try next candidate
      }
    }

    if (!finalName) throw new Error("No resume file found among candidates")
    const data = await fs.readFile(path.join(resumeDir, finalName))
    const etag = `"resume-${Math.trunc(mtimeMs)}-${data.byteLength}"`

    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${finalName}"`,
        // Revalidate so replacing the PDF is visible without hard-cache traps
        "Cache-Control": "public, max-age=0, must-revalidate",
        ETag: etag,
        "Last-Modified": new Date(mtimeMs).toUTCString(),
        "X-Frame-Options": "SAMEORIGIN",
        "Content-Security-Policy": "frame-ancestors 'self'",
      },
    })
  } catch (e) {
    console.error("Error serving resume:", e)
    return NextResponse.json({ error: "Resume not found" }, { status: 404 })
  }
}
