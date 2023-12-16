import { Helmet } from 'react-helmet-async';

import ClientViewTable from 'src/modules/client/view-table';
import { ClientListProvider } from 'src/providers/client-view-list';

// ----------------------------------------------------------------------

export default function ClientPage() {
  return (
    <>
      <Helmet>
        <title> Clients | Mainter </title>
      </Helmet>

      <ClientListProvider>
        <ClientViewTable />
      </ClientListProvider>

    </>
  );
}
