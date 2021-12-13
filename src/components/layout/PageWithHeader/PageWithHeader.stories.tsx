import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { PageWithHeader } from './PageWithHeader'

const meta: ComponentMeta<typeof PageWithHeader> = {
  title: 'Components/layout/PageWithHeader',
  component: PageWithHeader,
  parameters: {
    controls: { expanded: true },
  },
}
export default meta

export const Base: ComponentStoryObj<typeof PageWithHeader> = {
  args: {
    children: 'Main contents',
  },
}
