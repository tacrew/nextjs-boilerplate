import { useRouter } from 'next/router'

import { NoteList } from '@/features/note/components/NoteList'
import { NoteCreateDrawer } from '@/features/note/components/NoteCreateDrawer'

export const Notes = () => {
  const router = useRouter()

  if (!router.isReady) {
    return null
  }
  return (
    <>
      <NoteCreateDrawer />
      <NoteList />
    </>
  )
}
