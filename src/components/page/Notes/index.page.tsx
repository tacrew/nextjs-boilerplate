import React from 'react'

import { Notes } from './index.content'

import { PageWithSidebar, PageWithHeader } from '@/components/layout'

export const NotesPage = () => {
  return (
    <PageWithSidebar>
      <PageWithHeader>
        <Notes />
      </PageWithHeader>
    </PageWithSidebar>
  )
}
