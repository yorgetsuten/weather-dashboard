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
  location: {
    country: string
    lat: number
    localtime: string
    localtime_epoch: number
    lon: number
    name: string
    region: string
    tz_id: string
  }
  current: {
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
}
