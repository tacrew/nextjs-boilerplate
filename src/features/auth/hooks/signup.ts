import { useMutation } from 'react-query'
import { getSession, getCsrfToken } from 'next-auth/react'

import { MutationConfig } from '@/lib/react-query'
import storage from '@/utils/storage'
import { getUrlSearchParams } from '@/utils/urlSearchParams'

export type SignupDTO = {
  email: string
  password: string
  name: string
}

export const signupWithCredential = async (data: SignupDTO) => {
  const csrfToken = await getCsrfToken()
  const result = await fetch('/api/auth/callback/signup', {
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
      throw new Error('ユーザー登録に失敗しました')
  }
}

type SignupUserOptions = {
  config?: MutationConfig<typeof signupWithCredential>
}

export const useSignupWithCredential = ({ config }: SignupUserOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: signupWithCredential,
    onSuccess: async () => {
      const session = await getSession()
      storage.setToken(session?.accessToken as string)
    },
  })
}
