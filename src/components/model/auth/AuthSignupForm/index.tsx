import * as React from 'react'
import Link from 'next/link'
import * as z from 'zod'
import { useImmer } from 'use-immer'

import { Button } from '@/components/element'
import { Form } from '@/components/ui/Form'
import { FormFieldText } from '@/components/ui/FormFieldText'
import { useSignupWithCredential } from '@/hooks/auth'

const schema = z.object({
  email: z.string().min(1, 'Required'),
  name: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
})

type RegisterValues = {
  name: string
  email: string
  password: string
}

type Props = {
  onSuccess: () => void
}

export const AuthSignupForm = ({ onSuccess }: Props) => {
  const { isLoading, mutateAsync } = useSignupWithCredential()
  const [errorMessage, setErrorMessage] = useImmer<string>('')

  const onSubmit = React.useCallback(
    async (values: RegisterValues) => {
      try {
        setErrorMessage('')
        await mutateAsync(values)
        onSuccess()
      } catch (error: any) {
        setErrorMessage(error.message)
      }
    },
    [setErrorMessage, mutateAsync, onSuccess]
  )

  return (
    <div>
      <Form<RegisterValues, typeof schema>
        onSubmit={onSubmit}
        schema={schema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => (
          <>
            <FormFieldText
              type="text"
              label="Name"
              error={formState.errors['name']}
              registration={register('name')}
            />
            <FormFieldText
              type="email"
              label="Email Address"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <FormFieldText
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
            />

            <div>
              <Button isLoading={isLoading} type="submit" className="w-full">
                Register
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="text-red-500">{errorMessage}</div>
      <div className="flex items-center justify-end mt-2">
        <div className="text-sm">
          <Link href="/" passHref>
            <span className="font-medium text-blue-600 hover:text-blue-500">
              Log In
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
