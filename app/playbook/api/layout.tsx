import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "API Automation Playbook",
  description: "Complete guide for REST and GraphQL API test automation using REST Assured, Postman/Newman, and modern tooling. Learn authentication strategies, contract testing, mocking, security testing, and performance testing at scale.",
  keywords: [
    "API Automation",
    "REST Assured Tutorial",
    "Postman Newman",
    "GraphQL Testing",
    "API Testing Framework",
    "Contract Testing",
    "Pact Testing",
    "API CI/CD Testing",
    "API Security Testing",
    "API Test Strategy",
    "API Load Testing",
    "k6 Performance Testing",
    "Service Virtualization",
    "API Test Architecture"
  ],
  openGraph: {
    title: "API Automation Playbook - REST & GraphQL Testing Guide",
    description: "Master REST and GraphQL API test automation with REST Assured, Postman/Newman, and contract testing. Complete guide covering setup, security, mocking, and performance testing.",
    type: "article",
  },
  twitter: {
    title: "API Automation Playbook - REST & GraphQL Testing",
    description: "Complete guide for REST and GraphQL API test automation, contract testing, and CI/CD integration.",
  },
}

export default function ApiPlaybookLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
