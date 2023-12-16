import { Helmet } from 'react-helmet-async';

import JobViewTable from 'src/modules/job/view-table';
import { JobListProvider } from 'src/providers/job-view-list';

// ----------------------------------------------------------------------

export default function JobPage() {
  return (
    <>
      <Helmet>
        <title> Jobs | Mainter </title>
      </Helmet>

      <JobListProvider>
        <JobViewTable />
      </JobListProvider>

    </>
  );
}
