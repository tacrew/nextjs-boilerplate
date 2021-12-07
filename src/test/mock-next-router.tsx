import * as React from 'react'
import { NextRouter } from 'next/router'
import { RouterContext } from 'next/dist/shared/lib/router-context'

/**
 * next/routerがmockされた状態のReactElementを返す
 */
export const withMockedRouter = (
  router: Partial<NextRouter> = {},
  children: React.ReactNode
) => {
  const mockedRouter: NextRouter = {
    basePath: '',
    route: '',
    pathname: '',
    query: {},
    asPath: '',
    isLocaleDomain: true,
    isFallback: false,
    isPreview: false,
    isReady: false,
    push: async () => true,
    replace: async () => true,
    reload: () => null,
    back: () => null,
    prefetch: async () => undefined,
    beforePopState: () => null,
    events: {
      on: () => null,
      off: () => null,
      emit: () => null,
    },
    ...router,
  }

  return (
    <RouterContext.Provider value={mockedRouter}>
      {children}
    </RouterContext.Provider>
  )
}
