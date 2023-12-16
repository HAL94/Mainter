/* eslint-disable react/prop-types */
import React from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { Stack, MenuItem, TableCell, Typography, CircularProgress } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { getAllClients } from 'src/api/clients';
import useLanguage from 'src/locale/useLanguage';
import { useClientListContext } from 'src/providers/client-view-list';
import { TYPE, EMAIL, MOBILE, FULL_NAME, BUSINESS_NAME } from 'src/forms/client/fields';

import Iconify from 'src/components/iconify';

import ClientTable from './table';
import DeleteClientDialog from '../delete';

export default function ClientViewTable() {
  const { state, actions } = useClientListContext();
  const { page, rowsPerPage, query, type, order, orderBy } = state;
  const { deleteModal } = actions;

  const translate = useLanguage();
  const router = useRouter();

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

  const clientDataDef = [
    {
      id: FULL_NAME,
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
      id: MOBILE,
      cell: (props) => <TableCell>{props.cellData}</TableCell>,
    },
    {
      id: TYPE,
      cell: (props) => <TableCell>{props.cellData}</TableCell>,
    },
    {
      id: BUSINESS_NAME,
      cell: (props) => <TableCell align="center">{props.cellData}</TableCell>,
    },
    {
      id: EMAIL,
      cell: (props) => <TableCell>{props.cellData}</TableCell>,
    }    
  ];

  const clientActionMenu = [
    {
      id: 'on_client_edit',
      render: (props) => {
        // eslint-disable-next-line react/prop-types
        const { cellData } = props;
        // eslint-disable-next-line react/prop-types
        const { id } = cellData;
        return (
          <MenuItem
            onClick={() => {
              router.push(`/clients/edit/${id}`);
            }}
          >
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            {translate('edit')}
          </MenuItem>
        );
      },
    },
    {
      id: 'on_client_delete',
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
        <ClientTable
          loading={isFetching}
          tableState={state}
          tableActions={actions}
          data={result.data.table.data}
          dataDef={clientDataDef}
          actionMenu={clientActionMenu}
          dataCount={result.data.table.length}
        />
        <DeleteClientDialog />
      </>
    );
  }

  return <div>Could not fetch clients, please try again</div>;
}
