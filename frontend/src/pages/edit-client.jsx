import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { CircularProgress } from '@mui/material';

import { getOneClient } from 'src/api/clients';
import ClientEditView from 'src/modules/client/edit';



export default function EditClientPage() {
  const params = useParams();
  const { id } = params;

  const { data: result, isFetching } = useQuery({
    queryKey: ['get-client', id],
    queryFn: () => getOneClient(id),   
  });

  if (isFetching) {
    return <CircularProgress />;
  }
  if (result.success) {
    console.log('got client data', result?.data?.data);
    return <ClientEditView data={result?.data?.data} />;
  }


  return (
    <>
      <Helmet>
        <title> Edit Client | Mainter </title>
      </Helmet>

      <div>Could not find client record with id: {id} </div>
    </>
  );
}
