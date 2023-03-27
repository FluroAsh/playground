import Todo from '../Todo'
import { TodoProps } from '../../types/todo'

import { todosContainer } from './styles'

import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

const Todos = () => {
  const { todos } = useSelector((state: RootState) => state)

  if (!todos) {
    return <div>Loading...</div>
  }

  return (
    <div css={todosContainer}>
      {todos.map(({ id, todo, description, completed }: TodoProps) => (
        <Todo
          key={id}
          todo={todo}
          description={description}
          completed={completed}
        />
      ))}
    </div>
  )
}

export default Todos
