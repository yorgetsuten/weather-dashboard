import type { SearchParamsSchema } from 'shared/searchParams'

import { Header } from 'widgets/Header'

export default function Home({
  searchParams
}: {
  searchParams: SearchParamsSchema
}) {
  return (
    <>
      <Header searchParams={searchParams} />
    </>
  )
}
