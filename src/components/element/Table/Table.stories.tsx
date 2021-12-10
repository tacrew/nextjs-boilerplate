import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { Table, TableProps } from './Table'

const meta: ComponentMeta<typeof Table> = {
  title: 'Components/elements/Table',
  component: Table,
  parameters: {
    controls: { expanded: true },
  },
}
export default meta

type User = {
  id: string
  name: string
  role: 'admin' | 'member'
  email: string
  team: string
}

const fakeUsers: User[] = [
  {
    id: '1',
    name: '佐藤一郎',
    role: 'admin',
    email: 'ichiro@example.com',
    team: '営業',
  },
  {
    id: '2',
    name: '田中次郎',
    role: 'member',
    email: 'jiro@example.com',
    team: '営業',
  },
]

type UserTable = (props: TableProps<User>) => ReturnType<typeof Table>

export const Base: ComponentStoryObj<UserTable> = {
  args: {
    data: fakeUsers,
    columns: [
      { title: '氏名', field: 'name' },
      { title: 'チーム', field: 'team' },
      { title: '権限', field: 'role' },
      { title: 'メールアドレス', field: 'email' },
    ],
  },
}
