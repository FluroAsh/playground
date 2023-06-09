import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TodoProps } from '../components/Todo'
import type { ITodo } from '../types/todo'

export interface TodoState {
  todos: Array<ITodo>
  loading: boolean
}

const initialState: TodoState = {
  todos: [],
  loading: false
}

// Using Slices, but don't really 'need' to use slices from RTK
// Can just use default state management
const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoProps>) => {
      state.todos?.push(action.payload)
    },
    initializeTodos: (state, action) => {
      state.todos = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const { addTodo, initializeTodos, setLoading } = todoSlice.actions
export default todoSlice.reducer
