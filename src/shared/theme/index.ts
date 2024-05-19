import type { Theme, Themes } from './types'
export type { Theme, Themes }

export const theme: Record<Themes, Theme> = {
  dark: {
    bgPrimary: '#111015',
    bgSecondary: '#1E1E1E',
    bgInvertedPrimary: '#D8E9F9',
    bgInvertedSecondary: '#BBD7EC',

    textPrimary: '#FDFDFD',
    textSecondary: '#EFEFEF',
    textTertiary: '#818085',
    textInvertedPrimary: '#0F0F11',
    textInvertedSecondary: '#4F5658',

    accentPrimary: '#2AA1FA',
    accentSecondary: 'BAD4EB'
  },
  light: {
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F2F2F2',
    bgInvertedPrimary: '#111015',
    bgInvertedSecondary: '#1E1E1E',

    textPrimary: '#111015',
    textSecondary: '#4F5658',
    textTertiary: '#818085',
    textInvertedPrimary: '#FDFDFD',
    textInvertedSecondary: '#EFEFEF',

    accentPrimary: '#2AA1FA',
    accentSecondary: '#BAD4EB'
  }
}
