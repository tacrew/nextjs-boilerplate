import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { BellIcon } from '@heroicons/react/outline'

import { Button } from './Button'

const meta: ComponentMeta<typeof Button> = {
  title: 'Components/elements/Button',
  component: Button,
  parameters: {
    controls: { expanded: true },
  },
}
export default meta

export const Base: ComponentStoryObj<typeof Button> = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
}

export const WithStartIcon: ComponentStoryObj<typeof Button> = {
  args: {
    ...Base.args,
    startIcon: <BellIcon className="w-4 h-4" />,
    endIcon: undefined,
  },
}

export const WithEndIcon: ComponentStoryObj<typeof Button> = {
  args: {
    ...Base.args,
    startIcon: undefined,
    endIcon: <BellIcon className="w-4 h-4" />,
  },
}

export const OnLoading: ComponentStoryObj<typeof Button> = {
  args: {
    ...Base.args,
    isLoading: true,
  },
}
