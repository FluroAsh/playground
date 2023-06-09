import { motion } from 'framer-motion'
import { fetchPokemon } from '../utils'
import { useRequest } from '../useRequest'

const Pokemon: React.FC<{ name: string; timeout: number }> = ({
  name,
  timeout
}) => {
  // NOTE: timeout can vary per Pokemon, but we'll always wait for the last request to complete
  // before rendering all the Pokemon cards
  // (as per our Suspense fallback in App.tsx when isGlobal is true)
  const fetcher = fetchPokemon(timeout)

  const { data, error } = useRequest(`/pokemon`, fetcher, name.toLowerCase())

  if (error) return <pre>{error.message}</pre>

  const capitalize = (word: string) => word[0].toUpperCase() + word.slice(1)

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const transition = {
    duration: 0.5,
    ease: 'easeInOut'
  }

  return (
    <>
      <motion.div
        variants={variants}
        transition={transition}
        initial="hidden"
        animate="visible"
        style={{ marginBottom: '-20px' }}
      >
        <p>{capitalize(data.name)}!</p>
        <p>Pokedex #: {data.id}</p>
        <motion.img
          variants={variants}
          transition={transition}
          src={data.sprites['front_default']}
          height={150}
        />
      </motion.div>
    </>
  )
}

export default Pokemon
