export type Themes = 'dark' | 'light'

export interface Theme {
  bgPrimary: string
  bgSecondary: string
  bgInvertedPrimary: string
  bgInvertedSecondary: string

  textPrimary: string
  textSecondary: string
  textTertiary: string
  textInvertedPrimary: string
  textInvertedSecondary: string

  accentPrimary: string
  accentSecondary: string
}
