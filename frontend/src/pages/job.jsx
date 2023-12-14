import { Helmet } from 'react-helmet-async';

import JobView from 'src/modules/job/view-list';
import { JobListProvider } from 'src/providers/job-view-list';

// ----------------------------------------------------------------------

export default function JobPage() {
  return (
    <>
      <Helmet>
        <title> Jobs | Mainter </title>
      </Helmet>

      <JobListProvider>
        <JobView />
      </JobListProvider>

    </>
  );
}
