import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { PageWithSidebar } from './PageWithSidebar'

const meta: ComponentMeta<typeof PageWithSidebar> = {
  title: 'Components/layout/PageWithSidebar',
  component: PageWithSidebar,
  parameters: {
    controls: { expanded: true },
  },
}
export default meta

export const Base: ComponentStoryObj<typeof PageWithSidebar> = {
  parameters: {
    nextRouter: {
      path: '/note',
    },
  },
  args: {
    children: 'Main contents',
  },
}
