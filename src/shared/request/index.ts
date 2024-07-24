import type { Response, CurrentResponse, SearchResponse } from './types'

const baseUrl = 'https://api.weatherapi.com/v1'
const key = process.env.NEXT_PUBLIC_API_KEY
const endpoints = {
  search: 'search.json',
  forecast: 'forecast.json',
  history: 'history.json',
  current: 'current.json'
} as const

export async function request<T extends keyof typeof endpoints>(
  endpoint: T,
  q: string
): Promise<Response<T>> {
  const url = typeof window === 'undefined' ? baseUrl : '/api'
  const query = `/${endpoints[endpoint]}?key=${key}&q=${q}`
  const config: RequestInit = {
    next: { revalidate: 300 }
  }

  return (await fetch(url + query, config)).json()
}

export type { CurrentResponse, SearchResponse }
