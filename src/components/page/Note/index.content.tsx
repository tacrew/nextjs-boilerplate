import { useRouter } from 'next/router'

import { NoteDetail } from '@/features/note/components/NoteDetail'
import { UpdateDiscussion } from '@/features/note/components/NoteUpdateDrawer'

export const Note = () => {
  const router = useRouter()

  if (!router.isReady) {
    return null
  }

  const { noteId } = router.query

  if (noteId === undefined || Array.isArray(noteId)) {
    router.push('/note')
    return null
  }

  return (
    <>
      <NoteDetail noteId={noteId} />
      <UpdateDiscussion noteId={noteId} />
    </>
  )
}
