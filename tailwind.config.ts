import type { Config } from 'tailwindcss'
import preset from './theme/preset'

// Tailwind explicit config to leverage local preset and control content scanning.
const config: Config = {
  darkMode: 'class',
  presets: [preset],
  content: [
    './app/**/*.{ts,tsx,js,jsx,mdx}',
    './components/**/*.{ts,tsx,js,jsx,mdx}',
    './hooks/**/*.{ts,tsx,js,jsx}',
    './lib/**/*.{ts,tsx,js,jsx}',
  ]
}

export default config
