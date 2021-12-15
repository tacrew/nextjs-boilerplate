import { authHandlers } from './auth'
import { noteHandlers } from './note'
import { petHandlers } from './pet'

export const handlers = [...authHandlers, ...noteHandlers, ...petHandlers]
