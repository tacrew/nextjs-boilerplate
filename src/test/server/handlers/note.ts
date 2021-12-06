import { rest } from 'msw'

import { Note } from '@/features/note/types'

import { API_URL } from '@/config'

import { db, persistDb } from '../db'
import { requireAuth, delayedResponse } from '../utils'

type BaseKeys = 'title' | 'content' | 'category'
type NoteCreateBody = Pick<Note, BaseKeys>
type NoteUpdateBody = Pick<Note, BaseKeys | 'id'>

export const noteHandlers = [
  rest.get(`${API_URL}/notes`, (req, res, ctx) => {
    try {
      const user = requireAuth(req)
      const result = db.note.findMany({
        where: {
          userId: {
            equals: user.id,
          },
        },
      })
      return delayedResponse(ctx.json(result))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      )
    }
  }),

  rest.get(`${API_URL}/notes/:noteId`, (req, res, ctx) => {
    try {
      const user = requireAuth(req)
      const { noteId } = req.params
      if (Array.isArray(noteId)) {
        throw new Error(`noteId: ${noteId} is not permitted`)
      }
      const result = db.note.findFirst({
        where: {
          id: {
            equals: noteId,
          },
          userId: {
            equals: user.id,
          },
        },
      })
      return delayedResponse(ctx.json(result))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      )
    }
  }),

  rest.post<NoteCreateBody>(`${API_URL}/notes/create`, (req, res, ctx) => {
    try {
      const user = requireAuth(req)
      const result = db.note.create({
        userId: user.id,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        ...req.body,
      })
      persistDb('note')
      return delayedResponse(ctx.json(result))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      )
    }
  }),

  rest.patch<NoteUpdateBody>(`${API_URL}/notes/:noteId`, (req, res, ctx) => {
    try {
      requireAuth(req)
      const data = {
        ...req.body,
        updatedAt: Date.now(),
      }
      const { noteId } = req.params
      if (Array.isArray(noteId)) {
        throw new Error(`noteId: ${noteId} is not permitted`)
      }
      const result = db.note.update({
        where: {
          id: {
            equals: noteId,
          },
        },
        data,
      })
      persistDb('note')
      return delayedResponse(ctx.json(result))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      )
    }
  }),

  rest.delete(`${API_URL}/notes/:noteId`, (req, res, ctx) => {
    try {
      requireAuth(req)
      const { noteId } = req.params
      if (Array.isArray(noteId)) {
        throw new Error(`noteId: ${noteId} is not permitted`)
      }
      const result = db.note.delete({
        where: {
          id: {
            equals: noteId,
          },
        },
      })
      persistDb('note')
      return delayedResponse(ctx.json(result))
    } catch (error: any) {
      return delayedResponse(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      )
    }
  }),
]
