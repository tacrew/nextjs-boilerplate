export type User = {
  name: string
  email: string
}

export type Session = {
  accessToken: string
  user: User
}
