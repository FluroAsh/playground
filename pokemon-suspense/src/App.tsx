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
      <div className="pokemon-container">
        <h1>Ditto</h1>
        <Suspense fallback={<Skeleton />}>
          <Pokemon data={dittoData} />
        </Suspense>
      </div>

      <div className="pokemon-container">
        <h1>Pikachu</h1>
        <Suspense fallback={<Skeleton />}>
          <Pokemon data={pikachuData} />
        </Suspense>
      </div>
    </div>
  )
}

export default App
