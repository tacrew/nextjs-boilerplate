import { useMutation } from 'react-query'
import { getSession, getCsrfToken } from 'next-auth/react'

import { MutationConfig } from '@/lib/react-query'
import storage from '@/utils/storage'
import { getUrlSearchParams } from '@/utils/urlSearchParams'

export type SigninDTO = {
  email: string
  password: string
}

export const signinWithCredential = async (data: SigninDTO) => {
  const csrfToken = await getCsrfToken()
  const result = await fetch('/api/auth/callback/signin', {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: getUrlSearchParams({
      ...data,
      csrfToken,
      redirect: false,
      json: true,
    }),
  })
  if (result?.ok) return
  switch (result?.status) {
    case 401:
      throw new Error('入力内容に誤りがあります')
    default:
      throw new Error('ログインに失敗しました')
  }
}

type SigninUserOptions = {
  config?: MutationConfig<typeof signinWithCredential>
}

export const useSigninWithCredential = ({ config }: SigninUserOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: signinWithCredential,
    onSuccess: async () => {
      const session = await getSession()
      storage.setToken(session?.accessToken as string)
    },
  })
}
