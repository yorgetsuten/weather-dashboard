import { clsx } from 'clsx'
import { SlLocationPin } from 'react-icons/sl'

export function Item({
  onClick,
  name,
  region,
  country
}: {
  onClick: () => void
  name: string
  region: string
  country: string
}) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'flex items-center h-[46px] px-[12px] border-t-[1px] border-solid border-textTertiary ',
        'cursor-pointer opacity-90 hover:opacity-100 hover:px-[14px] duration-150 ease-in-out'
      )}
    >
      <SlLocationPin
        size='20'
        className='min-w-[20px] fill-textSecondary mr-[11px]'
      />
      <p className='text-ellipsis overflow-hidden text-nowrap'>
        {name}, {region}, {country}
      </p>
    </div>
  )
}
