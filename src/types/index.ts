export type BaseEntity = {
  id: string
  createdAt: number
  updatedAt: number
}

/**
 * selectbox/checkbox/radio inputの選択肢用
 */
export type Option = {
  label: React.ReactNode
  value: string | number | string[]
}

/**
 * convert union type to tuple type (workaround)
 * https://github.com/microsoft/TypeScript/issues/13298#issuecomment-692864087
 */
export type TupleUnion<U extends string, R extends string[] = []> = {
  [S in U]: Exclude<U, S> extends never
    ? [...R, S]
    : TupleUnion<Exclude<U, S>, [...R, S]>
}[U] &
  string[]
