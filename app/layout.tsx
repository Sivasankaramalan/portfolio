import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { RevealMinimal } from "@/components/reveal-minimal"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Sivasankaramalan",
    template: "%s · Sivasankaramalan"
  },
  description: "Quality Engineering Leader – Mobile & Web Automation, Shift-Left, Reliability Engineering",
  generator: "portfolio",
  keywords: [
    "Sivasankaramalan",
    "Quality Engineering",
    "SDET",
    "Mobile Automation",
    "Shift Left",
    "Reliability",
    "Testing Leadership"
  ],
  authors: [{ name: "Sivasankaramalan" }],
  creator: "Sivasankaramalan",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Sivasankaramalan",
    description: "Quality Engineering Leader – Mobile & Web Automation, Shift-Left, Reliability Engineering",
    url: "https://example.com",
    siteName: "Sivasankaramalan",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Sivasankaramalan",
    description: "Quality Engineering Leader – Mobile & Web Automation, Shift-Left, Reliability Engineering"
  }
}

// Single unified font (formerly heading font) now used for all text
const fontUnified = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
  <body className={`${fontUnified.variable} font-sans site-gradient site-gradient-colorful`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SiteHeader />
          <RevealMinimal />
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
