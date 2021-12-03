import { BaseEntity } from '@/types'

export type Note = BaseEntity & {
  title: string
  content: string
  category: string
}
