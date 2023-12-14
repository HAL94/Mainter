import React from 'react';

import { Card, Link, Stack, Container, Typography, Breadcrumbs } from '@mui/material';

import AddClientForm from 'src/forms/client/add';
import useLanguage, { isRTL } from 'src/locale/useLanguage';

import Iconify from 'src/components/iconify';

export default function ClientAddView() {
  const translate = useLanguage();
  
  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" mb={4}>
        <Link underline="hover" color="inherit" href="/clients" sx={{ display: 'flex', gap: 1 }}>
          <Iconify icon={isRTL() ? 'eva:arrow-forward-outline' : 'eva:arrow-back-outline'} />
          {translate('clients.pageTitle')}
        </Link>
        <Typography color="text.primary">{translate('clients.addNewClient')}</Typography>
      </Breadcrumbs>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{translate('clients.addNewClient')}</Typography>
      </Stack>

      <Stack alignItems="center" justifyContent="center">
        <Card
          sx={{
            p: 5,
            width: 1,
          }}
        >
          <AddClientForm />
        </Card>
      </Stack>
    </Container>
  );
}
