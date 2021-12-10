import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { screen, userEvent } from '@storybook/testing-library'

import { ConfirmationDialog } from './ConfirmationDialog'
import { Button } from '@/components/element'

const meta: ComponentMeta<typeof ConfirmationDialog> = {
  title: 'Components/elements/ConfirmationDialog',
  component: ConfirmationDialog,
  parameters: {
    controls: { expanded: true },
  },
}
export default meta

const openButtonText = '開く'

export const Info: ComponentStoryObj<typeof ConfirmationDialog> = {
  args: {
    icon: 'info',
    title: '確認',
    body: 'hogehogeしてよろしいですか？',
    confirmButton: <Button>hogehogeする</Button>,
    triggerButton: <Button>{openButtonText}</Button>,
  },
  play: async () => {
    await userEvent.click(screen.getByRole('button', { name: openButtonText }))
  },
}

export const Danger: ComponentStoryObj<typeof ConfirmationDialog> = {
  args: {
    icon: 'danger',
    title: '削除',
    body: '本当に削除してよろしいですか？',
    confirmButton: <Button variant="danger">削除する</Button>,
    triggerButton: <Button>{openButtonText}</Button>,
  },
  play: async () => {
    await userEvent.click(screen.getByRole('button', { name: openButtonText }))
  },
}
