import * as faker from 'faker'

type Note = {
  id: string
  title: string
  content: string
  category: string
  userId: string
  createdAt: number
  updatedAt: number
}

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
