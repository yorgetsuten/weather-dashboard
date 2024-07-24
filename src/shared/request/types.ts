// prettier-ignore
export type Response<T> = T extends 'search'
  ? SearchResponse[]
  : T extends 'forecast'
  ? ForecastResponse
  : T extends 'history'
  ? HistoryResponse
  : T extends 'current'
  ? CurrentResponse
  : never

export interface SearchResponse {
  country: string
  id: number
  lat: number
  lon: number
  name: string
  region: string
  url: string
}

export interface CurrentResponse {
  current: Current
  location: Location
}

export type ForecastResponse = {
  current: Current
  location: Location
  forecast: Forecast
}

export type HistoryResponse = {
  forecast: Forecast
  location: Location
}

export type Location = {
  country: string
  lat: number
  localtime: string
  localtime_epoch: number
  lon: number
  name: string
  region: string
  tz_id: string
}

export type Current = {
  condition: {
    text: string
    icon: string
    code: number
  }
  feelslike_c: number
  humidity: number
  is_day: number
  pressure_mb: number
  temp_c: number
  uv: number
  vis_km: number
  wind_dir: string
  wind_kph: number
}

export type Forecast = {
  forecastday: [
    {
      date: string
      date_epoch: number
      day: {
        avgtemp_c: number
        condition: {
          text: string
          icon: string
          code: number
        }
        maxtemp_c: number
        mintemp_c: number
        totalprecip_mm: number
        uv: number
      }
      astro: {
        moonrise: string
        moonset: string
        sunrise: string
        sunset: string
      }
      hour: {
        chance_of_rain: string
        chance_of_snow: string
        condition: {
          text: string
          icon: string
          code: number
        }
        feelslike_c: number
        humidity: number
        is_day: number
        temp_c: number
        time: string
        uv: number
        vis_km: number
        wind_dir: string
        wind_kph: number
      }[]
    }
  ]
}
