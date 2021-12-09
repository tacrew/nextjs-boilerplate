import {
  render,
  screen,
  userEvent,
  waitFor,
  createUser,
  createNote,
  within,
} from '@/test/utils'
import { withMockedRouter } from '@/test/mock-next-router'

import { NotePage } from './index'

const renderWithNote = async () => {
  const fakeUser = await createUser()
  const fakeNote = await createNote({ userId: fakeUser.id })

  const utils = await render(
    withMockedRouter(
      { isReady: true, query: { noteId: fakeNote.id } },
      <NotePage />
    ),
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

test('正常系：ログイン済みユーザーが自身で登録したnoteの詳細ページにアクセスした場合、noteの情報が表示される', async () => {
  const { fakeNote } = await renderWithNote()
  expect(screen.getByText(fakeNote.content)).toBeInTheDocument()
})

test('正常系：noteの作成者はnoteの内容を更新することができる', async () => {
  const { fakeNote } = await renderWithNote()

  // 初期値チェック
  expect(screen.getByText(fakeNote.title)).toBeInTheDocument()

  // 内容の更新
  const titleUpdate = '-updated'
  const contentUpdate = '-updated'
  const categoryUpdate = '-updated'

  userEvent.click(screen.getByRole('button', { name: /update note/i }))

  const drawer = screen.getByRole('dialog', { name: /update note/i })

  const titleField = within(drawer).getByText(/title/i)
  const contentField = within(drawer).getByText(/content/i)
  const categoryField = within(drawer).getByText(/category/i)

  userEvent.type(titleField, titleUpdate)
  userEvent.type(contentField, contentUpdate)
  userEvent.type(categoryField, categoryUpdate)

  const submitButton = within(drawer).getByRole('button', {
    name: /submit/i,
  })

  userEvent.click(submitButton)

  await waitFor(() => expect(drawer).not.toBeInTheDocument())

  // 更新結果が表示に反映されているか
  const newTitle = `${fakeNote.title}${titleUpdate}`
  const newContent = `${fakeNote.content}${contentUpdate}`
  const newCategory = `${fakeNote.category}${categoryUpdate}`

  await waitFor(() => expect(screen.getByText(newTitle)).toBeInTheDocument())
  expect(screen.getByText(newContent)).toBeInTheDocument()
  expect(screen.getByText(newCategory)).toBeInTheDocument()
})
