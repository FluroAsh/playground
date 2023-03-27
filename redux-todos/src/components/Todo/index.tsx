import { ITodo } from '../../types/todo'
import { todoBody } from './styles'

type TodoProps = Omit<ITodo, 'id'>

function Todo({ todo, description, completed }: TodoProps) {
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
