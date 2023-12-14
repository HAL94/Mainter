import { Helmet } from 'react-helmet-async';

import VehicleViewList from 'src/modules/vehicle/view-list';
import { VehicleListProvider } from 'src/providers/vehicle-view-list';

// ----------------------------------------------------------------------

export default function VehiclePage() {
  return (
    <>
      <Helmet>
        <title> Vehicles | Mainter </title>
      </Helmet>

      <VehicleListProvider>
        <VehicleViewList />
      </VehicleListProvider>

    </>
  );
}
