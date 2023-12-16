import { Helmet } from 'react-helmet-async';

import VehicleViewTable from 'src/modules/vehicle/view-table';
import { VehicleListProvider } from 'src/providers/vehicle-view-list';

// ----------------------------------------------------------------------

export default function VehiclePage() {
  return (
    <>
      <Helmet>
        <title> Vehicles | Mainter </title>
      </Helmet>

      <VehicleListProvider>
        <VehicleViewTable />
      </VehicleListProvider>

    </>
  );
}
