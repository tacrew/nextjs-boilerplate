import clsx from 'clsx'
import * as React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

import {
  FormFieldWrapper,
  FormFieldWrapperPassThroughProps,
} from '@/components/form'

type Option = {
  label: React.ReactNode
  value: string | number | string[]
}

type Props = FormFieldWrapperPassThroughProps & {
  options: Option[]
  className?: string
  defaultValue?: string
  placeholder?: string
  registration: Partial<UseFormRegisterReturn>
}

export const FormFieldSelect = (props: Props) => {
  const {
    label,
    options,
    error,
    className,
    defaultValue,
    registration,
    placeholder,
  } = props
  return (
    <FormFieldWrapper label={label} error={error}>
      <select
        placeholder={placeholder}
        name="location"
        className={clsx(
          'mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md',
          className
        )}
        defaultValue={defaultValue}
        {...registration}
      >
        {options.map(({ label, value }) => (
          <option key={label?.toString()} value={value}>
            {label}
          </option>
        ))}
      </select>
    </FormFieldWrapper>
  )
}
