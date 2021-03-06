import {
  render as rtlRender,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient } from 'react-query'

import { AppProvider } from '@/providers/app'
import storage from '@/utils/storage'

import { userFactory, noteFactory } from './dataFactory'
import { db } from './server/db'
import { authenticate, hash } from './server/utils'

export const createUser = async (userProperties?: any) => {
  const user = userFactory(userProperties)
  db.user.create({ ...user, password: hash(user.password) })
  return user
}

export const createNote = async (noteProps?: Record<string, any>) => {
  const note = noteFactory(noteProps)
  const res = db.note.create(note)
  return res
}

export const loginAsUser = async (user: any) => {
  const authUser = authenticate(user)
  storage.setToken(authUser.sessionToken)
  return authUser
}

export const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByTestId(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ],
    { timeout: 4000 }
  )

const initializeUser = async (user: any) => {
  if (typeof user === 'undefined') {
    return await loginAsUser(await createUser())
  } else if (user) {
    return await loginAsUser(user)
  } else {
    return null
  }
}

// eslint-disable-next-line import/export
export const render = async (
  ui: any,
  { route = '/', user, ...renderOptions }: Record<string, any> = {}
) => {
  // if you want to render the app unauthenticated then pass "null" as the user
  user = await initializeUser(user)
  window.history.pushState({}, 'Test page', route)

  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        useErrorBoundary: true,
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  })

  const returnValue = {
    ...rtlRender(ui, {
      wrapper: () => (
        <AppProvider queryClient={testQueryClient}>{ui}</AppProvider>
      ),
      ...renderOptions,
    }),
    user,
  }

  await waitForLoadingToFinish()

  return returnValue
}

// eslint-disable-next-line import/export
export * from '@testing-library/react'
export { userEvent, rtlRender }
