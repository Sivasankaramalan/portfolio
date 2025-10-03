/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/resume.pdf',
        destination: '/resume/Sivasankaramalan_LEAD_SDET%20.pdf', // encoded space before .pdf
      },
    ]
  },
}

export default nextConfig
