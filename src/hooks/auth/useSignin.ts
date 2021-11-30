import { useMutation } from 'react-query'
import { getSession, signIn } from 'next-auth/react'

import { MutationConfig } from '@/lib/react-query'
import storage from '@/utils/storage'

export type SigninDTO = {
  email: string
  password: string
}

export const signinWithCredential = async (data: SigninDTO) => {
  const result = await signIn<'credentials'>('signin', {
    ...data,
    redirect: false,
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
