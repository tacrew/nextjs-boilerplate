import { useMutation, useQueryClient } from 'react-query'

import { axios } from '@/lib/axios'
import { MutationConfig } from '@/lib/react-query'

import { Note } from '../types'
import { noteQueryKeys } from '../consts'

export type UpdateNoteDTO = {
  data: {
    title: string
    content: string
    category: string
  }
  noteId: string
}

export const updateNote = ({ data, noteId }: UpdateNoteDTO): Promise<Note> => {
  return axios.patch(`/notes/${noteId}`, data)
}

type UseUpdateNoteOptions = {
  config?: MutationConfig<typeof updateNote>
}

export const useUpdateNote = ({ config }: UseUpdateNoteOptions = {}) => {
  const queryClient = useQueryClient()
  return useMutation({
    onMutate: async (updatingNote: UpdateNoteDTO) => {
      await queryClient.cancelQueries(noteQueryKeys.detail(updatingNote.noteId))

      const previousNote = queryClient.getQueryData<Note>(
        noteQueryKeys.detail(updatingNote.noteId)
      )

      queryClient.setQueryData(noteQueryKeys.detail(updatingNote.noteId), {
        ...previousNote,
        ...updatingNote,
      })
      return { previousNote }
    },
    onError: (_, __, context: any) => {
      if (context?.previousNote) {
        queryClient.setQueryData(
          noteQueryKeys.detail(context.previousNote.id),
          context.previousNote
        )
      }
    },
    onSuccess: (data: Note) => {
      queryClient.refetchQueries(noteQueryKeys.detail(data.id))
    },
    ...config,
    mutationFn: updateNote,
  })
}
