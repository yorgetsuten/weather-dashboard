'use client'

import { useEffect } from 'react'
import { init } from '../model'

export function Provider({ children }: { children: React.ReactNode }) {
  useEffect(() => init(), [])
  return <>{children}</>
}
