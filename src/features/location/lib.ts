import type { CurrentResponse, SearchResponse } from 'shared/request'

export function getLocationName(
  location: SearchResponse | CurrentResponse['location']
) {
  return `${location.name}, ${location.region}, ${location.country}`
}
