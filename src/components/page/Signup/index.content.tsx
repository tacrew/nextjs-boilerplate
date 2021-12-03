import { useRouter } from 'next/router'

import { AuthSignupForm } from '@/features/auth/components/AuthSignupForm'

export const Signup = () => {
  const router = useRouter()

  return <AuthSignupForm onSuccess={() => router.push('/')} />
}
