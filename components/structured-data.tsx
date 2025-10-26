'use client'

interface StructuredDataProps {
  type: 'Person' | 'Organization' | 'Article' | 'WebSite' | 'BreadcrumbList'
  data: Record<string, any>
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
    name: 'Sivasankaramalan Gunasekarasivam',
    jobTitle: 'Quality Engineering Leader',
    description: 'Quality Engineering Leader specializing in Mobile & Web Automation, Shift-Left Testing, and Reliability Engineering',
    url: 'https://sivasankaramalan.com',
    sameAs: [
      'https://linkedin.com/in/sivasankaramalan',
      'https://github.com/sivasankaramalan'
    ],
    image: 'https://sivasankaramalan.com/Image/Sivasankaramalan.png',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN'
    },
    knowsAbout: [
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
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Quality Engineering Leader',
      description: 'Leading quality engineering initiatives with focus on automation, testing strategies, and reliability engineering'
    }
  },

  website: {
    name: 'Sivasankaramalan - Quality Engineering Leader',
    description: 'Portfolio and professional insights from a Quality Engineering Leader specializing in automation, testing, and reliability engineering',
    url: 'https://sivasankaramalan.com',
    author: {
      '@type': 'Person',
      name: 'Sivasankaramalan Gunasekarasivam'
    },
    publisher: {
      '@type': 'Person',
      name: 'Sivasankaramalan Gunasekarasivam'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://sivasankaramalan.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  },

  organization: {
    '@type': 'ProfessionalService',
    name: 'Sivasankaramalan Quality Engineering',
    description: 'Quality Engineering consultation and automation expertise',
    url: 'https://sivasankaramalan.com',
    founder: {
      '@type': 'Person',
      name: 'Sivasankaramalan Gunasekarasivam'
    },
    areaServed: 'Worldwide',
    serviceType: [
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