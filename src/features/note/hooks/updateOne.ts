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
    onSuccess: () => {
      queryClient.invalidateQueries(noteQueryKeys.details())
    },
    ...config,
    mutationFn: updateNote,
  })
}
