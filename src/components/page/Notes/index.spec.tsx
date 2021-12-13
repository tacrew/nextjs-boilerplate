import {
  render,
  screen,
  within,
  waitFor,
  userEvent,
  createUser,
  createNote,
} from '@/test/utils'
import { withMockedRouter } from '@/test/mock-next-router'
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

  const utils = await render(
    withMockedRouter({ isReady: true, pathname: '/note' }, <NotesPage />),
    {
      user: fakeUser,
    }
  )

  await screen.findByText(fakeNote.title)

  return {
    ...utils,
    fakeUser,
    fakeNote,
  }
}
test('正常系: noteを未登録の場合、表示するものがない故が表示される', async () => {
  await render(
    withMockedRouter({ isReady: true, pathname: '/note' }, <NotesPage />)
  )

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

test('正常系: ユーザーはnoteを作成できる', async () => {
  await render(
    withMockedRouter({ isReady: true, pathname: '/note' }, <NotesPage />)
  )

  // 初期値チェック
  expect(await screen.findByText(/No Entries Found/i)).toBeInTheDocument()

  // Noteの作成
  const title = 'title'
  const content = 'content'
  const category = 'category'

  userEvent.click(screen.getByRole('button', { name: /追加/ }))

  const drawer = screen.getByRole('dialog', { name: /Note作成/ })

  const titleField = within(drawer).getByText(/title/i)
  const contentField = within(drawer).getByText(/content/i)
  const categoryField = within(drawer).getByText(/category/i)

  userEvent.type(titleField, title)
  userEvent.type(contentField, content)
  userEvent.type(categoryField, category)

  const submitButton = within(drawer).getByRole('button', {
    name: /作成/,
  })

  userEvent.click(submitButton)

  await waitFor(() => expect(drawer).not.toBeInTheDocument())

  // 作成結果が表示に反映されているか
  await waitFor(() => expect(screen.getByText(title)).toBeInTheDocument())
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
