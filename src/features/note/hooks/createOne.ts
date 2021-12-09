import { useMutation, useQueryClient } from 'react-query'

import { axios } from '@/lib/axios'
import { MutationConfig } from '@/lib/react-query'

import { Note } from '../types'
import { noteQueryKeys } from '../consts'

export type CreateNoteDTO = {
  data: {
    title: string
    content: string
    category: string
  }
}

export const createComment = ({ data }: CreateNoteDTO): Promise<Note> => {
  return axios.post('/notes/create', data)
}

type UseCreateNoteOptions = {
  config?: MutationConfig<typeof createComment>
}

export const useCreateNote = ({ config }: UseCreateNoteOptions) => {
  const queryClient = useQueryClient()
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(noteQueryKeys.lists())
    },
    ...config,
    mutationFn: createComment,
  })
}
