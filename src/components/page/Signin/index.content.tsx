import { useRouter } from 'next/router'

import { AuthSigninForm } from '@/features/auth/components/AuthSigninForm'

import { useSignout } from '@/features/auth/hooks'

export const Signin = () => {
  const router = useRouter()
  const { mutateAsync } = useSignout()

  return (
    <>
      <AuthSigninForm onSuccess={() => router.push('/')} />
      <button onClick={() => mutateAsync(undefined)}>logout</button>
    </>
  )
}
