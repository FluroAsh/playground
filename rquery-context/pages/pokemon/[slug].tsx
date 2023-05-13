import { useState } from 'react'
import { useQueryClient, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import type { PokemonData } from '../../lib/types'

import { BackArrow } from '../../components/BackArrow'
import Layout from '../../components/Layout'
import { backButton, pokemonCard } from './styles'
import { getPokemonByName } from '../api/pokemon'
import { typeColors } from '../../lib/constants'
import Loading from '../../components/Loading'

const Pokemon = () => {
  const [showFront, setShowFront] = useState<boolean>(false)
  const [isHovering, setIsHovering] = useState<boolean>(false)

  const router = useRouter()
  const { slug } = router.query as { slug: string }

  const pokmemonSlugQuery = useQuery<PokemonData>(['pokemon', slug], () =>
    getPokemonByName(slug)
  )

  if (pokmemonSlugQuery.isError)
    return <div>Something went wrong! Please try again...</div>

  if (pokmemonSlugQuery.isLoading) return <Loading />

  const typeColor = typeColors.find(
    (t) => t.type === pokmemonSlugQuery.data?.types[0].type.name
  )?.color

  const { name, height, sprites, weight } = pokmemonSlugQuery?.data ?? {}
  const capitalizedName = name?.[0].toUpperCase() + name?.slice(1)

  return (
    <Layout
      title={capitalizedName || 'Loading...'}
      description={
        capitalizedName
          ? `React Query Pokemon Demo >>> ${capitalizedName}`
          : 'Loading...'
      }
    >
      <div
        css={pokemonCard(typeColor, isHovering)}
        className={isHovering ? 'hovering' : undefined}
      >
        <Link
          href="/"
          css={backButton(typeColor, isHovering)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div style={{ position: 'relative' }}>
            <BackArrow
              colour="#fff"
              style={{
                position: 'absolute',
                right: '100%',
                top: '18px',
                marginRight: '5px'
              }}
            />
            <h3
              style={{
                marginLeft: '5px',
                marginRight: '5px',
                textAlign: 'center'
              }}
            >
              Back
            </h3>
          </div>
        </Link>

        <div id="inner-content">
          <div id="name">{capitalizedName}</div>
          {/* Convert from PokeAPI decimeters/hectograms -> meters/kg */}
          <div id="height">Height: {height / 10}m</div>
          <div id="weight">Weight: {weight / 10}kg</div>

          {showFront ? (
            <Image
              src={sprites.front_default}
              alt={name}
              width={200}
              height={200}
              onMouseLeave={() => setShowFront(false)}
            />
          ) : (
            <Image
              src={sprites?.back_default}
              alt={name}
              width={200}
              height={200}
              onMouseEnter={() => setShowFront(true)}
            />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Pokemon
