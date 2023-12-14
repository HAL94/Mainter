import { Helmet } from 'react-helmet-async';

import AppView from 'src/modules/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard | Mainter </title>
      </Helmet>

      <AppView />
    </>
  );
}
