import { Helmet } from 'react-helmet-async';

import ClientView from 'src/modules/client/view-list';
import { ClientListProvider } from 'src/providers/client-view-list';

// ----------------------------------------------------------------------

export default function ClientPage() {
  return (
    <>
      <Helmet>
        <title> Clients | Mainter </title>
      </Helmet>

      <ClientListProvider>
        <ClientView />
      </ClientListProvider>

    </>
  );
}
