import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

import todoReducer from '../slices/todos'

const preloadedState = {
  todos: [
    {
      id: 1,
      todo: 'Learn React',
      description: 'Learn React and Redux',
      completed: false
    },
    {
      id: 2,
      todo: 'Learn Redux',
      description: 'Learn Redux and React-Redux',
      completed: false
    }
  ]
}

const store = configureStore({
  reducer: todoReducer,
  devTools: true,
  preloadedState
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
