import { NoteList } from '@/features/note/components/NoteList'
import { NoteCreateDrawer } from '@/features/note/components/NoteCreateDrawer'

export const Notes = () => {
  return (
    <>
      <NoteCreateDrawer />
      <NoteList />
    </>
  )
}
