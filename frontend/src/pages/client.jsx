import { Helmet } from 'react-helmet-async';

import { ClientView } from 'src/sections/client/view-list';

// ----------------------------------------------------------------------

export default function ClientPage() {
  return (
    <>
      <Helmet>
        <title> Clients | Mainter </title>
      </Helmet>

      <ClientView />
    </>
  );
}
