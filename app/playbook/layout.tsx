import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Automation Playbooks",
  description: "Comprehensive implementation guides and strategic patterns for test automation across Mobile, Web, and API testing platforms. Learn Appium, Selenium, Playwright, and modern testing frameworks.",
  keywords: [
    "Automation Playbooks",
    "Test Automation Guides", 
    "Mobile Automation Tutorial",
    "Web Automation Guide",
    "API Testing Guide",
    "Appium Tutorial",
    "Selenium Guide",
    "Playwright Tutorial",
    "Testing Best Practices",
    "Automation Framework Setup",
    "CI/CD Testing Integration",
    "Quality Engineering Playbooks"
  ],
  openGraph: {
    title: "Automation Playbooks - Test Automation Guides",
    description: "Comprehensive implementation guides for Mobile, Web, and API test automation. Master Appium, Selenium, Playwright and modern testing frameworks.",
    type: "website",
  },
  twitter: {
    title: "Automation Playbooks - Test Automation Guides",
    description: "Comprehensive guides for Mobile, Web, and API test automation frameworks and best practices.",
  },
}

export default function PlaybookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}