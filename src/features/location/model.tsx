'use client'

import { type RefObject, createContext, useRef, useContext } from 'react'

const SearchRefContext = createContext<RefObject<HTMLInputElement> | null>(null)

export function useSearchRefContext() {
  const context = useContext(SearchRefContext)

  if (context === null) {
    throw new Error(
      'useSearchRefContext must be used within a SearchRefProvider'
    )
  } else {
    return context
  }
}

export function SearchRefProvider({ children }: { children: React.ReactNode }) {
  const searchRef = useRef<HTMLInputElement>(null)

  return (
    <SearchRefContext.Provider value={searchRef}>
      {children}
    </SearchRefContext.Provider>
  )
}
