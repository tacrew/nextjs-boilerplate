import { useQuery } from 'react-query'

import { aspidaClient } from '@/lib/aspida'
import { QueryConfig } from '@/lib/react-query'

export const getPet = ({ petId }: { petId: number }) => {
  return aspidaClient.pet._petId(petId).$get()
}

type UsePetOptions = {
  petId: number
  config?: QueryConfig<typeof getPet>
}

export const usePet = ({ petId, config }: UsePetOptions) => {
  const queryConfig: QueryConfig<typeof getPet> = {
    ...config,
    queryKey: 'pet',
    queryFn: () => getPet({ petId }),
  }
  return useQuery(queryConfig)
}
