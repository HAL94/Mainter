import React from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { CircularProgress } from '@mui/material';

import { getAllClients } from 'src/api/clients';
import { useClientListContext } from 'src/providers/client-view-list';

import ClientPage from './client-table-container';
import DeleteClientDialogContainer from '../delete';

export default function ClientView() {
  const { state, actions } = useClientListContext();
  const { page, rowsPerPage, query, type, order, orderBy } = state;

  const {
    isLoading,
    isFetching,
    data: result,
  } = useQuery({
    queryKey: ['get-all-clients', page, rowsPerPage, query, type, order, orderBy],
    queryFn: () =>
      getAllClients({ pageNo: page, pageSize: rowsPerPage, query, type, orderBy, order }),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (result.success) {
    return (
      <>
        <ClientPage
          loading={isFetching}
          tableState={state}
          tableActions={actions}
          data={result.data.table.data}
          dataCount={result.data.table.length}
        />
        <DeleteClientDialogContainer />
      </>
    );
  }

  return <div>Could not fetch clients, please try again</div>;
}
