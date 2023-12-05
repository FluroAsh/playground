import { useState } from 'react'
import './App.css'

import { z } from 'zod'

import { ERRORS } from './constants'

const formSchema = z.object({
  name: z.string().min(3, ERRORS.name.min).max(10, ERRORS.name.max),
  email: z.string().email(ERRORS.email.invalid),
  age: z
    .string()
    .nonempty('Age is required')
    .refine((age) => {
      const ageNum = parseInt(age)
      return ageNum >= 18 && ageNum <= 99
    }, ERRORS.age.range)
})

type FormSchema = z.infer<typeof formSchema>
type FormKeys = keyof FormSchema
type Errors = Record<FormKeys, string[]>

const generateErrors = (keys: Array<FormKeys>, fieldErrors: Errors) => {
  // Using an object to store the error keys & JSX to render the error messages in the form
  const errorMessages: { [key in FormKeys]: React.ReactNode } = {
    name: undefined,
    email: undefined,
    age: undefined
  }

  keys.forEach((key, idx) => {
    const fieldErrorMessage = fieldErrors?.[key]?.[0] // Only want the first (highest priority) error message

    if (fieldErrorMessage) {
      errorMessages[key] = (
        <p key={idx} className="error-message">
          {fieldErrorMessage}
        </p>
      )
    }
  })
  return errorMessages
}

function App() {
  const [formData, setFormData] = useState<FormSchema>({
    name: '',
    email: '',
    age: ''
  })

  const [errors, setErrors] = useState<ReturnType<typeof generateErrors> | null>(null)

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
      setErrors(null)
    } catch (e) {
      if (e instanceof z.ZodError) {
        const zodErrors = e.formErrors.fieldErrors
        const errors = generateErrors(['age', 'name', 'email'], zodErrors as Errors)
        setErrors(errors)
      }
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
              placeholder="Full Name"
              autoComplete="off"
            />
            {errors?.name && errors.name}
          </div>

          <div className="input-container">
            <label htmlFor="email">Email:</label>
            <input
              id="email'"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
            />
            {errors?.email && errors.email}
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
              min="1"
              max="99"
            />
            {errors?.age && errors.age}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default App
