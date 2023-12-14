import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { CircularProgress } from '@mui/material';

import { getOneJob } from 'src/api/jobs';
import JobEditView from 'src/modules/job/edit';

export default function EditJobPage() {
  const params = useParams();
  const { id } = params;

  const { data: result, isFetching } = useQuery({
    queryKey: ['get-job', id],
    queryFn: () => getOneJob(id),
  });

  if (isFetching) {
    return <CircularProgress />;
  }
  if (result.success) {
    return <JobEditView data={result.data} />;
  }

  return (
    <>
      <Helmet>
        <title> Edit Job | Mainter </title>
      </Helmet>

      <div>Could not find job record with id: {id} </div>
    </>
  );
}
