import {
  render,
  screen,
  within,
  waitFor,
  userEvent,
  createUser,
  createNote,
} from '@/test/utils'
import { formatDate } from '@/utils/date'

import { NotesPage } from './index'

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  ;(console.error as jest.Mock).mockRestore()
})

const renderWithNotes = async () => {
  const fakeUser = await createUser()
  const fakeNote = await createNote({ userId: fakeUser.id })

  const utils = await render(<NotesPage />, {
    user: fakeUser,
  })

  await screen.findByText(fakeNote.title)

  return {
    ...utils,
    fakeUser,
    fakeNote,
  }
}
test('正常系: noteを未登録の場合、表示するものがない故が表示される', async () => {
  await render(<NotesPage />)

  expect(await screen.findByText(/No Entries Found/i)).toBeInTheDocument()
})

test('正常系: noteが登録済みの場合、登録されているnoteが表示される', async () => {
  const { fakeNote } = await renderWithNotes()

  const row = screen.getByRole('row', {
    name: `${fakeNote.title} ${formatDate(fakeNote.createdAt)} View 削除`,
  })

  expect(
    within(row).getByRole('cell', { name: fakeNote.title })
  ).toBeInTheDocument()
})

test('正常系: ユーザーは削除ボタンを押すことにより、当該行のnoteを削除できる', async () => {
  const { fakeNote } = await renderWithNotes()

  // 初期値check
  const row = screen.getByRole('row', {
    name: `${fakeNote.title} ${formatDate(fakeNote.createdAt)} View 削除`,
  })

  expect(
    within(row).getByRole('cell', { name: fakeNote.title })
  ).toBeInTheDocument()

  // 削除ボタンの押下
  userEvent.click(within(row).getByRole('button', { name: /削除/ }))

  const confirmationDialog = screen.getByRole('dialog', { name: /削除/ })

  const confirmationDeleteButton = within(confirmationDialog).getByRole(
    'button',
    { name: /削除/ }
  )
  userEvent.click(confirmationDeleteButton)

  await waitFor(() => expect(confirmationDialog).not.toBeInTheDocument)

  // 削除が表示に反映されているかどうか
  expect(await screen.findByText(/No Entries Found/i)).toBeInTheDocument()
})
