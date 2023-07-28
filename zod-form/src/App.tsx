import { useState } from 'react'
import './App.css'

import { z } from 'zod'

import { ERRORS } from './constants'

const formSchema = z.object({
  name: z.string().min(3, ERRORS.name.min).max(10, ERRORS.name.max),
  email: z.string().email(ERRORS.email.invalid),
  age: z
    .string()
    .regex(/^\d{1,2}$/, ERRORS.age.invalid)
    .refine((age) => {
      const ageNum = parseInt(age)
      return ageNum >= 18 && ageNum <= 99
    }, ERRORS.age.range)
})

type FormSchema = z.infer<typeof formSchema>
type FormKeys = keyof FormSchema
type Errors = Record<FormKeys, string[]>

const generateErrors = (key: FormKeys, errors: Errors) => {
  const errorMessages: React.ReactNode[] = []
  errors[key].forEach((message) => {
    errorMessages.push(<p className="error-message">{message}</p>)
  })
  return errorMessages
}

function App() {
  const [formData, setFormData] = useState<FormSchema>({
    name: '',
    email: '',
    age: ''
  })

  const [errors, setErrors] = useState<Partial<Errors>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const validatedData = formSchema.parse(formData)
      console.log('validatedData', validatedData)

      setFormData({ name: '', email: '', age: '' })
      setErrors({})
    } catch (e) {
      if (e instanceof z.ZodError) setErrors(e.formErrors.fieldErrors)
    }
  }

  return (
    <>
      <div className="form-container">
        <h1>Zod Form 'Tings</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="name">Name:</label>
            <input
              id="name'"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name &&
              generateErrors('name', errors as Errors).map((error) => error)}
          </div>

          <div className="input-container">
            <label htmlFor="email">Email:</label>
            <input
              id="email'"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email &&
              generateErrors('email', errors as Errors).map((error) => error)}
          </div>

          <div className="input-container">
            <label htmlFor="age">Age:</label>
            <input
              id="age'"
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              autoComplete="off"
            />
            {errors.age &&
              generateErrors('age', errors as Errors).map((error) => error)}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default App
