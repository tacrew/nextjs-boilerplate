import clsx from 'clsx'
import { UseFormRegisterReturn } from 'react-hook-form'

import {
  FormFieldWrapper,
  FormFieldWrapperPassThroughProps,
} from '@/components/ui/FormFieldWrapper'

type Props = FormFieldWrapperPassThroughProps & {
  className?: string
  registration: Partial<UseFormRegisterReturn>
}

export const FormFieldNumber = (props: Props) => {
  const { label, className, registration, error } = props
  return (
    <FormFieldWrapper label={label} error={error}>
      <input
        type={'number'}
        className={clsx(
          'appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
          className
        )}
        {...registration}
      />
    </FormFieldWrapper>
  )
}
