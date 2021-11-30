import { useRouter } from 'next/router'

import { AuthSignupForm } from '@/components/model/auth/AuthSignupForm'

export const Signup = () => {
  const router = useRouter()

  return <AuthSignupForm onSuccess={() => router.push('/')} />
}
