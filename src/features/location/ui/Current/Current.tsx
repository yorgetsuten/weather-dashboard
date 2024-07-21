'use client'

import { type CurrentResponse } from 'shared/request'

import { useState, useEffect } from 'react'
import { SlLocationPin } from 'react-icons/sl'

import { useSearchParams } from 'shared/searchParams'
import { useLocationContext } from '../../model'
import { getLocationName } from '../../lib'
import { Tooltip } from './Tooltip'

type Props =
  | {
      locationBy: 'ip' | 'searchParams'
      location: CurrentResponse['location']
    }
  | {
      locationBy?: never
      location: null
    }

export function Current({ location, locationBy }: Props) {
  const { searchRef, locationName } = useLocationContext()
  const [hideTooltip, setHideTooltip] = useState<boolean>(true)
  const [searchParamsState, searchParams] = useSearchParams()

  useEffect(() => {
    if (location && locationBy === 'ip') {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const latMatches = +coords.latitude.toFixed(2) === location.lat
          const lonMatches = +coords.longitude.toFixed(2) === location.lon

          if (latMatches && lonMatches) {
            searchParams.set('lat', location.lat)
            searchParams.set('lon', location.lon)
          } else {
            setHideTooltip(false)
          }
        },
        () => {
          setHideTooltip(false)
        }
      )
    }
  }, [location, locationBy, searchParams])

  useEffect(() => {
    if (
      searchParamsState.lat &&
      searchParamsState.lon &&
      hideTooltip === false
    ) {
      setHideTooltip(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParamsState.lat, searchParamsState.lon])

  function onConfirm() {
    setHideTooltip(true)

    if (location) {
      searchParams.set('lat', location.lat)
      searchParams.set('lon', location.lon)
    } else {
      console.error('location prop is null')
    }
  }

  function onDecline() {
    setHideTooltip(true)
    searchRef.current?.focus()
  }

  return (
    <div className='relative flex items-center gap-[6px]'>
      <SlLocationPin size='25' className='fill-textSecondary' />
      <div className='text-textPrimary font-montserrat font-normal text-[18px]'>
        {locationName ??
          (location ? getLocationName(location) : 'London, United Kingdom')}
      </div>
      <Tooltip hidden={hideTooltip} onConfirm={onConfirm} onDecline={onDecline}>
        Is that your current location?
      </Tooltip>
    </div>
  )
}
