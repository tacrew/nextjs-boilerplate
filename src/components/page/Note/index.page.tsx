import React from 'react'

import { Note } from './index.content'

import { PageWithSidebar, PageWithHeader } from '@/components/layout'

export const NotePage = () => {
  return (
    <PageWithSidebar>
      <PageWithHeader>
        <Note />
      </PageWithHeader>
    </PageWithSidebar>
  )
}
