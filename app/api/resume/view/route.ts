import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { RESUME_FILE_NAME } from "@/lib/resume"

// Serves the resume PDF inline so the browser displays it.
export async function GET() {
  try {
  const filePath = path.join(process.cwd(), "public", "resume", RESUME_FILE_NAME)
    const data = await fs.readFile(filePath)

  return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        // inline to open in tab; fallback filename sanitized
        "Content-Disposition": "inline; filename=\"resume.pdf\"",
        "Cache-Control": "public, max-age=3600, immutable",
      },
    })
  } catch (e) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 })
  }
}
