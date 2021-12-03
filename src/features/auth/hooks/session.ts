import { useQuery } from 'react-query'
import { useRouter } from 'next/router'

import { axios } from '@/lib/axios'
import { QueryConfig } from '@/lib/react-query'
import storage from '@/utils/storage'

import { Session } from '../types'

export const fetchSession = async (): Promise<Session | undefined> => {
  return axios.get('/api/auth/session')
}

type SignupUserOptions = {
  required?: boolean
  redirectTo?: string
  config?: QueryConfig<typeof fetchSession>
}

export const useSession = ({
  required,
  redirectTo = '/signin?error=SessionExpired',
  config,
}: SignupUserOptions = {}) => {
  const router = useRouter()

  const queryConfig: QueryConfig<typeof fetchSession> = {
    ...config,
    queryKey: ['session'],
    queryFn: () => fetchSession(),
    onSettled(data, error) {
      if (config && config.onSettled) config.onSettled(data, error)
      if (data) {
        storage.setToken(data.accessToken)
      }
      if (data || !required) return
      router.push(redirectTo)
    },
  }

  const query = useQuery(queryConfig)
  return { session: query.data }
}
