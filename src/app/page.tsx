import type { SearchParamsSchema } from 'shared/searchParams'

import {
  CurrentLocation,
  SearchLocation,
  SearchRefProvider
} from 'features/location'

export default function Home({
  searchParams
}: {
  searchParams: SearchParamsSchema
}) {
  return (
    <main className='bg-bgPrimary flex justify-evenly items-center text-textPrimary w-[100vw] h-[100vh]'>
      <SearchRefProvider>
        <CurrentLocation searchParams={searchParams} />
        <SearchLocation />
      </SearchRefProvider>
    </main>
  )
}
