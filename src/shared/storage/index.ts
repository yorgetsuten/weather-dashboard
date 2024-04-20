import { StorageSchema } from './types'

export function getStorageItem<T extends keyof StorageSchema>(
  key: T
): StorageSchema[T] | null {  
  const item = localStorage.getItem(key)

  try {
    return JSON.parse(item!) as StorageSchema[T]
  } catch (_) {
    return item as StorageSchema[T]
  }
}

export function setStorageItem<T extends keyof StorageSchema>(
  key: T,
  value: StorageSchema[T]
) {
  localStorage.setItem(key, JSON.stringify(value))
}
