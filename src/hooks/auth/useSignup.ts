import { useMutation } from 'react-query'
import { getSession, signIn } from 'next-auth/react'

import { MutationConfig } from '@/lib/react-query'
import storage from '@/utils/storage'

export type SignupDTO = {
  email: string
  password: string
  name: string
}

export const signupWithCredential = async (data: SignupDTO) => {
  const result = await signIn<'credentials'>('signup', {
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
