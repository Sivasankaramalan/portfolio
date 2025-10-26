import type React from "react"
import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { RevealMinimal } from "@/components/reveal-minimal"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleAnalytics } from "@/components/analytics"
import { WebVitals } from "@/components/web-vitals"
import { PersonStructuredData, WebSiteStructuredData, OrganizationStructuredData } from "@/components/structured-data"
import { PWAInstallPrompt } from "@/components/pwa-install"
import { ServiceWorkerRegistration } from "@/components/service-worker"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Sivasankaramalan Gunasekarasivam - Quality Engineering Leader",
    template: "%s | Sivasankaramalan Gunasekarasivam"
  },
  description: "Quality Engineering Leader specializing in Mobile & Web Automation, Shift-Left Testing, and Reliability Engineering. Expert in building robust testing frameworks and leading high-performance teams.",
  generator: "Next.js",
  applicationName: "Sivasankaramalan Portfolio",
  keywords: [
    "Sivasankaramalan Gunasekarasivam",
    "Quality Engineering Leader",
    "SDET",
    "Lead SDET",
    "Mobile Test Automation",
    "Web Test Automation",
    "Shift-Left Testing",
    "Reliability Engineering",
    "Test Framework Architecture",
    "Quality Assurance Leadership",
    "Automation Testing Expert",
    "DevOps Testing",
    "Continuous Testing",
    "Performance Testing",
    "API Testing",
    "Test Strategy",
    "QA Management"
  ],
  authors: [{ name: "Sivasankaramalan Gunasekarasivam", url: "https://sivasankaramalan.dev" }],
  creator: "Sivasankaramalan Gunasekarasivam",
  publisher: "Sivasankaramalan Gunasekarasivam",
  metadataBase: new URL("https://sivasankaramalan.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sivasankaramalan.dev",
    siteName: "Sivasankaramalan Gunasekarasivam",
    title: "Sivasankaramalan Gunasekarasivam - Quality Engineering Leader",
    description: "Quality Engineering Leader specializing in Mobile & Web Automation, Shift-Left Testing, and Reliability Engineering.",
    images: [
      {
        url: "/Image/Sivasankaramalan.png",
        width: 1200,
        height: 630,
        alt: "Sivasankaramalan Gunasekarasivam - Quality Engineering Leader",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sivasankaramalan Gunasekarasivam - Quality Engineering Leader",
    description: "Quality Engineering Leader specializing in Mobile & Web Automation, Shift-Left Testing, and Reliability Engineering.",
    images: ["/Image/Sivasankaramalan.png"],
    creator: "@sivasankaramalan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/favicon.svg", sizes: "32x32", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon-192.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/icon-192.svg",
      },
    ],
  },
  verification: {
    google: "google-site-verification-token", // Replace with actual token
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
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
      <head>
        <PersonStructuredData />
        <WebSiteStructuredData />
        <OrganizationStructuredData />
      </head>
      <body className={`${fontUnified.variable} font-sans site-gradient site-gradient-colorful`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <SiteHeader />
          <RevealMinimal />
          <Suspense fallback={null}>{children}</Suspense>
          <PWAInstallPrompt />
          <ServiceWorkerRegistration />
          <GoogleAnalytics />
          <WebVitals />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
