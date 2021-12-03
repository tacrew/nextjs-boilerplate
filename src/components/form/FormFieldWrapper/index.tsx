import clsx from 'clsx'
import * as React from 'react'
import { FieldError } from 'react-hook-form'

type Props = {
  label?: string
  className?: string
  children: React.ReactNode
  error?: FieldError | undefined
}

export type FormFieldWrapperPassThroughProps = Omit<
  Props,
  'className' | 'children'
>

export const FormFieldWrapper = (props: Props) => {
  const { label, className, error, children } = props
  return (
    <div>
      <label
        className={clsx('block text-sm font-medium text-gray-700', className)}
      >
        {label}
        <div className="mt-1">{children}</div>
      </label>
      {error?.message && (
        <div
          role="alert"
          aria-label={error.message}
          className="text-sm font-semibold text-red-500"
        >
          {error.message}
        </div>
      )}
    </div>
  )
}
