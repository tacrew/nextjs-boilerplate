import * as React from 'react'
import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { screen, userEvent } from '@storybook/testing-library'

import { Dialog, DialogTitle } from './Dialog'
import { Button } from '@/components/element'

import { useDisclosure } from '@/hooks/useDisclosure'

const meta: ComponentMeta<typeof Dialog> = {
  title: 'Components/elements/Dialog',
  component: Dialog,
  parameters: {
    controls: { expanded: true },
  },
}
export default meta

const openButtonText = '開く'

export const Info: ComponentStoryObj<typeof Dialog> = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { close, open, isOpen } = useDisclosure()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const cancelButtonRef = React.useRef(null)
    return (
      <>
        <Button onClick={open}>{openButtonText}</Button>
        <Dialog isOpen={isOpen} onClose={close} initialFocus={cancelButtonRef}>
          <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <DialogTitle
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                タイトル
              </DialogTitle>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <Button
                type="button"
                className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                onClick={close}
                ref={cancelButtonRef}
              >
                キャンセル
              </Button>
            </div>
          </div>
        </Dialog>
      </>
    )
  },
  play: async () => {
    await userEvent.click(screen.getByRole('button', { name: openButtonText }))
  },
}
