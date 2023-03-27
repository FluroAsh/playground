import { TodoProps } from '../../types/todo'
import { todoBody } from './styles'

interface ITodo extends Omit<TodoProps, 'id'> {
  id?: number
}

function Todo({ todo, description, completed }: ITodo) {
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
