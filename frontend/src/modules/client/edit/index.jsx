import React from 'react';
import PropTypes from 'prop-types';

import { Card, Link, Stack, Container, Typography, Breadcrumbs } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import EditClientForm from 'src/forms/client/edit';
import useLanguage, { isRTL } from 'src/locale/useLanguage';

import Iconify from 'src/components/iconify';

export default function ClientEditView({ data }) {
  const translate = useLanguage();
  const router = useRouter();
  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" mb={4}>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => router.push('/clients')}
          sx={{ display: 'flex', gap: 1, cursor: 'pointer' }}
        >
          <Iconify icon={isRTL() ? 'eva:arrow-forward-outline' : 'eva:arrow-back-outline'} />
          {translate('clients.pageTitle')}
        </Link>
        <Typography color="text.primary">
          {translate('edit')} {data.fullName}
        </Typography>
      </Breadcrumbs>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{translate('clients.editClient')}</Typography>
      </Stack>

      <Stack alignItems="center" justifyContent="center">
        <Card
          sx={{
            p: 5,
            width: 1,
          }}
        >
          <EditClientForm data={data} />
        </Card>
      </Stack>
    </Container>
  );
}

ClientEditView.propTypes = {
  data: PropTypes.object,
};
