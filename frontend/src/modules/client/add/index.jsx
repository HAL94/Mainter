import React from 'react';

import { Card, Stack, Container, Typography,  } from '@mui/material';

import useLanguage from 'src/locale/useLanguage';
import AddClientFormContainer from 'src/forms/client/add';

export default function ClientAddView() {
  const translate = useLanguage();
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{translate('clients.addNewClient')}</Typography>
      </Stack>

      <Stack alignItems="center" justifyContent="center" >
        <Card
          sx={{
            p: 5,
            width: 1,                 
          }}
        >
          <AddClientFormContainer />
        </Card>
      </Stack>
    </Container>
  );
}
