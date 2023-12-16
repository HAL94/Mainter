import React from 'react';
import PropTypes from 'prop-types';

import { Table, TableBody, TableContainer, TablePagination } from '@mui/material';

import { getLocalizedLabelsRowsPerPage, getLocalizedDisplayedRowsLabel } from 'src/utils/table';

import Scrollbar from '../scrollbar';
import AppTableRow from './table-row';
import AppTableHead from './table-head';
import TableNoData from './table-no-data';
import TableQueryNoData from './table-query-no-data';
import TableLoadingSkeleton from './table-loading-skeleton';

export default function AppTable({
  data,
  dataCount,
  dataDef,
  actionMenu,
  loading,
  columnLabels,
  tableState,
  tableActions,
  enableSort,
  hasAction,
  hasCheckbox
}) {
  const { page, query, rowsPerPage, selected } = tableState;
  const { setPage, setRowsPerPage, setSelected } = tableActions;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(1);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const emptyTableResult = !data.length && !!query;

  return (
    <>
      <Scrollbar>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <AppTableHead
              rowCount={data.length}
              onSelectAllClick={handleSelectAllClick}
              columns={columnLabels}
              state={tableState}
              actions={tableActions}
              enableSort={enableSort}
              hasCheckbox={hasCheckbox}
            />
            {loading ? (
              <TableLoadingSkeleton skeletonLen={rowsPerPage} />
            ) : (
              <TableBody>
                {data.map((row) => (
                  <AppTableRow
                    key={row.id}
                    data={row}
                    selected={selected.indexOf(row.id) !== -1}
                    hasCheckbox={hasCheckbox}
                    hasAction={hasAction}
                    dataDef={dataDef}
                    actionMenu={actionMenu}
                    handleCheck={(event) => handleClick(event, row.id)}
                  />
                ))}
                {!data || (!data.length && <TableNoData />)}
                {emptyTableResult && <TableQueryNoData query={query} />}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        page={page - 1}
        component="div"
        count={dataCount}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage={getLocalizedLabelsRowsPerPage()}
        labelDisplayedRows={({ from, to, count }) =>
          getLocalizedDisplayedRowsLabel({ from, to, count })
        }
        SelectProps={{
          disabled: loading,
        }}
        backIconButtonProps={
          loading
            ? {
                disabled: loading,
              }
            : undefined
        }
        nextIconButtonProps={
          loading
            ? {
                disabled: loading,
              }
            : undefined
        }
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}

AppTable.propTypes = {
  data: PropTypes.array,
  dataCount: PropTypes.number,
  tableState: PropTypes.object,
  tableActions: PropTypes.object,
  loading: PropTypes.bool,
  dataDef: PropTypes.array,
  actionMenu: PropTypes.array,
  columnLabels: PropTypes.array,
  enableSort: PropTypes.bool,
  hasAction: PropTypes.bool,
  hasCheckbox: PropTypes.bool
};
