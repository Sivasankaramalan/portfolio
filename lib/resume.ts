// Centralized resume constants & helpers
// If you change the actual file in public/resume just ensure the pattern below still matches.

export const RESUME_FILE_NAME = "Sivasankaramalan.pdf"

export const RESUME_CANDIDATE_FILES = [
  "Sivasankaramalan.pdf",
  "Sivasankaramalan_LEAD_SDET.pdf",
  "Sivasankaramalan_LEAD_SDET .pdf", // legacy note: stray space before extension
]

export const RESUME_PUBLIC_PATH = `/resume/${encodeURIComponent(RESUME_FILE_NAME)}`
export const RESUME_VIEW_URL = "/api/resume/view"
export const RESUME_DOWNLOAD_URL = "/api/resume/download"

export const DOWNLOAD_FILENAME = "Sivasankaramalan_Resume.pdf"

/** Bump when replacing the PDF so browsers skip stale caches. */
export const RESUME_VERSION = "2026-07-24"

export function resumeUrl(path: string = RESUME_VIEW_URL) {
  const sep = path.includes("?") ? "&" : "?"
  return `${path}${sep}v=${RESUME_VERSION}`
}

export async function resolveResumeFile(
  fsPromises: typeof import("fs").promises,
  baseDir: string
): Promise<string | null> {
  const path = await import("path")
  for (const candidate of RESUME_CANDIDATE_FILES) {
    try {
      await fsPromises.access(path.join(baseDir, candidate))
      return candidate
    } catch {
      // continue
    }
  }
  return null
}
