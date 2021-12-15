import { useMutation, useQueryClient } from 'react-query'

import { aspidaClient } from '@/lib/aspida'
import { MutationConfig } from '@/lib/react-query'

import { Pet, Category, Tag } from '@/api/@types'

export type CreatePetDTO = {
  data: Pet
}

export const createPet = ({ data }: CreatePetDTO) => {
  return aspidaClient.pet.$post({ body: data })
}

type UseCreatePetOptions = {
  config?: MutationConfig<typeof createPet>
}

export const useCreatePet = ({ config }: UseCreatePetOptions) => {
  const queryClient = useQueryClient()
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries('pet')
    },
    ...config,
    mutationFn: createPet,
  })
}
