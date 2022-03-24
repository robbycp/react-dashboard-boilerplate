import React from 'react'
import { Checkbox, Grid } from '@mui/material'
import { useTodosGet } from 'features/todo/services/hooks/useTodo'

import Create from './create'
import Table from 'components/table'
import type { HeadCell } from 'components/table/table-head'
import type { Todo } from 'features/todo/services/apiTodo'

type Props = {
  handleClickCompleted: (data: Todo) => void,
  handleDeleteTask: (id: string) => void,
  todosQuery: ReturnType<typeof useTodosGet>,
}

const headOptions: HeadCell[] = [
  { id: "completed", label: 'Completed' },
  { id: "_id", label: 'ID' },
  { id: "description", label: 'Description' },
  { id: "owner", label: 'Owner' },
  { id: "createdAt", label: 'Created At' },
  { id: "updatedAt", label: 'Updated At' },
  { id: "__v", label: 'Version' },
]
const TableView = ({
  handleClickCompleted,
  handleDeleteTask,
  todosQuery,
}: Props) => {
  return (
    <Grid container display="flex" flexDirection="column">
      <Create />
      <div>
        <Table
          columnKey="_id"
          headOptions={headOptions}
          isLoading={todosQuery.isLoading}
          rowActionOptions={[
            { label: 'Delete', onClick: handleDeleteTask }
          ]}
          rowRenderOption={{
            completed: (data) => (
              <Checkbox checked={data.completed} onClick={() => handleClickCompleted(data)} />
            ),
          }}
          rows={todosQuery.data?.data?.data || []}
          tableTitle="Todo"
        />
      </div>
    </Grid>
  )
}

export default TableView