import React from 'react';
import PropTypes from 'prop-types';

import { Card, Stack, Container, Typography } from '@mui/material';

import useLanguage from 'src/locale/useLanguage';
import EditClientFormContainer from 'src/forms/client/edit';

export default function ClientEditView({ data }) {
  const translate = useLanguage();
  return (
    <Container>
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
          <EditClientFormContainer data={data} />
        </Card>
      </Stack>
    </Container>
  );
}

ClientEditView.propTypes = {
  data: PropTypes.object,
};
