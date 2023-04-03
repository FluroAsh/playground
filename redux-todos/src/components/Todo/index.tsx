import type { ITodo } from '../../types/todo'
import { todoBody } from './styles'

export type TodoProps = Omit<ITodo, 'id'>

const Todo = ({ todo, description, completed }: TodoProps) => {
  const todoTitle = todo.length > 14 ? todo.slice(0, 14) + '...' : todo
  return (
    <div css={todoBody}>
      <h1>{todoTitle}</h1>
      <p>{description}</p>
      <p>Completed: {completed.toString()}</p>
    </div>
  )
}

export default Todo
