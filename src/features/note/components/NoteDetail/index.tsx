import { Spinner, Link } from '@/components/element'

import { useNote } from '../../hooks'

import { Note } from '../../types'

import { formatDate } from '@/utils/date'

type NoteDetailProps = {
  noteId: Note['id']
}

export const NoteDetail = ({ noteId }: NoteDetailProps) => {
  const noteQuery = useNote({ noteId })

  if (noteQuery.isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-48">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!noteQuery.data) {
    return <div>ノートが存在しません</div>
  }

  const { title, createdAt, content, category } = noteQuery.data

  return (
    <div>
      <h1>{title}</h1>
      <div>{formatDate(createdAt)}</div>
      <div>{category}</div>
      <p>{content}</p>
      <Link href="/note">back to list</Link>
    </div>
  )
}
