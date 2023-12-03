import React from 'react';

import { Card, Link, Stack, Container, Typography, Breadcrumbs } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import AddVehicleForm from 'src/forms/vehicle/add';
import useLanguage, { isRTL } from 'src/locale/useLanguage';

import Iconify from 'src/components/iconify';

export default function VehicleAddView() {
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
            router.push('/vehicles');
          }}
        >
          <Iconify icon={isRTL() ? 'eva:arrow-forward-outline' : 'eva:arrow-back-outline'} />
          {translate('vehicles.pageTitle')}
        </Link>
        <Typography color="text.primary">{translate('vehicles.addNewVehicle')}</Typography>
      </Breadcrumbs>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{translate('vehicles.addNewVehicle')}</Typography>
      </Stack>

      <Stack alignItems="center" justifyContent="center">
        <Card
          sx={{
            p: 5,
            width: 1,
          }}
        >
          <AddVehicleForm />
        </Card>
      </Stack>
    </Container>
  );
}
