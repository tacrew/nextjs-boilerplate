import { useMutation, useQueryClient } from 'react-query'

import { axios } from '@/lib/axios'
import { MutationConfig } from '@/lib/react-query'

import { Note } from '../types'
import { noteQueryKeys } from '../consts'

export const deleteNote = ({ noteId }: { noteId: string }) => {
  return axios.delete(`/notes/${noteId}`)
}

type UseDeleteNoteOptions = {
  config?: MutationConfig<typeof deleteNote>
}

export const useDeleteNote = ({ config }: UseDeleteNoteOptions = {}) => {
  const queryClient = useQueryClient()
  return useMutation({
    onMutate: async (deletedNote) => {
      await queryClient.cancelQueries(noteQueryKeys.lists())

      const previousNotes = queryClient.getQueryData<Note[]>(
        noteQueryKeys.lists()
      )

      queryClient.setQueryData(
        noteQueryKeys.lists(),
        previousNotes?.filter((note) => note.id !== deletedNote.noteId)
      )

      return { previousNotes }
    },
    onError: (_, __, context: any) => {
      if (context?.previousNotes) {
        queryClient.setQueryData(noteQueryKeys.lists(), context.previousNotes)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(noteQueryKeys.lists())
    },
    ...config,
    mutationFn: deleteNote,
  })
}
