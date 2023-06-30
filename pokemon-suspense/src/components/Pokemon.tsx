import { Skeleton } from '../App'

const Pokemon: React.FC<{ data: any }> = ({ data }) => {
  // Why do we need this if suspense should be rendering the
  // falback UI when we have no data?

  if (!data) return <Skeleton />

  const { id, name, sprites } = data
  const capitalize = (word: string) => word[0].toUpperCase() + word.slice(1)

  return (
    <>
      <div style={{ marginBottom: '-20px' }}>
        <p>{capitalize(name)}!</p>
        <p>Pokedex #: {id}</p>
        <img src={sprites['front_default']} height={150} />
      </div>
    </>
  )
}

export default Pokemon
