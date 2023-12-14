import React from 'react';
import { Helmet } from 'react-helmet-async';

import JobAddView from 'src/modules/job/add';

export default function AddJobPage() {
  return (
    <>
      <Helmet>
        <title> Add Job | Mainter </title>
      </Helmet>
      
      <JobAddView />
    </>
  );
}
