import { CurrentResponse, SearchSearch } from './types'
export type { CurrentResponse, SearchSearch }

const baseUrl = 'https://api.weatherapi.com/v1'
const key = process.env.NEXT_PUBLIC_API_KEY
const endpoints = {
  search: 'search.json',
  current: 'current.json'
} as const

/* prettier-ignore */
type Response<T> = 
  T extends 'search'
  ? SearchSearch[]
  : T extends 'current'
  ? CurrentResponse
  : never

export async function request<T extends keyof typeof endpoints>(
  endpoint: T,
  query: string
): Promise<Response<T>> {
  const url = `${baseUrl}/${endpoints[endpoint]}?key=${key}&q=${query}`
  const config: RequestInit = {
    next: { revalidate: 300 }
  }

  return (await fetch(url, config)).json()
}
