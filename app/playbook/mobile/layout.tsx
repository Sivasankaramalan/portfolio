import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mobile Automation Playbook",
  description: "Complete guide for iOS and Android test automation using Appium. Learn mobile testing setup, best practices, device management, cross-platform strategies, and advanced patterns for mobile testing at scale.",
  keywords: [
    "Mobile Automation",
    "Appium Tutorial",
    "iOS Testing",
    "Android Testing", 
    "Mobile Testing Framework",
    "Cross-platform Testing",
    "Device Management",
    "Mobile CI/CD",
    "Appium Best Practices",
    "Mobile Test Strategy",
    "Real Device Testing",
    "Mobile Performance Testing",
    "Appium Grid Setup",
    "Mobile Test Architecture"
  ],
  openGraph: {
    title: "Mobile Automation Playbook - Appium & Mobile Testing Guide",
    description: "Master iOS and Android test automation with Appium. Complete guide covering setup, best practices, device management, and scaling mobile testing.",
    type: "article",
  },
  twitter: {
    title: "Mobile Automation Playbook - Appium & Mobile Testing",
    description: "Complete guide for iOS and Android test automation using Appium, device management, and mobile testing best practices.",
  },
}

export default function MobilePlaybookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}