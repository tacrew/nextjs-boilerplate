import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

const API_END_POINTS = {
  SIGNUP: 'https://todolistnotesapp.herokuapp.com/api/users/register',
  SIGNIN: 'https://todolistnotesapp.herokuapp.com/api/users/login',
}

type Credential = {
  redirect: boolean
  csrfToken: string
  callbackUrl: string
  json: boolean
}

type SignupCredential = Credential & {
  name: string
  email: string
  password: string
}
type SigninCredential = Credential & {
  email: string
  password: string
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        id: 'signup',
        name: 'Credential Signup',
        async authorize(credentials) {
          const { name, email, password } = credentials as SignupCredential
          try {
            const { data } = await axios.post(API_END_POINTS.SIGNUP, {
              name,
              email,
              password,
            })
            return data
          } catch (error) {
            return null
          }
        },
        credentials: {},
      }),
      CredentialsProvider({
        id: 'signin',
        name: 'Credential Signin',
        async authorize(credentials) {
          const { email, password } = credentials as SigninCredential
          try {
            const { data } = await axios.post(API_END_POINTS.SIGNIN, {
              email,
              password,
            })
            return data
          } catch (error) {
            return null
          }
        },
        credentials: {},
      }),
    ],
    callbacks: {
      async session({ session, token }) {
        // Send properties to the client, like an access_token from a provider.
        session.accessToken = token.accessToken
        return session
      },
      async jwt({ token, user, account }) {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
          token.accessToken = account.access_token
        }
        if (user) {
          token.accessToken = user.token
        }
        return token
      },
    },
  })
}
