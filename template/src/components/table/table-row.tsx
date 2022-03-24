import React from 'react'
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MuiTableRow from '@mui/material/TableRow';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TableCell from '@mui/material/TableCell';

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

type RowRenderOption<TData, TComponent> = PartialRecord<keyof TData, TComponent>

export type TableRowProps<TData> = {
  columnKey: string,
  data: TData,
  isItemSelected?: boolean,
  labelId: string,
  onClick: (event: React.MouseEvent<unknown>, name: never) => void,
  rowRenderOption?: RowRenderOption<TData, (data: TData) => JSX.Element>,
  rowActionOptions: {
    label: string,
    onClick: (labelId: string) => void
  }[]
  withCheckbox: boolean
}

type TableRowComponent = <TData>(props: TableRowProps<TData>) => JSX.Element

const TableRow: TableRowComponent = ({
  columnKey,
  data,
  isItemSelected,
  labelId,
  onClick,
  rowActionOptions,
  rowRenderOption,
  withCheckbox,
}) => {
  const handleClickRow = (event: React.MouseEvent<unknown>) => onClick(event, data[columnKey] as never)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e?: any) => {
    e?.stopPropagation?.()
    setAnchorEl(null);
  };
  return (
    <MuiTableRow
      hover
      onClick={handleClickRow}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={data[columnKey] as string}
      selected={isItemSelected}
    >
      {withCheckbox && (
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              'aria-labelledby': labelId,
            }}
          />
        </TableCell>
      )}
      {Object.keys(data).map((key, index) => {
        const propsId = (index === 0) ? {
          id: labelId,
          scope: "row",
        } : {}

        const CustomRow = rowRenderOption && rowRenderOption[key]

        return (
          <TableCell key={`${data[key]}-${index}`} {...propsId}>
            {!!CustomRow
              ? (<CustomRow {...data} />)
              : data[key] as React.ReactNode
            }
          </TableCell>
        )
      })}
      {rowActionOptions.length > 0 && (
        <TableCell sx={{ zIndex: 100000 }}>
          <IconButton
            color="inherit"
            aria-label="open menu row"
            onClick={handleClick}
            edge="start"
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="row-action-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {rowActionOptions.map((rowAction, index) => {
              const handleClickMenu = () => {
                handleClose()
                rowAction.onClick(data[columnKey])
              }
              return (
                <MenuItem
                  key={`${rowAction.label}-${index}`}
                  onClick={handleClickMenu}
                >
                  {rowAction.label}
                </MenuItem>
              )
            })}
          </Menu>
        </TableCell>
      )}
    </MuiTableRow>
  )
}

export default TableRow