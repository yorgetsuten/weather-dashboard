import { CurrentResponse } from 'src/shared/request'

export function getStringifiedLocation(location: CurrentResponse['location']) {
  return `${location.name}, ${location.country}`
}
