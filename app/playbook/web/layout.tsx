import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Web Automation Playbook",
  description: "Complete guide for web application test automation using Selenium and Playwright. Learn browser architecture, locator strategies, waits, network interception, visual testing, CI/CD, and advanced patterns for scaling web testing.",
  keywords: [
    "Web Automation",
    "Selenium Tutorial",
    "Playwright Tutorial",
    "Cross-Browser Testing",
    "Web Testing Framework",
    "Selenium Grid",
    "Playwright Test Runner",
    "Web CI/CD Testing",
    "Selenium Best Practices",
    "Web Test Strategy",
    "Visual Regression Testing",
    "Web Performance Testing",
    "Page Object Model",
    "Web Test Architecture"
  ],
  openGraph: {
    title: "Web Automation Playbook - Selenium & Playwright Testing Guide",
    description: "Master web application test automation with Selenium and Playwright. Complete guide covering setup, locators, waits, network mocking, and scaling web testing.",
    type: "article",
  },
  twitter: {
    title: "Web Automation Playbook - Selenium & Playwright Testing",
    description: "Complete guide for web application test automation using Selenium and Playwright, cross-browser strategy, and CI/CD integration.",
  },
}

export default function WebPlaybookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
