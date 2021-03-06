import { useQuery } from 'react-query'

import { axios } from '@/lib/axios'
import { QueryConfig } from '@/lib/react-query'

import { Note } from '../types'
import { noteQueryKeys } from '../consts'

export const getNote = ({ noteId }: { noteId: string }): Promise<Note> => {
  return axios.get(`/notes/${noteId}`)
}

type UseNoteOptions = {
  noteId: string
  config?: QueryConfig<typeof getNote>
}

export const useNote = ({ noteId, config }: UseNoteOptions) => {
  const queryConfig: QueryConfig<typeof getNote> = {
    ...config,
    queryKey: noteQueryKeys.detail(noteId),
    queryFn: () => getNote({ noteId }),
  }
  return useQuery(queryConfig)
}
