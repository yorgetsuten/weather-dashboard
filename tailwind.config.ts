import type { Config } from 'tailwindcss'
import { theme } from './src/shared/theme'

let colors = {}
Object.keys(theme.dark).forEach((color) => {
  colors = { ...colors, [color]: `var(--${color})` }
})

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors,
    fontFamily: {
      montserrat: ['Montserrat', 'system-ui', 'sans-serif']
    }
  },
  plugins: []
}
export default config
