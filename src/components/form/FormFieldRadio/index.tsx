import clsx from 'clsx'
import { UseFormRegisterReturn } from 'react-hook-form'

import {
  FormFieldWrapper,
  FormFieldWrapperPassThroughProps,
} from '@/components/form'
import { Option } from '@/types'

type Props = FormFieldWrapperPassThroughProps & {
  className?: string
  options: Option[]
  direction?: 'row' | 'column'
  registration: Partial<UseFormRegisterReturn>
}

export const FormFieldRadio = (props: Props) => {
  const {
    label,
    options,
    direction = 'row',
    className,
    registration,
    error,
  } = props
  return (
    <FormFieldWrapper label={label} error={error}>
      <div
        className={clsx(
          'flex',
          direction === 'row' ? 'flex-row space-x-4' : 'flex-col space-y-2'
        )}
      >
        {options.map((option, index) => (
          <label
            key={`${label}option${index}`}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <input type="radio" value={option.value} {...registration} />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </FormFieldWrapper>
  )
}
