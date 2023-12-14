import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { useRouter } from 'src/routes/hooks';

import {
  getLocalizedLabelsRowsPerPage,
  getLocalizedDisplayedRowsLabel,
} from 'src/utils/table-labels';

// import useLanguage from 'src/locale/useLanguage';
import useLanguage from 'src/locale/useLanguage';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import TableLoadingSkeleton from 'src/components/table-loading-skeleton';

import TableNoData from './table/table-no-data';
import JobTableRow from './table/job-table-row';
import columnLabels from './table/column-labels';
import JobTableHead from './table/job-table-head';
import ClientTableToolbar from './table/job-table-toolbar';

// ----------------------------------------------------------------------

export default function JobTableContainer({ data, dataCount, tableState, tableActions, loading }) {
  const { page, query, rowsPerPage, selected } = tableState;
  const { setPage, setRowsPerPage, setSelected, deleteModal, statusModal } = tableActions;

  const router = useRouter();
  const translate = useLanguage();

  // const translate = useLanguage();

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
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

  const handleConfirmDelete = (row) => {
    // console.log('should delete row', row);
    deleteModal.setOpen([row.id]);
  };

  const handleJobStatusModal = (row) => {
    statusModal.setOpen(row);
  };

  const emptyTable = !data.length && !!query;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{translate('jobs.pageTitle')}</Typography>

        <Button
          onClick={() => {
            router.push('/jobs/add');
          }}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          {translate('jobs.newJob')}
        </Button>
      </Stack>

      <Card>
        <ClientTableToolbar />
        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <JobTableHead
                rowCount={data.length}
                onSelectAllClick={handleSelectAllClick}
                columns={columnLabels}
              />
              {loading ? (
                <TableLoadingSkeleton skeletonLen={rowsPerPage} />
              ) : (
                <TableBody>
                  {data.map((row) => (
                    <JobTableRow
                      key={row.id}
                      data={row}
                      selected={selected.indexOf(row.id) !== -1}
                      handleDeleteClick={() => handleConfirmDelete(row)}
                      handleStatusUpdate={() => handleJobStatusModal(row)}
                      handleClick={(event) => handleClick(event, row.id)}
                    />
                  ))}
                  {emptyTable && <TableNoData query={query} />}
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
      </Card>

      <Outlet />
    </Container>
  );
}

JobTableContainer.propTypes = {
  data: PropTypes.array,
  dataCount: PropTypes.number,
  tableState: PropTypes.object,
  tableActions: PropTypes.object,
  loading: PropTypes.bool,
};
