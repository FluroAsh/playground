import * as React from 'react'

import { formContainer } from './styles'

import { postRequest } from '../../app/requests'

interface FormElements extends HTMLFormControlsCollection {
  todo: HTMLInputElement
  description: HTMLInputElement
}

interface InputFieldElements extends HTMLFormElement {
  readonly elements: FormElements
}

function InputField() {
  const handleSubmit = (event: React.FormEvent<InputFieldElements>) => {
    event.preventDefault()
    console.log('pretend I made a POST request')

    const { todo, description } = event.currentTarget.elements
    postRequest(
      {
        todo: todo.value,
        description: description.value,
        completed: false
      },
      'todos'
    )

    console.log(event.currentTarget.elements.todo.value)
    console.log(event.currentTarget.elements.description.value)

    // clear the form after submission
    todo.value = ''
    description.value = ''
  }

  return (
    <div>
      <form onSubmit={handleSubmit} css={formContainer}>
        <label htmlFor="todo">Todo</label>
        <input name="todo" type="text" />

        <label htmlFor="description">description</label>
        <input name="description" type="text" />

        <button type="submit" hidden />
      </form>
    </div>
  )
}

export default InputField
