'use client'

import type { SearchResponse } from 'shared/request'

import { useEffect, useRef, useState } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { GoSearch } from 'react-icons/go'
import { clsx } from 'clsx'

import { debounce } from 'shared/lib'
import { request } from 'shared/request'
import { useSearchParams } from 'shared/searchParams'
import { useLocationContext } from '../../model'
import { getLocationName } from '../../lib'
import { Item } from './Item'

export function Index() {
  const { searchRef, setLocationName } = useLocationContext()

  const [, searchParams] = useSearchParams()
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchItems, setSearchItems] = useState<SearchResponse[]>([])

  useEffect(() => {
    const listener = ({ target }: MouseEvent) => {
      if (target !== searchRef.current) {
        searchRef.current!.value = ''
        setIsTyping(false)
        setSearchItems([])
      }
    }

    addEventListener('click', listener)
    return () => removeEventListener('click', listener)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { current: search } = useRef(
    debounce((value: string) => {
      request('search', value).then((data) => {
        setSearchItems(data)
        setIsLoading(false)
      })
    })
  )

  function onChange({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) {
    if (value) search(value)

    if (isLoading === false) setIsLoading(true)

    if (value.length === 1) {
      setIsTyping(true)
    } else if (value.length === 0) {
      setIsTyping(false)
      setIsLoading(false)
      setSearchItems([])
    }
  }

  return (
    <div
      className={clsx(
        'relative max-w-[402px] w-full duration-100 ease-in-out',
        'text-textSecondary font-montserrat font-light text-[14px]'
      )}
    >
      <div
        className={clsx(
          'flex items-center h-[46px] px-[12px] gap-[8px] bg-bgSecondary rounded-lg',
          searchItems.length > 0 && 'rounded-b-none'
        )}
      >
        <label htmlFor='search'>
          <GoSearch size='22' className='fill-textSecondary cursor-pointer' />
        </label>
        <span
          className={clsx(
            'absolute top-[13px] left-[42px] duration-[250ms]',
            isTyping ? 'left-[54px] opacity-0' : 'opacity-70'
          )}
        >
          Search for a location...
        </span>
        <input
          type='text'
          id='search'
          ref={searchRef}
          onChange={onChange}
          className='h-full w-full'
        />
        {isLoading && <AiOutlineLoading size={22} className='animate-spin' />}
      </div>

      <div
        className={clsx(
          'absolute z-20 max-h-[160px] w-full h-max duration-100 ease-in-out',
          'bg-bgSecondary overflow-y-auto rounded-b-lg'
        )}
      >
        {searchItems.map((item) => (
          <Item
            key={item.id}
            locationName={getLocationName(item)}
            onClick={() => {
              searchParams.set('lat', item.lat)
              searchParams.set('lon', item.lon)
              searchRef.current!.value = ''
              setIsTyping(false)
              setSearchItems([])
              setLocationName(getLocationName(item))
            }}
          />
        ))}
      </div>
    </div>
  )
}
