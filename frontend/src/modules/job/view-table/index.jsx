/* eslint-disable react/prop-types */
import React from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { Chip, Stack, MenuItem, TableCell, Typography, CircularProgress } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { getAllJobs } from 'src/api/jobs';
import useLanguage from 'src/locale/useLanguage';
import { useJobListContext } from 'src/providers/job-view-list';
import { TITLE, STATUS, DESCRIPTION, ORDER_NUMBER } from 'src/forms/job/fields';

import Iconify from 'src/components/iconify';

import JobTable from './table';
import DeleteJobDialog from '../delete';
import UpdateJobStatusDialog from '../update-status';

const getStatusColor = {
  UNDER_MAINTENANCE: 'primary.darker',
  CANCELD: 'error.main',
  COMPLETED: 'success.main',
};
const getStatusContrastColor = {
  UNDER_MAINTENANCE: 'primary.contrastText',
  CANCELD: 'error.contrastText',
  COMPLETED: 'success.contrastText',
};

export default function JobViewTable() {
  const { state, actions } = useJobListContext();
  const { page, rowsPerPage, query, status, order, orderBy } = state;
  const { deleteModal, statusModal } = actions;

  const router = useRouter();
  const translate = useLanguage();
  
  const {
    isLoading,
    isFetching,
    data: result,
  } = useQuery({
    queryKey: ['get-all-jobs', page, rowsPerPage, query, status, order, orderBy],
    queryFn: () =>
      getAllJobs({ pageNo: page, pageSize: rowsPerPage, query, status, orderBy, order }),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  const jobDataDef = [
    {
      id: TITLE,
      cell: (props) => (
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {props.cellData}
            </Typography>
          </Stack>
        </TableCell>
      ),
    },
    {
      id: DESCRIPTION,
      cell: (props) => <TableCell>{props.cellData}</TableCell>,
    },
    {
      id: ORDER_NUMBER,
      cell: (props) => <TableCell>{props.cellData}</TableCell>,
    },
    {
      id: 'client.fullName',
      cell: (props) => <TableCell align="left">{props.cellData}</TableCell>,
    },
    {
      id: STATUS,
      cell: (props) => (
        <TableCell align="center">
          <Chip
            label={translate('jobs.status')(props.cellData)}
            sx={{
              cursor: 'pointer',
              color: getStatusContrastColor[props.cellData],
              backgroundColor: getStatusColor[props.cellData],
            }}
          />
        </TableCell>
      ),
    },
  ];

  const jobActionMenu = [
    {
      id: 'on_job_edit',
      render: (props) => {
        // eslint-disable-next-line react/prop-types
        const { cellData } = props;
        // eslint-disable-next-line react/prop-types
        const { id } = cellData;
        return (
          <MenuItem
            onClick={() => {
              router.push(`/jobs/edit/${id}`);
            }}
          >
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            {translate('edit')}
          </MenuItem>
        );
      },
    },
    {
      id: 'on_job_delete',
      render: (props) => {
        // eslint-disable-next-line react/prop-types
        const { cellData, onClick } = props;
        const { id } = cellData;
        return (
          <MenuItem
            onClick={() => {
              deleteModal.setOpen([id]);
              onClick?.();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            {translate('delete')}
          </MenuItem>
        );
      },
    },
    {
      id: 'on_job_update_status',
      render: (props) => {
        // eslint-disable-next-line react/prop-types
        const { cellData, onClick } = props;
        return (
          <MenuItem
          onClick={() => {            
            statusModal.setOpen(cellData);
            onClick?.();
          }}
          sx={{ color: 'info.main' }}
        >
          <Iconify icon="eva:alert-circle-outline" sx={{ mr: 2 }} />
          {translate('jobs.updateStatus')}
        </MenuItem>
        );
      },
    },
  ];

  if (isLoading) {
    return <CircularProgress />;
  }

  if (result.success) {
    return (
      <>
        <JobTable
          loading={isFetching}
          tableState={state}
          tableActions={actions}
          data={result.data.table.data}
          dataCount={result.data.table.length}
          dataDef={jobDataDef}
          actionMenu={jobActionMenu}
        />
        <DeleteJobDialog />
        <UpdateJobStatusDialog />
      </>
    );
  }

  return <div>Could not fetch clients, please try again</div>;
}
