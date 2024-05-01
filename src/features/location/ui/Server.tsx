import { headers } from 'next/headers'
import { Client } from './Client'
import { request } from 'src/shared/request'
import { getStringifiedLocation } from '../lib'

export async function Server() {
  const ip = headers().get('x-forwarded-for')?.split(',')[0]

  if (ip) {
    return (
      <Client
        passedLocation={getStringifiedLocation(
          (await request('current', ip)).location
        )}
      />
    )
  } else {
    return <Client passedLocation={null} />
  }
}
