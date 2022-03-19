import React from 'react'
import { Grid } from '@mui/material'
import { useTodosGet } from 'features/todo/services/hooks/useTodo'

import Create from './create'

type Props = {
  todosQuery: ReturnType<typeof useTodosGet>
}

const TableView = ({
  todosQuery
}: Props) => {
  console.log('todosQuery', todosQuery)
  return (
    <Grid container display="flex" flexDirection="column">
      <Create />
      <div>
        {todosQuery.isLoading ? (
          <>...loading</>
        ) : (
          JSON.stringify(todosQuery.data)
        )}
      </div>
    </Grid>
  )
}

export default TableView