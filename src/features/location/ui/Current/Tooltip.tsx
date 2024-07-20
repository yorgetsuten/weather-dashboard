import clsx from 'clsx'

export function Tooltip({
  hidden,
  onConfirm,
  onDecline,
  children
}: {
  hidden: boolean
  onConfirm: () => void
  onDecline: () => void
  children: React.ReactNode
}) {
  return (
    <div
      className={clsx(
        'absolute top-[calc(100%_+_12px)] left-[-24px] z-30 duration-200',
        'before:absolute before:bottom-[100%] before:left-[15%] before:ml-[-7px]',
        'before:border-[7px] before:border-solid before:border-[transparent] before:border-b-textPrimary',
        hidden &&
          'tranform scale-0 translate-x-[-35%] translate-y-[-60%] opacity-40'
      )}
    >
      <p
        className={clsx(
          'px-[7px] py-[3px] rounded-md rounded-ee-none border border-solid text-nowrap',
          'bg-bgPrimary text-textPrimary border-textPrimary'
        )}
      >
        {children}
      </p>

      <div
        className={clsx(
          'flex justify-end float-right mt-[-1px] w-fit',
          'border border-solid rounded-md rounded-t-none',
          'bg-bgPrimary text-textPrimary border-textPrimary'
        )}
      >
        <div
          onClick={onConfirm}
          className={clsx(
            'px-[6px] py-[1px] rounded-none rounded-es-md cursor-pointer',
            'ease-in-out duration-150 hover:bg-textPrimary hover:text-textInvertedPrimary'
          )}
        >
          Confirm
        </div>
        <div
          onClick={onDecline}
          className={clsx(
            'px-[6px] py-[1px] rounded-none rounded-ee-md cursor-pointer',
            'ease-in-out duration-150 hover:bg-textPrimary hover:text-textInvertedPrimary'
          )}
        >
          Decline
        </div>
      </div>
    </div>
  )
}
