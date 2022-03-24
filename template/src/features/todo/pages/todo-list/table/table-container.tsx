import React from 'react'

import { useTodoDelete, useTodosGet, useTodoUpdate } from 'features/todo/services/hooks/useTodo'
import type { Todo } from 'features/todo/services/apiTodo'

import TableView from './table-view'

const TableContainer = () => {
  const todosQuery = useTodosGet()
  const todosUpdate = useTodoUpdate()
  const todosDelete = useTodoDelete()

  const handleClickCompleted = (data: Todo) => {
    todosUpdate.mutate({
      ...data,
      completed: !data.completed,
    })
  }
  const handleDeleteTask = (labelId) => {
    todosDelete.mutate({ id: labelId })
  }
  
  const propsView = {
    handleClickCompleted,
    handleDeleteTask,
    todosQuery,
  }
  return <TableView {...propsView} />
}

export default TableContainer