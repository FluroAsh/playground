import { useRef } from 'react'

import { formContainer, inputContainer } from './styles'

import { postRequest } from '../../app/requests'
import { useAppDispatch } from '../../app/store'
import { addTodo } from '../../slices/todos'

interface FormElements extends HTMLFormControlsCollection {
  todo: HTMLInputElement
  description: HTMLInputElement
}

interface InputFieldElements extends HTMLFormElement {
  readonly elements: FormElements
}

function InputField() {
  const dispatch = useAppDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: React.FormEvent<InputFieldElements>) => {
    event.preventDefault()
    if (!inputRef.current) return

    const { todo, description } = event.currentTarget.elements
    if (!todo.value || !description.value) return

    const response = await postRequest(
      {
        todo: todo.value,
        description: description.value,
        completed: false
      },
      'todos'
    )

    if (response.ok) {
      dispatch(
        addTodo({
          todo: todo.value,
          description: description.value,
          completed: false
        })
      )
    }

    // clear the form & change focus
    todo.value = ''
    inputRef.current.focus()
    description.value = ''
  }

  return (
    <div css={inputContainer}>
      <form onSubmit={handleSubmit} css={formContainer}>
        <label htmlFor="todo">Todo</label>
        <input name="todo" type="text" ref={inputRef} />

        <label htmlFor="description">description</label>
        <input name="description" type="text" />

        <button type="submit" hidden />
      </form>
    </div>
  )
}

export default InputField
