import * as faker from 'faker'
import { Note } from '@/features/note/types'

export const noteFactory = (overrides?: Record<keyof Note, any>) => ({
  id: faker.datatype.uuid(),
  title: faker.company.catchPhrase(),
  content: faker.lorem.sentence(),
  category: faker.lorem.word(),
  userId: faker.datatype.uuid(),
  createdAt: Date.now(),
  updatedAt: Date.now(),
  ...overrides,
})
