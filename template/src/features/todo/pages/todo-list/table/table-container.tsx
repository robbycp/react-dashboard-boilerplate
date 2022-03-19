import React from 'react'
import { useTodosGet } from 'features/todo/services/hooks/useTodo'

import TableView from './table-view'

const TableContainer = () => {
  const todosQuery = useTodosGet()
  
  const propsView = {
    todosQuery,
  }
  return <TableView {...propsView} />
}

export default TableContainer