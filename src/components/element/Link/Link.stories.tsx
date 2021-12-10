import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { Link } from './Link'

const meta: ComponentMeta<typeof Link> = {
  title: 'Components/elements/Link',
  component: Link,
  parameters: {
    controls: { expanded: true },
  },
}
export default meta

export const Base: ComponentStoryObj<typeof Link> = {
  args: {
    href: '/',
    children: 'link',
  },
}
