import { useDisclosure } from '@/hooks/useDisclosure'
import { rtlRender, screen, userEvent, waitFor } from '@/test/utils'

import { Button } from '@/components/element'
import { Drawer } from './Drawer'

const openButtonText = 'Open'
const titleText = 'Title'
const cancelButtonText = 'Cancel'
const drawerContentText = 'Content'

const TestDrawer = () => {
  const { close, open, isOpen } = useDisclosure()

  return (
    <>
      <Button onClick={open}>{openButtonText}</Button>
      <Drawer
        isOpen={isOpen}
        onClose={close}
        title={titleText}
        size="md"
        renderFooter={() => (
          <>
            <Button variant="inverse" size="sm" onClick={close}>
              {cancelButtonText}
            </Button>
          </>
        )}
      >
        {drawerContentText}
      </Drawer>
    </>
  )
}

test('Drawerの開閉操作フロー', async () => {
  rtlRender(<TestDrawer />)

  // 初期状態でDrawerは表示されていない
  expect(screen.queryByText(titleText)).not.toBeInTheDocument()

  // Drawer外triggerボタン押下でDrawerが表示となる
  userEvent.click(
    screen.getByRole('button', {
      name: openButtonText,
    })
  )

  expect(screen.getByText(titleText)).toBeInTheDocument()

  // Drawer内cancelボタン押下でDrawerが非表示となる
  userEvent.click(
    screen.getByRole('button', {
      name: cancelButtonText,
    })
  )

  await waitFor(() =>
    expect(screen.queryByText(titleText)).not.toBeInTheDocument()
  )
})
