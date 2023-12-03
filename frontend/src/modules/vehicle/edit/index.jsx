import React from 'react';
import PropTypes from 'prop-types';

import { Card, Link, Stack, Container, Typography, Breadcrumbs } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import EditVehicleForm from 'src/forms/vehicle/edit';
import useLanguage, { isRTL } from 'src/locale/useLanguage';

import Iconify from 'src/components/iconify';

export default function VehicleEditView({ data }) {
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
        <Typography color="text.primary">{translate('vehicles.editVehicle')}</Typography>
      </Breadcrumbs>

      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{translate('vehicles.editVehicle')}</Typography>
      </Stack>

      <Stack alignItems="center" justifyContent="center">
        <Card
          sx={{
            p: 5,
            width: 1,
          }}
        >
          <EditVehicleForm data={data} />
        </Card>
      </Stack>
    </Container>
  );
}

VehicleEditView.propTypes = {
  data: PropTypes.object,
};
