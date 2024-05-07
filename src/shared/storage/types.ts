import { Themes } from '../theme'

export type Keys = keyof Schema

export interface Schema {
  theme: Themes
}

export type ListenerFn<T extends Keys> = (
  newValue: Schema[T],
  oldValue: Schema[T]
) => void
