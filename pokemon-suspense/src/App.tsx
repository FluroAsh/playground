import { Suspense, lazy, useState, useEffect } from 'react'
import './App.css'
import { fetchPokemon } from './utils'

const Pokemon = lazy(() => import('./components/Pokemon'))

export const Skeleton = () => (
  <div className="skele-container">
    <div className="skele-div" />
    <div className="skele-div" />
    <div className="skele-img" />
  </div>
)

function App() {
  const [dittoData, setDittoData] = useState<any>(null)
  const [pikachuData, setPikachuData] = useState<any>(null)

  // TODO: Data fetching should happen inside an individual component
  // This way we can track the data fetching state and handle it in the
  // suspense boundary.
  useEffect(() => {
    const fetchDitto = () =>
      setTimeout(async () => fetchPokemon('ditto', setDittoData), 1000)
    fetchDitto()
  }, [])

  useEffect(() => {
    const fetchPikachu = () =>
      setTimeout(async () => fetchPokemon('pikachu', setPikachuData), 2000)
    fetchPikachu()
  }, [])

  console.log('loading...')
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'row' }}>
      {/* TODO: Render the components at the same time regardless of when their data fetching completes */}
      <Suspense fallback={<div>Loading...</div>}>
        <div className="pokemon-container">
          <h1>Ditto</h1>
          <Pokemon data={dittoData} />
        </div>

        <div className="pokemon-container">
          <h1>Pikachu</h1>
          <Pokemon data={pikachuData} />
        </div>
      </Suspense>
    </div>
  )
}

export default App
