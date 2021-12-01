export const getUrlSearchParams = (
  init: Record<string, string | number | boolean | undefined>
) => new URLSearchParams(init as Record<string, string>)

export const parseUrlSearchParams = (params: string) => {
  return Array.from(new URLSearchParams(params).entries()).reduce(
    (obj, pair) => ({ ...obj, [pair[0]]: pair[1] }),
    {}
  )
}
