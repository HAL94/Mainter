import React from 'react';
import { Helmet } from 'react-helmet-async';

import ClientAddView from 'src/modules/client/add';

export default function AddClientPage() {
  return (
    <>
      <Helmet>
        <title> Add Client | Mainter </title>
      </Helmet>
      
      <ClientAddView />
    </>
  );
}
