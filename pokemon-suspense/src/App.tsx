import { Suspense, lazy, useState, useEffect } from 'react'
import './App.css'

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
    const fetchDitto = () => {
      setTimeout(async () => {
        const data = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
        const response = await data.json()
        setDittoData(response)
      }, 6000)
    }
    fetchDitto()
  }, [])

  useEffect(() => {
    const fetchPikachu = () => {
      setTimeout(async () => {
        const data = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
        const response = await data.json()
        setPikachuData(response)
      }, 2000)
    }
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
