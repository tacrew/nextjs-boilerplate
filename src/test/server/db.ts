import { factory, primaryKey, manyOf, oneOf } from '@mswjs/data'

const models = {
  user: {
    id: primaryKey(String),
    name: String,
    email: String,
    password: String,
    createdAt: Number,
  },
  note: {
    id: primaryKey(String),
    title: String,
    content: String,
    category: String,
    userId: String,
    createdAt: Number,
    updatedAt: Number,
  },
  category: {
    id: primaryKey(Number),
    name: String,
  },
  tag: {
    id: primaryKey(Number),
    name: String,
  },
  pet: {
    id: primaryKey(Number),
    category: oneOf('category'),
    name: String,
    photoUrls: Array,
    tags: manyOf('tag'),
    status: String,
  },
}

export const db = factory(models)

export type Model = keyof typeof models

export const loadDb = () => {
  if (typeof window === 'undefined') return '{}'
  return Object.assign(
    JSON.parse(window.localStorage.getItem('msw-db') || '{}')
  )
}

export const persistDb = (model: Model) => {
  if (process.env.NEXT_IS_TEST === 'true') return
  const data = loadDb()
  data[model] = db[model].getAll()
  window.localStorage.setItem('msw-db', JSON.stringify(data))
}

export const initializeDb = () => {
  const database = loadDb()
  Object.entries(db).forEach(([key, model]) => {
    const dataEntres = database[key]
    if (dataEntres) {
      dataEntres?.forEach((entry: Record<string, any>) => {
        model.create(entry)
      })
    }
  })
}

export const resetDb = () => {
  if (typeof window === 'undefined') return
  window.localStorage.clear()
}

initializeDb()
