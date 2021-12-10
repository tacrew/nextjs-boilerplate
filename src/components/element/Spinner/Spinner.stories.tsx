import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { Spinner } from './Spinner'

const meta: ComponentMeta<typeof Spinner> = {
  title: 'Components/elements/Spinner',
  component: Spinner,
  parameters: {
    controls: { expanded: true },
  },
}
export default meta

export const Info: ComponentStoryObj<typeof Spinner> = {
  args: {
    size: 'md',
    variant: 'primary',
  },
}
