import React from 'react';

import { Card, Link, Stack, Container, Typography, Breadcrumbs } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import AddJobForm from 'src/forms/job/add';
import useLanguage, { isRTL } from 'src/locale/useLanguage';

import Iconify from 'src/components/iconify';

export default function JobAddView() {
  const router = useRouter();
  const translate = useLanguage();
  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" mb={4}>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => router.push('/jobs')}
          sx={{ display: 'flex', gap: 1, cursor: 'pointer' }}
        >
          <Iconify icon={isRTL() ? 'eva:arrow-forward-outline' : 'eva:arrow-back-outline'} />
          {translate('jobs.pageTitle')}
        </Link>
        <Typography color="text.primary">{translate('jobs.addNewJob')}</Typography>
      </Breadcrumbs>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{translate('jobs.addNewJob')}</Typography>
      </Stack>

      <Stack alignItems="center" justifyContent="center">
        <Card
          sx={{
            p: 5,
            width: 1,
          }}
        >
          <AddJobForm />
        </Card>
      </Stack>
    </Container>
  );
}
