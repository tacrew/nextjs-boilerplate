import React from 'react'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { queryClient } from '@/lib/react-query'
import { Signup } from './index.content'

export const SignupPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
      <Signup />
    </QueryClientProvider>
  )
}
