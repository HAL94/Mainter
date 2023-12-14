import React from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { CircularProgress } from '@mui/material';

import { getAllVehicles } from 'src/api/vehicles';
import { useVehicleListContext } from 'src/providers/vehicle-view-list';

import DeleteVehicleDialog from '../delete';
import VehicleTableContainer from './vehicle-table-container';

export default function VehicleViewList() {
  const { state, actions } = useVehicleListContext();
  const { page, rowsPerPage, query, order, orderBy } = state;

  const {
    isLoading,
    isFetching,
    data: result,
  } = useQuery({
    queryKey: ['get-all-vehicles', page, rowsPerPage, query, order, orderBy],
    queryFn: () => getAllVehicles({ pageNo: page, pageSize: rowsPerPage, query, orderBy, order }),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (result.success) {
    return (
      <>
        <VehicleTableContainer
          loading={isFetching}
          tableState={state}
          tableActions={actions}
          data={result.data.table.data}
          dataCount={result.data.table.length}
        />
        <DeleteVehicleDialog />
      </>
    );
  }

  return <div>Could not fetch clients, please try again</div>;
}
