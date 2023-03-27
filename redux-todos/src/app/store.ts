import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

import todoReducer from '../slices/todos'
import { getRequest } from './requests'
import { initializeTodos, setLoading } from '../slices/todos'

export const fetchTodos = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true))
    const response = await getRequest('todos')
    const data = await response.json()
    dispatch(initializeTodos(data))
  } catch (error) {
    console.log(error)
  } finally {
    setTimeout(() => {
      dispatch(setLoading(false))
    }, 300)
  }
}

const store = configureStore({
  reducer: todoReducer,
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

store.dispatch(fetchTodos())

export default store
