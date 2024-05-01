import { type Theme, type Themes, theme } from 'shared/theme'
import { getStorageItem, setStorageItem } from 'shared/storage'

export function getScript() {
  const { theme } = require('shared/theme')
  const { getStorageItem, setStorageItem } = require('shared/storage')

  let script = ''

  script +=
    `const theme = ${JSON.stringify(theme)};` +
    `${getStorageItem.toString()};` +
    `${setStorageItem.toString()};` +
    `${getPreference.toString()};` +
    `${togglePreference.toString()};` +
    `${reflectPreference.toString()};`

  return (script += `(${(() => {
    reflectPreference(
      theme[getPreference(getStorageItem('theme') as Themes) as Themes]
    )
    matchMedia('(prefers-color-scheme: dark)').onchange = () => {
      togglePreference((theme) => setStorageItem('theme', theme))
      reflectPreference(
        theme[getPreference(getStorageItem('theme') as Themes) as Themes]
      )
    }
  }).toString()})()`)
}

/* prettier-ignore */
export function getPreference(theme: Themes | null = getStorageItem('theme')) {
  if (theme)
    return theme
  else
    return matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
}

export function togglePreference(
  setPreference = (theme: Themes) => setStorageItem('theme', theme)
) {
  setPreference(getPreference() === 'dark' ? 'light' : 'dark')
}

export function reflectPreference(colors: Theme = theme[getPreference()]) {
  for (let color in colors) {
    document.documentElement.style.setProperty(
      `--${color}`,
      colors[color as keyof Theme]
    )
  }
}
