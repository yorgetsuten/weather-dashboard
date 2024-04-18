import type { Config } from 'tailwindcss'
import { themes } from './src/app/_assets/themes'

let colors = {}
Object.keys(themes.dark).forEach((color) => {
  colors = { ...colors, [color]: `var(--${color})` }
})

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    colors,
    fontFamily: {
      montserrat: ['Montserrat', 'system-ui', 'sans-serif']
    }
  },
  plugins: []
}
export default config
