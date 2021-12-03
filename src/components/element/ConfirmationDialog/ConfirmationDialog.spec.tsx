import { rtlRender, screen, userEvent, waitFor } from '@/test/utils'

import { Button } from '@/components/element'
import { ConfirmationDialog } from './index'

test('Dialogの表示/非表示切り替え操作', async () => {
  const titleText = 'Are you sure?'
  const bodyText = 'Are you sure you want to delete this item?'
  const confirmationButtonText = 'Confirm'
  const cancelButtonText = 'Cancel'
  const openButtonText = 'Open'

  rtlRender(
    <ConfirmationDialog
      icon="danger"
      title={titleText}
      body={bodyText}
      cancelButtonText={cancelButtonText}
      confirmButton={<Button>{confirmationButtonText}</Button>}
      triggerButton={<Button>{openButtonText}</Button>}
    />
  )

  // 初期状態ではDialogの中身は表示されていない
  expect(screen.queryByText(titleText)).not.toBeInTheDocument()

  // triggerボタン押下でDialogの中身が表示される
  userEvent.click(screen.getByRole('button', { name: openButtonText }))

  expect(screen.getByText(titleText)).toBeInTheDocument()

  expect(screen.getByText(bodyText)).toBeInTheDocument()

  // cancelボタン押下でDialogが非表示となる
  userEvent.click(screen.getByRole('button', { name: cancelButtonText }))

  await waitFor(() =>
    expect(screen.queryByText(titleText)).not.toBeInTheDocument()
  )

  expect(screen.queryByText(bodyText)).not.toBeInTheDocument()

  // confirmボタン押下でDialogが非表示となる
  userEvent.click(screen.getByRole('button', { name: openButtonText }))

  expect(screen.getByText(titleText)).toBeInTheDocument()

  expect(screen.getByText(bodyText)).toBeInTheDocument()

  userEvent.click(screen.getByRole('button', { name: confirmationButtonText }))

  await waitFor(() =>
    expect(screen.queryByText(titleText)).not.toBeInTheDocument()
  )

  expect(screen.queryByText(bodyText)).not.toBeInTheDocument()
})
