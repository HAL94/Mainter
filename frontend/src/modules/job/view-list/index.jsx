import React from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { CircularProgress } from '@mui/material';

import { getAllJobs } from 'src/api/jobs';
import { useJobListContext } from 'src/providers/job-view-list';

import DeleteJobDialog from '../delete';
import UpdateJobStatusDialog from '../update-status';
import JobTableContainer from './job-table-container';

export default function JobView() {
  const { state, actions } = useJobListContext();
  const { page, rowsPerPage, query, status, order, orderBy } = state;

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

  if (isLoading) {
    return <CircularProgress />;
  }

  if (result.success) {
    return (
      <>
        <JobTableContainer
          loading={isFetching}
          tableState={state}
          tableActions={actions}
          data={result.data.table.data}
          dataCount={result.data.table.length}
        />
        <DeleteJobDialog />
        <UpdateJobStatusDialog />
      </>
    );
  }

  return <div>Could not fetch clients, please try again</div>;
}
