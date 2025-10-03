import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { RESUME_FILE_NAME, DOWNLOAD_FILENAME, RESUME_CANDIDATE_FILES } from "@/lib/resume"

// Forces browser download of the resume PDF.
export async function GET() {
  try {
    const resumeDir = path.join(process.cwd(), "public", "resume")
    let finalName: string | null = null
    for (const candidate of RESUME_CANDIDATE_FILES) {
      const p = path.join(resumeDir, candidate)
      try {
        const stat = await fs.stat(p)
        if (stat.isFile()) { finalName = candidate; break }
      } catch {}
    }
    if (!finalName) throw new Error("No resume file found among candidates")
    const data = await fs.readFile(path.join(resumeDir, finalName))

    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
  "Content-Disposition": `attachment; filename="${DOWNLOAD_FILENAME}"`,
        "Cache-Control": "public, max-age=3600, immutable",
      },
    })
  } catch (e) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 })
  }
}
