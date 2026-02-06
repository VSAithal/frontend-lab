import type { Config } from 'tailwindcss'
import preset from './tailwind.preset'

const config: Config = {
  prefix: 'ds-',
  presets: [preset],
  content: ['./src/**/*.{ts,tsx}'],

  plugins: [],
}

export default config
