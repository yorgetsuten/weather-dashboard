import { type Theme, theme } from 'shared/theme'
import { getStorageItem, setStorageItem } from 'src/shared/storage'

export function init() {
  reflectThemePreference()
  matchMedia('(prefers-color-scheme: dark)').onchange = () => {
    toggleThemePreference()
    reflectThemePreference()
  }
}

/* prettier-ignore */
export function getThemePreference() {
  if (getStorageItem('theme')) 
    return getStorageItem('theme')!
  else
    return matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark'
      : 'light'
}

/* prettier-ignore */
export function toggleThemePreference() {
  setStorageItem(
    'theme',
    getThemePreference() === 'dark'
      ? 'light'
      : 'dark'
  )
}

export function reflectThemePreference() {
  let color: keyof Theme
  let colors = theme[getThemePreference()]

  for (color in colors) {
    document.documentElement.style.setProperty(`--${color}`, colors[color])
  }
}
