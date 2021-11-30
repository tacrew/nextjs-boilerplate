import { useRouter } from 'next/router'

import { AuthSigninForm } from '@/components/model/auth/AuthSigninForm'

import { useSignout } from '@/hooks/auth'

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
