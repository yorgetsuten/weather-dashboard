import { StorageSchema } from './types'

export function getStorageItem<T extends keyof StorageSchema>(key: T) {
  return JSON.parse(localStorage.getItem(key)!) as StorageSchema[T]
}

export function setStorageItem<T extends keyof StorageSchema>(
  key: T,
  value: StorageSchema[T]
) {
  localStorage.setItem(key, JSON.stringify(value))
}
