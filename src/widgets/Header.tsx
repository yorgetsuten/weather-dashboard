import type { SearchParamsSchema } from 'shared/searchParams'

import {
  CurrentLocation,
  SearchLocation,
  LocationProvider
} from 'features/location'

import { ThemeSwitcher } from 'features/theming'

export function Header({ searchParams }: { searchParams: SearchParamsSchema }) {
  return (
    <header className='px-[6dvw] py-[28px] flex justify-between items-center' >
      <LocationProvider>
        <CurrentLocation searchParams={searchParams} />
        <SearchLocation />
      </LocationProvider>
      <ThemeSwitcher />
    </header>
  )
}
