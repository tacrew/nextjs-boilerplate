import { useMutation } from 'react-query'

import { axios } from '@/lib/axios'
import { MutationConfig, queryClient } from '@/lib/react-query'

import { Note } from '../types'

export const deleteNote = ({ noteId }: { noteId: string }) => {
  return axios.delete(`/notes/${noteId}`)
}

type UseDeleteNoteOptions = {
  config?: MutationConfig<typeof deleteNote>
}

export const useDeleteNote = ({ config }: UseDeleteNoteOptions = {}) => {
  return useMutation({
    onMutate: async (deletedNote) => {
      await queryClient.cancelQueries('notes')

      const previousNotes = queryClient.getQueryData<Note[]>('notes')

      queryClient.setQueryData(
        'notes',
        previousNotes?.filter((note) => note.id !== deletedNote.noteId)
      )

      return { previousNotes }
    },
    onError: (_, __, context: any) => {
      if (context?.previousNotes) {
        queryClient.setQueryData('notes', context.previousNotes)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('notes')
    },
    ...config,
    mutationFn: deleteNote,
  })
}
