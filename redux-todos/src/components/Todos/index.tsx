import Todo, { TodoProps } from '../Todo'

import { todosContainer } from './styles'

import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { ITodo } from '../../types/todo'

const Container = ({ children }: { children: JSX.Element | string }) => (
  <div
    css={todosContainer}
    style={{ display: 'flex', justifyContent: 'center' }}
  >
    {children}
  </div>
)

const Todos = () => {
  const { todos, loading } = useSelector((state: RootState) => state)

  if (loading) return <Container>Loading...</Container>
  if (!todos.length) return <Container>No todos</Container>

  return (
    // TODO: Change to use grid... sm-1, md-(2-3), lg-4
    <div css={todosContainer}>
      {todos.map(({ id, todo, description, completed }: ITodo) => (
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
