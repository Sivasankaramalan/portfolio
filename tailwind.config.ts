import type { Config } from 'tailwindcss'

// Tailwind v4 is driven primarily by `app/globals.css` + `@tailwindcss/postcss`.
// Keep a light config for content scanning / tooling that still reads this file.
const config: Config = {
  content: [
    './app/**/*.{ts,tsx,js,jsx,mdx}',
    './components/**/*.{ts,tsx,js,jsx,mdx}',
    './hooks/**/*.{ts,tsx,js,jsx}',
    './lib/**/*.{ts,tsx,js,jsx}',
  ],
}

export default config
