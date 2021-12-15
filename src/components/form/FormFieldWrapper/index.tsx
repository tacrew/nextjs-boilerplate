import clsx from 'clsx'
import * as React from 'react'
import { FieldError } from 'react-hook-form'

type Props = {
  label?: string
  className?: string
  children: React.ReactNode
  error?: FieldError[] | FieldError | undefined
}

export type FormFieldWrapperPassThroughProps = Omit<
  Props,
  'className' | 'children'
>

export const FormFieldWrapper = (props: Props) => {
  const { label, className, error, children } = props
  const displayError = React.useMemo(
    () => (Array.isArray(error) ? error[0] : error),
    [error]
  )
  return (
    <div>
      <label
        className={clsx('block text-sm font-medium text-gray-700', className)}
      >
        {label}
        <div className="mt-1">{children}</div>
      </label>
      {displayError?.message && (
        <div
          role="alert"
          aria-label={displayError.message}
          className="text-sm font-semibold text-red-500"
        >
          {displayError.message}
        </div>
      )}
    </div>
  )
}
