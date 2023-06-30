import { Skeleton } from '../App'
import { motion } from 'framer-motion'

const Pokemon: React.FC<{ data: any }> = ({ data }) => {
  // TODO: Should be using a data fetching library like react-query
  // or useSWR to opt into suspense. This is why it's not really working here.
  if (!data) return <Skeleton />

  const { id, name, sprites } = data
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
        <p>{capitalize(name)}!</p>
        <p>Pokedex #: {id}</p>
        <motion.img
          variants={variants}
          transition={transition}
          src={sprites['front_default']}
          height={150}
        />
      </motion.div>
    </>
  )
}

export default Pokemon
