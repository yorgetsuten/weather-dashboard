import type { Themes } from '../theme'

import type {
  SerializeSchema,
  UseMutableParamsOptions
} from 'next-mutableparams'

import { useMutableParams } from 'next-mutableparams/use'

export type SearchParamsSchema = SerializeSchema<MutableParamsSchema>

export type MutableParamsSchema = {
  lat: number
  lon: number
  theme: Themes
}

export const useSearchParams = (
  options?: UseMutableParamsOptions<MutableParamsSchema>
) => {
  return useMutableParams<MutableParamsSchema>({
    syncState: true,
    replace: true,
    ...options
  })
}
