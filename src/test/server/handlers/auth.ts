import { rest } from 'msw'
import { nanoid } from 'nanoid'

import { db, persistDb } from '../db'
import {
  authenticate,
  delayedResponse,
  hash,
  verifySessionToken,
} from '../utils'
import { parseUrlSearchParams } from '@/utils/urlSearchParams'

type SignupCredential = {
  name: string
  email: string
  password: string
}

type SigninCredential = {
  email: string
  password: string
}

const SESSION_TOKEN_KEY = 'next-auth.session-token'

export const authHandlers = [
  rest.post<string>('/api/auth/callback/signup', (req, res, ctx) => {
    try {
      const userInput = parseUrlSearchParams(req.body) as SignupCredential

      const existingUser = db.user.findFirst({
        where: {
          email: {
            equals: userInput.email,
          },
        },
      })
      if (existingUser) {
        throw new Error('The user already exists')
      }

      db.user.create({
        ...userInput,
        id: nanoid(),
        createdAt: Date.now(),
        password: hash(userInput.password),
      })

      persistDb('user')

      const { sessionToken } = authenticate(userInput)

      return delayedResponse(ctx.cookie(SESSION_TOKEN_KEY, sessionToken))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(401),
        ctx.json({ message: error?.message || 'Server Error' })
      )
    }
  }),

  rest.post<string>('/api/auth/callback/signin', (req, res, ctx) => {
    try {
      const userInput = parseUrlSearchParams(req.body) as SigninCredential
      const { sessionToken } = authenticate(userInput)

      return delayedResponse(ctx.cookie(SESSION_TOKEN_KEY, sessionToken))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(401),
        ctx.json({ message: error?.message || 'Server Error' })
      )
    }
  }),

  rest.get('/api/auth/session', (req, res, ctx) => {
    try {
      const sessionToken = req.cookies[SESSION_TOKEN_KEY]
      if (!sessionToken) {
        return delayedResponse(ctx.json(null))
      }

      const { decodedToken } = verifySessionToken(sessionToken)
      return delayedResponse(ctx.json(decodedToken))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      )
    }
  }),
]
