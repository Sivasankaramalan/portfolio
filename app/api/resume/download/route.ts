import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import { RESUME_FILE_NAME, DOWNLOAD_FILENAME } from "@/lib/resume"

// Forces browser download of the resume PDF.
export async function GET() {
  try {
  const filePath = path.join(process.cwd(), "public", "resume", RESUME_FILE_NAME)
    const data = await fs.readFile(filePath)

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
