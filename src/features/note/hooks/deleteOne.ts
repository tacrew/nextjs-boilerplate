import { useMutation, useQueryClient } from 'react-query'

import { axios } from '@/lib/axios'
import { MutationConfig } from '@/lib/react-query'

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
    onSuccess: () => {
      queryClient.invalidateQueries(noteQueryKeys.lists())
    },
    ...config,
    mutationFn: deleteNote,
  })
}
