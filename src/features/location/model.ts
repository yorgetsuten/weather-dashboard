'use client'

import {
  useRef,
  useState,
  useContext,
  createContext,
  createElement
} from 'react'

const LocationContext = createContext<{
  searchRef: React.RefObject<HTMLInputElement>
  locationName: string | null
  setLocationName: React.Dispatch<React.SetStateAction<string | null>>
} | null>(null)

export function useLocationContext() {
  const context = useContext(LocationContext)

  if (context === null) {
    throw new Error('useLocationContext must be used within a LocationProvider')
  } else {
    return context
  }
}

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const searchRef = useRef<HTMLInputElement>(null)
  const [locationName, setLocationName] = useState<string | null>(null)

  return createElement(
    LocationContext.Provider,
    { value: { searchRef, locationName, setLocationName } },
    children
  )
}
