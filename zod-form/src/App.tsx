import { useState } from 'react'
import './App.css'

import { z } from 'zod'

function App() {
  const formSchema = z.object({
    name: z.string().min(3).max(10),
    email: z.string().email(),
    age: z.number().min(18).max(99)
  })

  const [formData, setFormData] = useState<{
    name: string
    email: string
    age: string
  }>({
    name: '',
    email: '',
    age: ''
  })

  const [errors, setErrors] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      console.log({ formData })
      formSchema.parse(formData)
      console.log('success', formData)
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message)
      }
    }
  }

  return (
    <>
      <div>
        <h1>Zod Gang</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name'"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email'"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <input
              id="age'"
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <button type="submit" hidden />
        </form>
      </div>
    </>
  )
}

export default App
