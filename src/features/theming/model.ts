import type { Theme, Themes } from 'shared/theme'

import { theme } from 'shared/theme'
import {
  addStorageListener,
  getStorageItem,
  setStorageItem
} from 'shared/storage'

/* prettier-ignore */
export function getPreference(storageItem: Themes | null = getStorageItem('theme')) {
  if (storageItem)
    return storageItem
  else
    return matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
}

/* prettier-ignore */
export function togglePreference() {
  const newPreference = 
    getPreference() === 'dark'
      ? 'light' 
      : 'dark'

  setStorageItem('theme', newPreference)
  reflectPreference(theme[newPreference])
  return newPreference
}

function reflectPreference(colors = theme[getPreference()]) {
  for (let color in colors) {
    document.documentElement.style.setProperty(
      `--${color}`,
      colors[color as keyof Theme]
    )
  }
}

type GetStorageItem = typeof getStorageItem
type SetStorageItem = typeof setStorageItem
type AddStorageListener = typeof addStorageListener

export function getScript() {
  const script = (
    theme: Record<Themes, Theme>,
    getStorageItem: GetStorageItem,
    setStorageItem: SetStorageItem,
    addStorageListener: AddStorageListener
  ) => {
    reflectPreference(theme[getPreference(getStorageItem('theme'))])

    matchMedia('(prefers-color-scheme: dark)').onchange = (event) => {
      const preference = event.matches ? 'dark' : 'light'
      if (getStorageItem('theme') !== preference) {
        setStorageItem('theme', preference)
      }
    }

    addStorageListener('theme', (newPreference) => {
      reflectPreference(theme[newPreference])
    })
  }

  return (
    `${getStorageItem.toString()};` +
    `${setStorageItem.toString()};` +
    `${addStorageListener.toString()};` +
    `${getPreference.toString()};` +
    `${reflectPreference.toString()};` +
    `(${script.toString()})` +
    `(${JSON.stringify(theme)},${getStorageItem.name},${setStorageItem.name}, ${addStorageListener.name})`
  )
}
