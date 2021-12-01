import { authHandlers } from './auth'
import { noteHandlers } from './note'

export const handlers = [...authHandlers, ...noteHandlers]
