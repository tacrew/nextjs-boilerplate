import * as faker from 'faker'
import { Pet } from '@/api/@types'

export const petFactory = (overrides?: Record<keyof Pet, any>) => ({
  id: faker.datatype.uuid(),
  ...overrides,
})
