import { useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import Layout from '../components/Layout'
import { getPokemon } from './api/pokemon'
import { Pokemon } from '../hooks/usePokemonApi'
import { pokemonList, buttonContainer } from './styles'
import Loading from '../components/Loading'

export const REQUEST_LIMIT = 10

const Home: NextPage = () => {
  const queryClient = useQueryClient()
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    const storedPage = sessionStorage.getItem('currentPage')
    setPage((prevPage) => Number(storedPage) ?? prevPage)
  }, [])

  console.log({ page })

  const getPokemonQuery = useQuery({
    queryKey: ['pokemon', page, REQUEST_LIMIT],
    queryFn: () => getPokemon({ page, limit: REQUEST_LIMIT })
  })

  const handleRefetch = (nextPage: boolean) => {
    setPage((prevPage) => (nextPage ? prevPage + 1 : prevPage - 1))
    queryClient.refetchQueries(['pokemon', page, REQUEST_LIMIT], {
      exact: true
    })
    /** Save page in storage for redirections */
    sessionStorage.setItem(
      'currentPage',
      String(nextPage ? page + 1 : page - 1)
    )
  }

  if (getPokemonQuery.isError) return <div>Something went wrong ...</div>
  if (getPokemonQuery.isLoading) return <Loading />

  return (
    <Layout
      title="Pokemon NextJS React Query Demo"
      description="React Query Pokemon Demo >>> Home Page"
    >
      <ul css={pokemonList}>
        {getPokemonQuery.data.results.map((p: Pokemon, idx: number) => (
          <li key={`${p.name}-${++idx}`}>
            <Link href={`pokemon/${p.name}`}>
              {p.name[0].toUpperCase() + p.name.slice(1)}
            </Link>
          </li>
        ))}
      </ul>

      <div id="button-container" css={buttonContainer}>
        <button
          disabled={!getPokemonQuery.data?.previous}
          onClick={() => handleRefetch(false)}
        >
          Previous
        </button>
        <button
          disabled={!getPokemonQuery.data?.next}
          onClick={() => handleRefetch(true)}
        >
          Next
        </button>
      </div>
    </Layout>
  )
}

export default Home
