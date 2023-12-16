/* eslint-disable react/prop-types */
import React from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { Stack, MenuItem, TableCell, Typography, CircularProgress } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import useLanguage from 'src/locale/useLanguage';
import { getAllVehicles } from 'src/api/vehicles';
import { useVehicleListContext } from 'src/providers/vehicle-view-list';
import { MAKE, YEAR, MODEL, PLATE, ENGINENO } from 'src/forms/vehicle/fields';

import Iconify from 'src/components/iconify';

import VehicleTable from './table';
import DeleteVehicleDialog from '../delete';

export default function VehicleViewTable() {
  const { state, actions } = useVehicleListContext();
  const { page, rowsPerPage, query, order, orderBy } = state;
  const { deleteModal } = actions;

  const router = useRouter();
  const translate = useLanguage();

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

  const vehicleDataDef = [
    {
      id: MAKE,
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
      id: MODEL,
      cell: (props) => <TableCell>{props.cellData}</TableCell>,
    },
    {
      id: PLATE,
      cell: (props) => <TableCell>{props.cellData}</TableCell>,
    },
    {
      id: YEAR,
      cell: (props) => <TableCell align="center">{props.cellData}</TableCell>,
    },
    {
      id: ENGINENO,
      cell: (props) => <TableCell align="center">{props.cellData}</TableCell>,
    },
    {
      id: 'client.fullName',
      cell: (props) => <TableCell>{props.cellData}</TableCell>,
    },
  ];

  const vehicleActionMenu = [
    {
      id: 'on_vehicle_edit',
      render: (props) => {
        // eslint-disable-next-line react/prop-types
        const { cellData } = props;
        // eslint-disable-next-line react/prop-types
        const { id } = cellData;
        return (
          <MenuItem
            onClick={() => {
              router.push(`/vehicles/edit/${id}`);
            }}
          >
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            {translate('edit')}
          </MenuItem>
        );
      },
    },
    {
      id: 'on_vehicle_delete',
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
  ];


  if (isLoading) {
    return <CircularProgress />;
  }

  if (result.success) {
    return (
      <>
        <VehicleTable
          loading={isFetching}
          tableState={state}
          tableActions={actions}
          data={result.data.table.data}
          dataCount={result.data.table.length}
          dataDef={vehicleDataDef}
          actionMenu={vehicleActionMenu}
        />
        <DeleteVehicleDialog />
      </>
    );
  }

  return <div>Could not fetch clients, please try again</div>;
}
