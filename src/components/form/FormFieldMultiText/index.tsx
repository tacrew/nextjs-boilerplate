import * as React from 'react'
import {
  UseFormRegister,
  useFieldArray,
  Control,
  FieldArray,
  ArrayPath,
  Path,
  FieldError,
} from 'react-hook-form'

import {
  FormFieldWrapper,
  FormFieldWrapperPassThroughProps,
} from '@/components/form'
import { Button } from '@/components/element'

type Props<T> = Omit<FormFieldWrapperPassThroughProps, 'error'> & {
  className?: string
  defaultValue: Partial<FieldArray<T, ArrayPath<T>>>
  placeholder?: string
  register: UseFormRegister<T>
  fieldKey: string
  name: ArrayPath<T>
  control: Control<T>
  error?: Record<string, FieldError>[]
}

export const FormFieldMultiText = <
  T extends Record<string, unknown> = Record<string, unknown>
>(
  props: Props<T>
) => {
  const {
    label,
    error,
    className,
    defaultValue,
    register,
    name,
    control,
    fieldKey,
    placeholder,
  } = props
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  })
  return (
    <>
      {fields.map((field, index) => (
        <FormFieldWrapper
          key={field.id}
          label={!index ? label : undefined}
          error={
            error && error[index]
              ? error[index][fieldKey] ?? undefined
              : undefined
          }
        >
          <div className="flex items-center space-x-2">
            <input
              {...register(`${name}.${index}.${fieldKey}` as Path<T>)}
              placeholder={placeholder}
              className="flex-1 px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <Button
              onClick={() => remove(index)}
              type="button"
              size="sm"
              variant="danger"
            >
              削除
            </Button>
          </div>
        </FormFieldWrapper>
      ))}
      <Button
        onClick={() => append(defaultValue)}
        type="button"
        variant="inverse"
      >
        追加する
      </Button>
    </>
  )
}
