import { AxiosError } from 'axios'
import {
  QueryClient,
  UseQueryOptions,
  UseMutationOptions,
  DefaultOptions,
} from 'react-query'
import { PromiseValue } from 'type-fest'

const defaultQueryOptions: DefaultOptions = {
  queries: {
    useErrorBoundary: (error: any) => {
      return error.response?.status >= 500
    },
    refetchOnWindowFocus: false,
    retry: false,
  },
  mutations: {
    useErrorBoundary: (error: any) => {
      return error.response?.status >= 500
    },
  },
}

export const queryClient = new QueryClient({
  defaultOptions: defaultQueryOptions,
})

export type QueryConfig<FetcherFnType extends (...args: any) => any> =
  UseQueryOptions<PromiseValue<ReturnType<FetcherFnType>>>

export type MutationConfig<FetcherFnType extends (...args: any) => any> =
  UseMutationOptions<
    PromiseValue<ReturnType<FetcherFnType>>,
    AxiosError,
    Parameters<FetcherFnType>[0]
  >
