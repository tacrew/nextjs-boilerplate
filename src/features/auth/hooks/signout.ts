import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'
import { getCsrfToken } from 'next-auth/react'

import { MutationConfig } from '@/lib/react-query'
import storage from '@/utils/storage'
import { getUrlSearchParams } from '@/utils/urlSearchParams'

export const signout = async () => {
  const csrfToken = await getCsrfToken()
  const result = await fetch('/api/auth/signout', {
    method: 'post',
    body: getUrlSearchParams({
      csrfToken,
      redirect: false,
      json: true,
    }),
  })
  console.log(result)
  if (result?.ok) return
  switch (result?.status) {
    default:
      throw new Error('ログアウトに失敗しました')
  }
}

type SignoutOptions = {
  config?: MutationConfig<typeof signout>
  callbakUrl?: string
}

export const useSignout = ({
  config,
  callbakUrl = '/signin',
}: SignoutOptions = {}) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    ...config,
    mutationFn: signout,
    onSuccess: () => {
      storage.clearToken()
      queryClient.clear()
      router.push(callbakUrl)
    },
  })
}
