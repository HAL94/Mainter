import React from 'react';
import PropTypes from 'prop-types';

import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

import { visuallyHidden } from 'src/utils/styles';

import { currentLocal } from 'src/locale/translation';

export default function AppTableHead({
  state,
  actions,
  rowCount,
  columns,
  onSelectAllClick,
  hasCheckbox,
  enableSort,
}) {
  const { order, orderBy, selected } = state;
  const { setOrder, setOrderBy } = actions;

  const numSelected = selected.length;

  const onSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    if (property !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    }
  };
  const local = currentLocal();

  return (
    <TableHead>
      <TableRow>
        {hasCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}

        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            {enableSort ? (
              <TableSortLabel
                hideSortIcon
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={() => onSort(headCell.id)}
              >
                {headCell?.label?.[local]}
                {orderBy === headCell.id ? (
                  <Box sx={{ ...visuallyHidden }}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell?.label?.[local]
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

AppTableHead.propTypes = {
  state: PropTypes.object,
  actions: PropTypes.object,
  rowCount: PropTypes.number,
  columns: PropTypes.array,
  onSelectAllClick: PropTypes.func,
  hasCheckbox: PropTypes.bool,
  enableSort: PropTypes.bool,
};
