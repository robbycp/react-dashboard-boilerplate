import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

import EnhancedTableHead, { HeadCell } from './table-head'
import EnhancedTableRow, { TableRowProps } from './table-row'
import EnhancedTableToolbar, { EnhancedTableToolbarProps } from './table-toolbar'

export interface TableProps {
  rowActionOptions?: TableRowProps['rowActionOptions']
  columnKey: string
  headOptions: HeadCell[]
  onChangePage: (newPage: number) => void,
  onChangeRowsPerPage: (newPage: number) => void,
  rows: Record<string, unknown>[]
  rowsPerPageOptions?: number[]
  checkboxOptions?: {
    bulkOptions: EnhancedTableToolbarProps['bulkOptions']
    onSelect: (selected: never[]) => void,
  },
  tableTitle: string
}

const EnhancedTable = ({
  rowActionOptions = [],
  checkboxOptions,
  columnKey,
  headOptions,
  onChangePage,
  onChangeRowsPerPage,
  rows,
  rowsPerPageOptions = [5, 10, 25],
  tableTitle,
}: TableProps) => {
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n[columnKey]);
      checkboxOptions?.onSelect(newSelecteds as never[])
      setSelected(newSelecteds as never[]);
      return;
    }
    checkboxOptions?.onSelect([] as never[])
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: never) => {
    if (!checkboxOptions) {
      return
    }
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    checkboxOptions.onSelect(newSelected as never[])
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    onChangePage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const perPage = parseInt(event.target.value, 10)
    onChangeRowsPerPage(perPage)
    setRowsPerPage(perPage);
    setPage(0);
  };

  const isSelected = (name: never) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const propsHead = {
    headOptions,
    numSelected: selected.length,
    onSelectAllClick: handleSelectAllClick,
    rowCount: rows.length,
    withCheckbox: !!checkboxOptions,
    withActionColumn: rowActionOptions.length > 0,
  }

  const propsToolbar = {
    numSelected: selected.length,
    tableTitle: tableTitle,
    bulkOptions: checkboxOptions?.bulkOptions,
    selectedData: selected,
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar {...propsToolbar} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <EnhancedTableHead {...propsHead} />
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row[columnKey] as never);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  const props = {
                    columnKey,
                    onClick: handleClick,
                    data: row,
                    isItemSelected,
                    labelId,
                    rowActionOptions,
                    withCheckbox: !!checkboxOptions,
                  }

                  return <EnhancedTableRow key={labelId} {...props} />
                })}
              {emptyRows > 0 && (
                <TableRow key="empty">
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default EnhancedTable
