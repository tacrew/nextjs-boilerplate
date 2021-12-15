import React from 'react'

import { Pets } from './index.content'

import { PageWithSidebar, PageWithHeader } from '@/components/layout'

export const PetsPage = () => {
  return (
    <PageWithSidebar>
      <PageWithHeader>
        <Pets />
      </PageWithHeader>
    </PageWithSidebar>
  )
}
