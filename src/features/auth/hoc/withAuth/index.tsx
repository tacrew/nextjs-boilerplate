import { useRouter } from 'next/router'
import * as React from 'react'
import { useSession } from '@/features/auth/hooks'

export const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (
    props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
  ) => {
    const { session, isLoading } = useSession({})
    const router = useRouter()
    if (session) {
      return <WrappedComponent {...props} />
    }

    if (isLoading) {
      return <div>loading...</div>
    }

    router.push('/signin')
    return null
  }
  return ComponentWithAuth
}
