import { FormEvent, MouseEvent } from 'react'

function App() {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    // Do something
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Make a POST request...
    console.log('pretend I made a POST request')
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Todo Title</label>
        <input name="title" type="text" />
      </form>
    </div>
  )
}

export default App
