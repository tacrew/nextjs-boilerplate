import { Table, Spinner, Link } from '@/components/element'
import { formatDate } from '@/utils/date'

import { useNotes } from '../../hooks'
import { Note } from '../../types'

// import { DeleteDiscussion } from './DeleteDiscussion'

export const NoteList = () => {
  const notesQuery = useNotes()

  if (notesQuery.isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-48">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!notesQuery.data) return null

  return (
    <Table<Note>
      data={notesQuery.data}
      columns={[
        {
          title: 'Title',
          field: 'title',
        },
        {
          title: 'Created At',
          field: 'createdAt',
          Cell({ entry: { createdAt } }) {
            return <span>{formatDate(createdAt)}</span>
          },
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return <Link href={`./${id}`}>View</Link>
          },
        },
        // {
        //   title: '',
        //   field: 'id',
        //   Cell({ entry: { id } }) {
        //     return <DeleteDiscussion id={id} />
        //   },
        // },
      ]}
    />
  )
}
