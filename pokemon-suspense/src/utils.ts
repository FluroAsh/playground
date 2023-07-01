/**
 * Returns a function that takes a url as an argument (from useSWR).
 * The function will fetch the data from the url and return it after the timeout
 * (for mocking a delayed repsonse for each Pokemon request).
 */
export const fetchPokemon = (timeout?: number) => async (url: string) => {
  const response = await fetch(url)
  const data = await response.json()

  // Simulate delay using timeout
  await new Promise((resolve) => setTimeout(resolve, timeout))

  return data
}
