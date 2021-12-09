import * as React from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

type AppProviderProps = {
  queryClient: QueryClient
  children: React.ReactNode
}

export const AppProvider = ({ queryClient, children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NEXT_IS_TEST !== 'true' && <ReactQueryDevtools />}
      {children}
    </QueryClientProvider>
  )
}
