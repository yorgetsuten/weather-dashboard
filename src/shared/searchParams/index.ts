import type {
  Keys,
  Schema,
  Entrie,
  Serializer,
  Deserializer,
  ForEachFnArgs,
  PartialSchema,
  ParamsModifier,
  UseParamsOptions,
  ParamsModifierOptions
} from './types'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { debounce } from '../lib'

export type { PartialSchema as SearchParamsSchema }
export { useParams as useSearchParams }

function useParams(options: UseParamsOptions = {}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const serializer: Serializer = useMemo(
    () =>
      options.serializer ??
      ((value) => {
        return typeof value === 'string' ? value : JSON.stringify(value)
      }),

    [options.serializer]
  )

  const deserializer: Deserializer = useMemo(
    () =>
      options.deserializer ??
      ((value) => {
        if (value === 'undefined') return undefined

        try {
          return JSON.parse(value)
        } catch {
          return value
        }
      }),

    [options.deserializer]
  )

  const queueParamsModifier = useMemo(() => {
    let modifiersQueue: ParamsModifier[] = []

    const requestParamsModification = debounce(
      ({ replace }: ParamsModifierOptions) => {
        const current = new URLSearchParams(searchParams)

        modifiersQueue.forEach((fn) => fn(current))

        if (replace) {
          router.replace(`${pathname}?${current.toString()}`)
        } else {
          router.push(`${pathname}?${current.toString()}`)
        }

        modifiersQueue = []
      },
      0
    )

    return (
      modifier: ParamsModifier,
      options: ParamsModifierOptions = { replace: true }
    ) => {
      modifiersQueue = [...modifiersQueue, modifier]
      requestParamsModification(options)
    }

  }, [router, pathname, searchParams])

  return useMemo(() => {
    return {
      append<T extends Keys>(
        key: T,
        value: Schema[T],
        options?: ParamsModifierOptions
      ) {
        queueParamsModifier((current) => {
          current.append(key, serializer(value))
        }, options)
      },

      delete<T extends Keys>(
        key: T,
        value?: Schema[T],
        options?: ParamsModifierOptions
      ) {
        queueParamsModifier((current) => {
          current.delete(key, value && serializer(value))
        }, options)
      },

      *entries<T extends Keys>(): IterableIterator<Entrie<T>> {
        for (const [key, value] of searchParams.entries()) {
          yield [key, deserializer(value)] as Entrie<T>
        }
      },

      forEach<T extends Keys>(fn: (...[value, key]: ForEachFnArgs<T>) => void) {
        searchParams.forEach((value, key) => {
          fn(...([deserializer(value), key] as ForEachFnArgs<T>))
        })
      },

      get<T extends Keys>(key: T) {
        const value = searchParams.get(key)

        return value ? deserializer<T>(value) : null
      },

      getAll<T extends Keys>(key: T) {
        const keys = searchParams.getAll(key)

        return keys.length > 0
          ? keys.map((value) => deserializer<T>(value))
          : null
      },

      has: (key: Keys) => searchParams.has(key),

      *keys(): IterableIterator<Keys> {
        for (const key of searchParams.keys()) {
          yield key as Keys
        }
      },

      set<T extends Keys>(
        key: T,
        value: Schema[T],
        options?: ParamsModifierOptions
      ) {
        queueParamsModifier((current) => {
          current.set(key, serializer(value))
        }, options)
      },

      size: searchParams.size,

      sort(options?: ParamsModifierOptions) {
        queueParamsModifier((current) => {
          current.sort()
        }, options)
      },

      toString: () => searchParams.toString(),

      *values(): IterableIterator<Schema[Keys]> {
        for (const value of searchParams.values()) {
          yield deserializer(value)!
        }
      }
    }

  }, [deserializer, queueParamsModifier, searchParams, serializer])
}
