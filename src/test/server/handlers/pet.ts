import { rest } from 'msw'

import { API_URL } from '@/config'

import { Pet } from '@/api/@types'

import { db, persistDb } from '../db'
import { requireAuth, delayedResponse } from '../utils'
import { petFactory } from '../../dataFactory'

export const petHandlers = [
  rest.get(`${API_URL}/pet/:petId`, (req, res, ctx) => {
    try {
      requireAuth(req)
      const { petId } = req.params
      if (typeof petId !== 'number') {
        return delayedResponse(
          ctx.status(400),
          ctx.json({ message: 'Invalid ID supplied' })
        )
      }
      const result = db.pet.findFirst({
        where: {
          id: {
            equals: petId,
          },
        },
      })
      if (!result) {
        return delayedResponse(
          ctx.status(404),
          ctx.json({ message: 'Pet Not Found' })
        )
      }
      return delayedResponse(ctx.json(result))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(500),
        ctx.json({ message: error?.message || 'Server Error' })
      )
    }
  }),
  rest.post<Pet>(`${API_URL}/pet`, (req, res, ctx) => {
    try {
      requireAuth(req)
    } catch (error: any) {
      ctx.status(401), ctx.json({ message: error?.message || 'Server Error' })
    }
    try {
      const result = db.pet.create({
        ...petFactory(),
        ...req.body,
      })
      persistDb('pet')
      return delayedResponse(ctx.json(result))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(405),
        ctx.json({ message: 'Invalid Input' })
      )
    }
  }),
]
