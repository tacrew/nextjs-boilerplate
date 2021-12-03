import jwt from 'jsonwebtoken'
import { RestRequest, createResponseComposition, context } from 'msw'

import { JWT_SECRET } from '@/config'

import { db } from './db'

type SessionUser = ReturnType<typeof db.user.create>

const isTesting = process.env.NODE_ENV === 'test'

/**
 *  遅延付き応答
 */
export const delayedResponse = createResponseComposition(undefined, [
  context.delay(isTesting ? 0 : 1000),
])

/**
 * hash値生成
 */
export const hash = (str: string) => {
  let hash = 5381,
    i = str.length

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }
  return String(hash >>> 0)
}

export const sanitizeUser = (
  user: SessionUser
): Omit<SessionUser, 'password'> => {
  const { password, ...sanitizedUser } = user
  return sanitizedUser
}

/**
 * credential認証処理
 */
export function authenticate({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const user = db.user.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  })

  if (user?.password === hash(password)) {
    const sanitizedUser = sanitizeUser(user)
    const accessToken = jwt.sign(sanitizedUser, JWT_SECRET)
    const sessionToken = jwt.sign({ ...sanitizedUser, accessToken }, JWT_SECRET)
    return { sessionToken }
  }

  const error = new Error('Invalid username or password')
  throw error
}

/**
 * session token検証処理
 */
export const verifySessionToken = (sessionToken: string) => {
  try {
    const decodedToken = jwt.verify(sessionToken, JWT_SECRET) as { id: string }
    return { decodedToken }
  } catch (err: any) {
    throw new Error(err)
  }
}

/**
 * Request headersからbearer tokenを抽出
 */
const extractBearerToken = (requestHeaders: RestRequest['headers']) => {
  const authHeader = requestHeaders.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null
  return authHeader.substring(7, authHeader.length)
}

/**
 * access token検証処理
 */
export function requireAuth(request: RestRequest) {
  try {
    const encodedToken = extractBearerToken(request.headers)
    if (!encodedToken) {
      throw new Error('No authorization token provided!')
    }
    const decodedToken = jwt.verify(encodedToken, JWT_SECRET) as { id: string }

    const user = db.user.findFirst({
      where: {
        id: {
          equals: decodedToken.id,
        },
      },
    })

    if (!user) {
      throw Error('Unauthorized')
    }

    return sanitizeUser(user)
  } catch (err: any) {
    throw new Error(err)
  }
}
