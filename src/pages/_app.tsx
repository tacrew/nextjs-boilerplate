import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { queryClient } from '@/lib/react-query'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
  require('../test/server')
}

function MyApp({ Component, pageProps }: AppProps) {
  const [reactQueryClient] = React.useState(() => queryClient)
  return (
    <QueryClientProvider client={reactQueryClient}>
      {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
