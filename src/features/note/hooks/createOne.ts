import { useMutation } from 'react-query'

import { axios } from '@/lib/axios'
import { MutationConfig, queryClient } from '@/lib/react-query'

import { Note } from '../types'

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
  return useMutation({
    onMutate: async (newNote) => {
      await queryClient.cancelQueries(['notes'])

      const previousNotes = queryClient.getQueryData<Comment[]>(['notes'])

      queryClient.setQueryData(
        ['notes'],
        [...(previousNotes || []), newNote.data]
      )

      return { previousNotes }
    },
    onError: (_, __, context: any) => {
      if (context?.previousNotes) {
        queryClient.setQueryData(['notes'], context.previousNotes)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['notes'])
    },
    ...config,
    mutationFn: createComment,
  })
}
