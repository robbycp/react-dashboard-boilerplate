import React from 'react'

import Table from 'components/table/table-view'
import { rows } from 'dataMock/dataTables'
import { styled } from '@mui/system'
import type { HeadCell } from 'components/table/table-head'
import { useNavigate } from 'react-router-dom'

const LayoutTable = styled('div')(() => ({
  height: '100%',
}))

const headCells: HeadCell[] = [
  {
    id: 'name',
    label: 'Dessert (100g serving)',
  },
  {
    id: 'calories',
    label: 'Calories',
  },
  {
    id: 'fat',
    label: 'Fat (g)',
  },
  {
    id: 'carbs',
    label: 'Carbs (g)',
  },
  {
    id: 'protein',
    label: 'Protein (g)',
  },
];

const PageTableView = () => {
  const navigate = useNavigate()
  const handleChangePage = (newPage: number) => {
    console.log('newPage', newPage)
  }
  const handleChangeRowsPerPage = (newRow: number) => {
    console.log('newRow', newRow)
  }
  const rowActionOptions = [
    {
      label: 'View Detail',
      onClick: (rowId: unknown) => {
        navigate(`/table/${rowId}`)
      }
    },
    {
      label: 'Delete',
      onClick: (rowId: unknown) => {
        console.log('delete', rowId)
      }
    },
  ]
  const bulkOptions = [
    {
      label: 'Delete All',
      onClick: (selected: unknown[]) => {
        console.log('delete all', selected)
      },
    },
    {
      label: 'Export',
      onClick: (selected: unknown[]) => {
        console.log('export data', selected)
      },
    },
  ]
  return (
    <LayoutTable>
      <Table
        checkboxOptions={{
          bulkOptions,
          onSelect: (rowId: unknown) => {
            console.log('select', rowId)
          }
        }}
        tableTitle="Nutrition Table"
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        rowActionOptions={rowActionOptions}
        columnKey="name"
        rows={rows}
        headOptions={headCells}
        rowsPerPageOptions={[10, 20, 50, 100]}
      />
    </LayoutTable>
  )
}

export default PageTableView