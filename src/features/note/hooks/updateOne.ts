import { useMutation } from 'react-query'

import { axios } from '@/lib/axios'
import { MutationConfig, queryClient } from '@/lib/react-query'

import { Note } from '../types'

export type UpdateDiscussionDTO = {
  data: {
    title: string
    body: string
  }
  noteId: string
}

export const updateNote = ({
  data,
  noteId,
}: UpdateDiscussionDTO): Promise<Note> => {
  return axios.patch(`/notes/${noteId}`, data)
}

type UseUpdateNoteOptions = {
  config?: MutationConfig<typeof updateNote>
}

export const useUpdateNote = ({ config }: UseUpdateNoteOptions = {}) => {
  return useMutation({
    onMutate: async (updatingNote: any) => {
      await queryClient.cancelQueries(['note', updatingNote?.id])

      const previousNote = queryClient.getQueryData<Note>([
        'note',
        updatingNote?.id,
      ])

      queryClient.setQueryData(['note', updatingNote?.id], {
        ...previousNote,
        ...updatingNote,
      })

      return { previousNote }
    },
    onError: (_, __, context: any) => {
      if (context?.previousNote) {
        queryClient.setQueryData(
          ['note', context.previousNote.id],
          context.previousNote
        )
      }
    },
    onSuccess: (data: Note) => {
      queryClient.refetchQueries(['discussion', data.id])
    },
    ...config,
    mutationFn: updateNote,
  })
}