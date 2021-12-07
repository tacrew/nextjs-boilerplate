import * as faker from 'faker'
import { User } from '@/features/auth/types'

export const userFactory = (overrides?: Record<keyof User, any>) => ({
  id: faker.datatype.uuid(),
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  ...overrides,
})
