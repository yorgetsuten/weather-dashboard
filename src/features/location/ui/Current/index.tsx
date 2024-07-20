import type { SearchParamsSchema } from 'shared/searchParams'

import { deserializer } from 'next-mutableparams'
import { request } from 'shared/request'
import { headers } from 'next/headers'
import { Current } from './Current'

export async function Index({
  searchParams
}: {
  searchParams: SearchParamsSchema
}) {
  const ip = headers().get('x-forwarded-for')?.split(',')[0]

  if (searchParams.lat && searchParams.lon) {
    const lat = deserializer(searchParams.lat)
    const lon = deserializer(searchParams.lon)

    return (
      <Current
        locationBy='searchParams'
        location={(await request('current', `${lat},${lon}`)).location}
      />
    )
  } else if (ip) {
    return (
      <Current
        locationBy='ip'
        location={(await request('current', ip)).location}
      />
    )
  } else {
    return <Current location={null} />
  }
}
