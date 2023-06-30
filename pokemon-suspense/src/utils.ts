export const fetchPokemon = async (
  name: string,
  setData: (response: Record<any, string>) => void
) => {
  const data = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
  )
  const response = await data.json()
  setData(response)
}
