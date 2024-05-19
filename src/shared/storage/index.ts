import { Keys, Schema, ListenerFn } from './types'

export function setStorageItem<T extends Keys>(key: T, value: Schema[T]) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getStorageItem<T extends Keys>(key: T) {
  const item = localStorage.getItem(key)

  try {
    return JSON.parse(item!) as Schema[T] | null
  } catch (_) {
    return item as Schema[T]
  }
}

export function addStorageListener<T extends Keys>(key: T, fn: ListenerFn<T>) {
  const listener = (event: StorageEvent) => {
    if (!event.key || !event.newValue || !event.oldValue) return
    if (event.key === key) {
      fn(
        JSON.parse(event.newValue) as Schema[T],
        JSON.parse(event.oldValue) as Schema[T]
      )
    }
  }

  addEventListener('storage', listener)
  return () => {
    removeEventListener('storage', listener)
  }
}
