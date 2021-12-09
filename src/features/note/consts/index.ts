export const noteQueryKeys = {
  all: ['todos'] as const,
  lists: () => [...noteQueryKeys.all, 'list'] as const,
  // list: (filters: string) => [...noteQueryKeys.lists(), { filters }] as const,
  details: () => [...noteQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...noteQueryKeys.details(), id] as const,
}
