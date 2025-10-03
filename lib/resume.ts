// Centralized resume constants & helpers
// If you change the actual file in public/resume just ensure the pattern below still matches.

// Primary expected filename (updated to latest)
export const RESUME_FILE_NAME = "Sivasankaramalan.pdf"

// Fallback patterns we can try if the primary name changes (ordered by preference)
export const RESUME_CANDIDATE_FILES = [
	"Sivasankaramalan.pdf",
	"Sivasankaramalan_LEAD_SDET.pdf",
	"Sivasankaramalan_LEAD_SDET .pdf", // legacy note: stray space before extension
]

export const RESUME_PUBLIC_PATH = `/resume/${encodeURIComponent(RESUME_FILE_NAME)}`
export const RESUME_VIEW_URL = "/api/resume/view"
export const RESUME_DOWNLOAD_URL = "/api/resume/download"

export const DOWNLOAD_FILENAME = "Sivasankaramalan_Resume.pdf"

// Utility the API routes can use to find the first existing resume file.
export async function resolveResumeFile(fsPromises: typeof import('fs').promises, baseDir: string): Promise<string | null> {
	for (const candidate of RESUME_CANDIDATE_FILES) {
		try {
			await fsPromises.access(candidate)
			return candidate
		} catch {
			// continue
		}
	}
	return null
}
