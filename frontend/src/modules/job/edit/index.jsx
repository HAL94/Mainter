import React from 'react';
import PropTypes from 'prop-types';

import { Link, Card, Stack, Container, Typography, Breadcrumbs } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import EditJobForm from 'src/forms/job/edit';
import useLanguage, { isRTL } from 'src/locale/useLanguage';

import Iconify from 'src/components/iconify';

export default function JobEditView({ data }) {
  const translate = useLanguage();
  const router = useRouter();

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" mb={4}>
        <Link
          underline="hover"
          color="inherit"
          sx={{ display: 'flex', gap: 1, cursor: 'pointer' }}
          onClick={() => {
            router.push('/jobs');
          }}
        >
          <Iconify icon={isRTL() ? 'eva:arrow-forward-outline' : 'eva:arrow-back-outline'} />
          {translate('jobs.pageTitle')}
        </Link>
        <Typography color="text.primary">{translate('jobs.editJob')}</Typography>
      </Breadcrumbs>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{translate('jobs.editJob')}</Typography>
      </Stack>

      <Stack alignItems="center" justifyContent="center">
        <Card
          sx={{
            p: 5,
            width: 1,
          }}
        >
          <EditJobForm data={data} />
        </Card>
      </Stack>
    </Container>
  );
}

JobEditView.propTypes = {
    data: PropTypes.object,
}