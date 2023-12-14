import React from 'react';
import { Helmet } from 'react-helmet-async';

import VehicleAddView from 'src/modules/vehicle/add';

export default function AddVehiclePage() {
  return (
    <>
      <Helmet>
        <title> Add Vehicle | Mainter </title>
      </Helmet>
      
      <VehicleAddView />
    </>
  );
}
