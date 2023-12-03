import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { CircularProgress } from '@mui/material';

import { getOneVehicle } from 'src/api/vehicles';
import VehicleEditView from 'src/modules/vehicle/edit';

export default function EditVehiclePage() {
  const params = useParams();
  const { id } = params;

  const { data: result, isFetching } = useQuery({
    queryKey: ['get-vehicle', id],
    queryFn: () => getOneVehicle(id),
  });

  if (isFetching) {
    return <CircularProgress />;
  }
  if (result.success) {
    return <VehicleEditView data={result?.data?.data} />;
  }

  return (
    <>
      <Helmet>
        <title> Edit Vehicle | Mainter </title>
      </Helmet>

      <div>Could not find client record with id: {id} </div>
    </>
  );
}
