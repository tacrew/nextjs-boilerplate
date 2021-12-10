import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { screen, userEvent } from '@storybook/testing-library'

import { Drawer } from './Drawer'
import { Button } from '@/components/element'

import { useDisclosure } from '@/hooks/useDisclosure'

const meta: ComponentMeta<typeof Drawer> = {
  title: 'Components/elements/Drawer',
  component: Drawer,
  parameters: {
    controls: { expanded: true },
  },
}
export default meta

const openButtonText = '開く'

export const Base: ComponentStoryObj<typeof Drawer> = {
  args: {
    title: 'サンプル',
    size: 'md',
    children: 'Hello World',
  },
  render: ({ title, size, children }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { close, open, isOpen } = useDisclosure()
    return (
      <>
        <Button onClick={open}>{openButtonText}</Button>
        <Drawer
          isOpen={isOpen}
          onClose={close}
          title={title}
          size={size}
          renderFooter={() => (
            <>
              <Button variant="inverse" size="sm" onClick={close}>
                確認した
              </Button>
            </>
          )}
        >
          {children}
        </Drawer>
      </>
    )
  },
  play: async () => {
    await userEvent.click(screen.getByRole('button', { name: openButtonText }))
  },
}
