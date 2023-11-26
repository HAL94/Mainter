import React from 'react';
import { Helmet } from 'react-helmet-async';

import ClientAddView from 'src/sections/client/add/client-add-view';

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
