import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'

import { AppProvider } from '@/providers/app'
import { queryClient } from '@/lib/react-query'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
  require('../test/server')
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider queryClient={queryClient}>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
