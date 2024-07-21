'use client'

import { clsx } from 'clsx'
import { useEffect } from 'react'
import { addStorageListener } from 'shared/storage'
import { getPreference, togglePreference } from './model'
import { useSearchParams } from 'shared/searchParams'

export function Ui() {
  const [searchParamsState, searchParams] = useSearchParams({
    syncState: false
  })

  useEffect(() => {
    searchParams.set('theme', getPreference())

    const removeListener = addStorageListener('theme', (theme) => {
      searchParams.set('theme', theme)
    })

    return () => removeListener()
  }, [searchParams])

  function onClick() {
    searchParams.set('theme', togglePreference())
  }

  return (
    <div
      onClick={onClick}
      className={clsx(
        'p-[3px] w-[72px] h-[38px] rounded-[24px] cursor-pointer',
        'bg-bgSecondary outline-bgInvertedSecondary outline outline-1'
      )}
    >
      <div
        className={clsx(
          'p-[4px] w-[32px] h-[100%] rounded-full bg-bgInvertedPrimary ease-in-out duration-150',
          searchParamsState.theme === 'light' && 'translate-x-[34px]'
        )}
      >
        {searchParamsState.theme === 'light' ? (
          <svg
            className='w-[90%] h-[90%]'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              className='stroke-bgSecondary'
              d='M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></path>
          </svg>
        ) : (
          <svg
            className='w-[100%] h-[100%]'
            viewBox='0 0 22 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              className='stroke-bgSecondary'
              d='M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></path>
          </svg>
        )}
      </div>
    </div>
  )
}
