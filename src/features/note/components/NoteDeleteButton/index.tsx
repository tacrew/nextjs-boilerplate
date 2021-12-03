import { TrashIcon } from '@heroicons/react/outline'

import { ConfirmationDialog } from '@/components/element'
import { Button } from '@/components/ui/Button'

import { Note } from '../../types'

import { useDeleteNote } from '../../hooks/deleteOne'

type NoteDeleteButtonProps = {
  id: Note['id']
}

export const NoteDeleteButton = ({ id }: NoteDeleteButtonProps) => {
  const deleteNoteMutation = useDeleteNote()

  return (
    <ConfirmationDialog
      icon="danger"
      title="ノートの削除"
      body="本当にこのノートを削除してよろしいですか？"
      triggerButton={
        <Button variant="danger" startIcon={<TrashIcon className="w-4 h-4" />}>
          削除
        </Button>
      }
      confirmButton={
        <Button
          isLoading={deleteNoteMutation.isLoading}
          type="button"
          className="bg-red-600"
          onClick={async () =>
            await deleteNoteMutation.mutateAsync({ noteId: id })
          }
        >
          削除
        </Button>
      }
    />
  )
}
