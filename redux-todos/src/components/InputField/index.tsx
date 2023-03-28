import { useRef } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { formContainer, inputContainer } from './styles'

import { addTodo } from '../../slices/todos'
import { postRequest } from '../../app/requests'
import { TodoProps } from '../Todo'

interface FormElements extends HTMLFormControlsCollection {
  todo: HTMLInputElement
  description: HTMLInputElement
}

interface InputFieldElements extends HTMLFormElement {
  readonly elements: FormElements
}

interface IInputField {
  addTodo: (todo: TodoProps) => void
}

const InputField: React.FC<IInputField> = ({ addTodo }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (event: React.FormEvent<InputFieldElements>) => {
    event.preventDefault()
    if (!inputRef.current) return // narrow to exclude null

    const { todo, description } = event.currentTarget.elements
    if (!todo.value || !description.value) return // narrow to string

    const response = await postRequest(
      {
        todo: todo.value,
        description: description.value,
        completed: false
      },
      'todos'
    )

    if (response.ok) {
      addTodo({
        todo: todo.value,
        description: description.value,
        completed: false
      })
    }

    // clear the form & change focus
    todo.value = ''
    description.value = ''
    inputRef.current.focus()
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

// Maps the action creator to the `addTodo` prop on the component
const mapDispatchToProps = (dispatch: Dispatch) => ({
  addTodo: (todo: TodoProps) => dispatch(addTodo(todo))
})

export default connect(null, mapDispatchToProps)(InputField)
