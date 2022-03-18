import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectTodoAuthState, todoAuthLogout, todoAuthMe } from 'features/todo/redux/slices/todoAuthSlice'

import TodoListView from './todo-list-view'

const TodoListContainer = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(selectTodoAuthState)

  const handleLogout = () => {
    dispatch(todoAuthLogout())
  }
  React.useEffect(() => {
    if (isAuthenticated) {
      dispatch(todoAuthMe())
    }
  }, [dispatch, isAuthenticated])

  const propsView = {
    handleLogout,
    isAuthenticated,
  }
  return <TodoListView {...propsView} />
}

export default TodoListContainer