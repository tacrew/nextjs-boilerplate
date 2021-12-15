import * as React from 'react'
import { UseFormRegisterReturn, Controller, Control } from 'react-hook-form'

import Select from 'react-select'
import {
  FormFieldWrapper,
  FormFieldWrapperPassThroughProps,
} from '@/components/form'
import { Option } from '@/types'

type Props = FormFieldWrapperPassThroughProps & {
  options: Option[]
  className?: string
  defaultValue?: string
  placeholder?: string
  registration: Partial<UseFormRegisterReturn>
  control: Control<any>
  isDisabled?: boolean
  isSearchable?: boolean
}

export const FormFieldMultiSelect = (props: Props) => {
  const {
    label,
    options,
    error,
    className,
    defaultValue,
    registration,
    control,
    placeholder,
    isDisabled = false,
    isSearchable = false,
  } = props
  const { ref, ...restrationRest } = registration
  return (
    <FormFieldWrapper label={label} error={error}>
      <Controller
        name={label ?? 'multi-select'}
        {...restrationRest}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            value={
              options.find((option) => option.value === field.value)?.label
            }
            onChange={(values) =>
              field.onChange(values.map((v) => (v as Option).value))
            }
            options={options}
            isMulti
            placeholder={placeholder}
            defaultValue={defaultValue}
            isDisabled={isDisabled}
            isSearchable={isSearchable}
          />
        )}
      />
    </FormFieldWrapper>
  )
}
