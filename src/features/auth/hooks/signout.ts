import { useMutation } from 'react-query'
import { signOut } from 'next-auth/react'

import { MutationConfig } from '@/lib/react-query'
import storage from '@/utils/storage'

export const signout = async () => {
  return signOut({ callbackUrl: '/signin' })
}

type SignoutOptions = {
  config?: MutationConfig<typeof signout>
}

export const useSignout = ({ config }: SignoutOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: signout,
    onSuccess: () => {
      storage.clearToken()
    },
  })
}
