import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import type { Data } from 'dataMock/dataTables'

interface EnhancedTableHeadProps {
  numSelected: number;
  headOptions: HeadCell[]
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  withActionColumn: boolean;
  withCheckbox: boolean;
}

export interface HeadCell {
  id: keyof Data;
  label: string;
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const {
    onSelectAllClick,
    headOptions,
    numSelected,
    rowCount,
    withCheckbox,
    withActionColumn,
  } = props;

  return (
    <TableHead>
      <TableRow>
        {withCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
        )}
        {headOptions.map((headCell) => (
          <TableCell key={headCell.id}>
            {headCell.label}
          </TableCell>
        ))}
        {withActionColumn && (
          <TableCell>
            Action
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead
