import axios from 'axios'

export const pokeAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2'
})

/** FETCH DATA */
export const getPokemon = async ({
  page,
  limit = 5
}: {
  page: number
  limit?: number
}) => {
  const offset = page * limit
  const { data: results } = await pokeAPI.get(`/pokemon`, {
    params: { limit, offset }
  })
  return results
}

export const getPokemonByName = async (slug: string) => {
  const { data } = await pokeAPI.get(`/pokemon/${slug}`)
  return data
}
