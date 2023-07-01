import { Suspense } from 'react'
import './App.css'

import Pokemon from './components/Pokemon'

export const CardSkeleton: React.FC<{ children?: React.ReactNode }> = ({
  children
}) => (
  <div className="skele-container">
    {children}
    <div className="skele-div" />
    <div className="skele-div" />
    <div className="skele-img" />
  </div>
)

export const GlobalSkeleton = () => (
  <div className="global-skeleton">
    <div className="card-skeletons-container">
      <CardSkeleton>
        <h1>Ditto</h1>
      </CardSkeleton>

      <CardSkeleton>
        <h1>Pikachu</h1>
      </CardSkeleton>
    </div>
  </div>
)

function App() {
  const globalValue = localStorage.getItem('global')
  const isGlobal = globalValue ? JSON.parse(globalValue) : false

  return (
    <div className="App">
      {isGlobal ? (
        <div>
          <Suspense fallback={<GlobalSkeleton />}>
            <div className="pokemon-container">
              <h1>Ditto</h1>
              <Pokemon name="ditto" timeout={2000} />
            </div>

            <div className="pokemon-container">
              <h1>Pikachu</h1>
              <Pokemon name="pikachu" timeout={5000} />
            </div>
          </Suspense>
        </div>
      ) : (
        <div>
          <div className="pokemon-container">
            <h1>Ditto</h1>
            <Suspense fallback={<CardSkeleton />}>
              <Pokemon name="ditto" timeout={2000} />
            </Suspense>
          </div>

          <div className="pokemon-container">
            <h1>Pikachu</h1>
            <Suspense fallback={<CardSkeleton />}>
              <Pokemon name="pikachu" timeout={5000} />
            </Suspense>
          </div>
        </div>
      )}
      <button
        onClick={() => {
          localStorage.setItem('global', 'true')
          window.location.reload()
        }}
      >
        Suspend Both
      </button>
      <button
        onClick={() => {
          localStorage.setItem('global', 'false')
          window.location.reload()
        }}
      >
        Suspend Each
      </button>
    </div>
  )
}

export default App
