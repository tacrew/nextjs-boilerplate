import * as NextImage from 'next/image'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import { AppProvider } from '@/providers/app'
import { queryClient } from '@/lib/react-query'

import '../src/styles/globals.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}

export const decorators = [
  (story) => <AppProvider queryClient={queryClient}>{story()}</AppProvider>,
]

// NextImageの非活性化
// https://storybook.js.org/blog/get-started-with-storybook-and-next-js/
const OriginalNextImage = NextImage.default

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
})
