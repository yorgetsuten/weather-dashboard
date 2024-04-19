import { Theme, Themes } from './types'

export type { Theme, Themes }

export const theme: Record<Themes, Theme> = {
  dark: {
    'bg-primary': '#111015',
    'bg-secondary': '#1E1E1E',
    'bg-inverted-primary': '#D8E9F9',
    'bg-inverted-secondary': '#BBD7EC',

    'text-primary': '#FDFDFD',
    'text-secondary': '#EFEFEF',
    'text-tertiary': '#818085',
    'text-inverted-primary': '#0F0F11',
    'text-inverted-secondary': '#4F5658',

    'accent-primary': '#2AA1FA',
    'accent-secondary': 'BAD4EB'
  },
  light: {
    'bg-primary': '#FFFFFF',
    'bg-secondary': '#F2F2F2',
    'bg-inverted-primary': '#111015',
    'bg-inverted-secondary': '#1E1E1E',

    'text-primary': '#111015',
    'text-secondary': '#4F5658',
    'text-tertiary': '#818085',
    'text-inverted-primary': '#FDFDFD',
    'text-inverted-secondary': '#EFEFEF',

    'accent-primary': '#2AA1FA',
    'accent-secondary': '#BAD4EB'
  }
}
