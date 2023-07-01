import useSwr from 'swr'

const baseUrl = 'https://pokeapi.co/api/v2'

export const useRequest = (
  path: string,
  fetcher: (ur: string) => Promise<any>,
  name: string
) => {
  if (!path) {
    throw new Error('Path is required')
  }

  const url = name ? baseUrl + path + '/' + name : baseUrl + path
  const { data, error } = useSwr(url, fetcher, { suspense: true })

  return { data, error }
}
