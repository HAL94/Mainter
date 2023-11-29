import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

import { currentLocal } from 'src/locale/translation';
import { useClientListContext } from 'src/providers/client-view-list';

import { visuallyHidden } from '../../utils';

// ----------------------------------------------------------------------

export default function ClientTableHead({ rowCount, columns, onSelectAllClick }) {
  const { state, actions } = useClientListContext();
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
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>

        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
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
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

ClientTableHead.propTypes = {
  // order: PropTypes.oneOf(['asc', 'desc']),
  // orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  columns: PropTypes.array,
  // numSelected: PropTypes.number,
  // onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};
