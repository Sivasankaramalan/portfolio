'use client'

import { SITE_URL, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION } from '@/lib/site'

interface StructuredDataProps {
  type: 'Person' | 'Organization' | 'Article' | 'WebSite' | 'BreadcrumbList'
  data: Record<string, unknown>
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  )
}

// Predefined structured data templates
export const structuredDataTemplates = {
  person: {
    name: SITE_NAME,
    jobTitle: SITE_TAGLINE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    sameAs: [
      'https://linkedin.com/in/sivasankaramalan',
      'https://github.com/Sivasankaramalan',
      'https://twitter.com/thinklikeshiv',
      'https://medium.com/sivasankaramalan'
    ],
    image: `${SITE_URL}/Image/Sivasankaramalan.png`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN'
    },
    knowsAbout: [
      'Product Engineering',
      'AI Native Engineering',
      'Claude',
      'GitHub Copilot',
      'Gemini Enterprise',
      'Test Automation',
      'Mobile Testing',
      'Web Testing',
      'API Testing',
      'Quality Engineering',
      'Appium',
      'Selenium',
      'Playwright',
      'DevOps',
      'CI/CD'
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Claude Certified Architect',
        credentialCategory: 'Certificate',
        url: 'https://www.credly.com/badges/6a66934b-a962-431f-a7fd-c64ca9256179',
        recognizedBy: { '@type': 'Organization', name: 'Anthropic' }
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Claude Certified Developer',
        credentialCategory: 'Certificate',
        url: 'https://www.credly.com/badges/74ab7907-b315-4a91-8759-f47c4f068569',
        recognizedBy: { '@type': 'Organization', name: 'Anthropic' }
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'GitHub Copilot',
        credentialCategory: 'Certificate',
        url: 'https://learn.microsoft.com/en-us/users/sivasankaramalan/credentials/9f2b9433ce3c091c',
        recognizedBy: { '@type': 'Organization', name: 'Microsoft' }
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Certified Partner Specialist Gemini Enterprise Agent Development',
        credentialCategory: 'Certificate',
        url: 'https://www.credly.com/badges/af9bcd35-3f2e-4475-b704-68a522bb05d3',
        recognizedBy: { '@type': 'Organization', name: 'Google' }
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Certified Partner Specialist Gemini Enterprise Deployment',
        credentialCategory: 'Certificate',
        url: 'https://www.credly.com/badges/1e5b6b2d-c06b-44ae-8baa-b58ce5e69d42',
        recognizedBy: { '@type': 'Organization', name: 'Google' }
      }
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Product Engineer',
      description: 'Building products and systems with AI as a native engineering layer, quality-first delivery, and reliability ownership'
    }
  },

  website: {
    name: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    author: {
      '@type': 'Person',
      name: SITE_NAME
    },
    publisher: {
      '@type': 'Person',
      name: SITE_NAME
    }
  },

  organization: {
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    description: 'Product engineering, AI-native systems, and quality engineering consultation',
    url: SITE_URL,
    founder: {
      '@type': 'Person',
      name: SITE_NAME
    },
    areaServed: 'Worldwide',
    serviceType: [
      'Product Engineering',
      'AI Native Engineering',
      'Test Automation',
      'Quality Engineering',
      'Mobile Testing',
      'Web Testing',
      'API Testing',
      'DevOps Integration'
    ]
  }
}

export function PersonStructuredData() {
  return <StructuredData type="Person" data={structuredDataTemplates.person} />
}

export function WebSiteStructuredData() {
  return <StructuredData type="WebSite" data={structuredDataTemplates.website} />
}

export function OrganizationStructuredData() {
  return <StructuredData type="Organization" data={structuredDataTemplates.organization} />
}
