import { createSlice } from '@reduxjs/toolkit'
import { TodoProps } from '../types/todo'

interface TodoState {
  todos?: Array<TodoProps>
}

const initialState: TodoState = {
  todos: undefined
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {}
})

export const {} = todoSlice.actions
export default todoSlice.reducer
