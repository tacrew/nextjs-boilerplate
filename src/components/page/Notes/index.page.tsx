import React from 'react'

import { Notes } from './index.content'

import { PageWithSidebar } from '@/components/layout/PageWithSidebar'

export const NotesPage = () => {
  return (
    <PageWithSidebar>
      <Notes />
    </PageWithSidebar>
  )
}
