import clsx from 'clsx'

const sizes = {
  sm: 'h-4 w-4 border',
  md: 'h-8 w-8 border-2',
  lg: 'h-16 w-16 border-4',
}

const variants = {
  primary: 'border-blue-500 border-t-transparent',
}

export type SpinnerProps = {
  size?: keyof typeof sizes
  variant?: keyof typeof variants
  className?: string
}

export const Spinner = ({
  size = 'md',
  variant = 'primary',
  className = '',
}: SpinnerProps) => {
  return (
    <>
      <div className={clsx('flex justify-center', className)}>
        <div
          className={clsx(
            'rounded-full animate-spin',
            sizes[size],
            variants[variant]
          )}
        ></div>
      </div>
      <span className="sr-only">Loading</span>
    </>
  )
}
