import * as React from 'react'
import Link from 'next/link'
import * as z from 'zod'
import { useImmer } from 'use-immer'

import { Button } from '@/components/ui/Button'
import { Form } from '@/components/ui/Form'
import { FormFieldText } from '@/components/ui/FormFieldText'
import { useSigninWithCredential } from '@/hooks/auth'

const schema = z.object({
  email: z.string().min(1, 'Required'),
  password: z.string().min(1, 'Required'),
})

type RegisterValues = {
  email: string
  password: string
}

type Props = {
  onSuccess: () => void
}

export const AuthSigninForm = ({ onSuccess }: Props) => {
  const { isLoading, mutateAsync } = useSigninWithCredential()
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
                Sign in
              </Button>
            </div>
          </>
        )}
      </Form>
      <div className="text-red-500">{errorMessage}</div>
      <div className="flex items-center justify-end mt-2">
        <div className="text-sm">
          <Link href="/signup" passHref>
            <span className="font-medium text-blue-600 hover:text-blue-500">
              Sign Up
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
