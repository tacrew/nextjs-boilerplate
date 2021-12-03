import * as React from 'react'

import { useDisclosure } from '@/hooks/useDisclosure'
import { rtlRender, screen, userEvent, waitFor } from '@/test/utils'

import { Button } from '@/components/element'
import { Dialog, DialogTitle } from './Dialog'

const openButtonText = 'Open'
const cancelButtonText = 'Cancel'
const titleText = 'Title'

const TestDialog = () => {
  const { close, open, isOpen } = useDisclosure()
  const cancelButtonRef = React.useRef(null)

  return (
    <>
      <Button onClick={open}>{openButtonText}</Button>
      <Dialog isOpen={isOpen} onClose={close} initialFocus={cancelButtonRef}>
        <div>
          <DialogTitle as="h3">{titleText}</DialogTitle>

          <Button type="button" onClick={close} ref={cancelButtonRef}>
            {cancelButtonText}
          </Button>
        </div>
      </Dialog>
    </>
  )
}

test('Dialogの開閉操作フロー', async () => {
  rtlRender(<TestDialog />)

  // 初期状態でDialog非表示
  expect(screen.queryByText(titleText)).not.toBeInTheDocument()

  // triggerボタン押下でDialog表示
  userEvent.click(screen.getByRole('button', { name: openButtonText }))

  expect(screen.getByText(titleText)).toBeInTheDocument()

  // cancelボタン押下でDialog表示
  userEvent.click(screen.getByRole('button', { name: cancelButtonText }))

  await waitFor(() =>
    expect(screen.queryByText(titleText)).not.toBeInTheDocument()
  )
})
