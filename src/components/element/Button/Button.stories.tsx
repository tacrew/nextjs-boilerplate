import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { Button } from './Button'

const meta: ComponentMeta<typeof Button> = {
  title: 'Components/elements/Button',
  component: Button,
  parameters: {
    controls: { expanded: true },
  },
}
export default meta

export const Primary: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
}

export const Inverse: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Inverse Button',
    variant: 'inverse',
  },
}

export const Danger: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Danger Button',
    variant: 'danger',
  },
}
