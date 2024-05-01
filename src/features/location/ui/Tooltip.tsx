import clsx from 'clsx'

export function Tooltip({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={clsx(
        'absolute top-[calc(100%_+_12px)] left-[-24px] z-10',
        'bg-bgPrimary text-textPrimary outline-textPrimary',
        'px-[7px] py-[3px] rounded-md outline outline-1 text-nowrap',
        'before:absolute before:bottom-[100%] before:left-[15%] before:ml-[-7px]',
        'before:border-[7px] before:border-solid before:border-[transparent] before:border-b-textPrimary'
      )}
    >
      {children}
    </div>
  )
}
