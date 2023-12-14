import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { Box, Button, Divider, Typography } from '@mui/material';

import useLanguage from 'src/locale/useLanguage';
import AddVehicleForm from 'src/forms/vehicle/add';
import VehicleAutocompleteField from 'src/forms/components/vehicle-autocomplete-field';

import CustomDialog from 'src/components/custom-dialog';

import FORM_FIELDS from '../fields';
import { OWNERID } from '../../vehicle/fields';

export default function ClientVehicleSection({ clientId, control, loading, setValue }) {
  const [open, setOpen] = useState(false);
  const client = useQueryClient();
  const translate = useLanguage();
  const dialogTitle = translate('vehicles.addNewVehicle');
  const dialogContent = (
    <AddVehicleForm
      onSuccessCb={(result) => {
        client.invalidateQueries({ queryKey: ['vehicle-lookup'] });

        setOpen(false);

        setValue(FORM_FIELDS.vehicleId, result.data.id);
      }}
      submitLabel={translate('add')}
      formValues={{
        [OWNERID]: clientId,
      }}
    />
  );
  const dialogActions = (
    <Button sx={{ color: 'primary.main' }} disabled={loading} onClick={() => setOpen(!open)}>
      {translate('deleteModalCancel')}
    </Button>
  );

  return (
    <>
      <Divider />
      <Box display="flex" flexDirection="column">
        <Typography variant="h5" mb={3}>
          {translate('jobForm.clientVehicleTitle')}
        </Typography>
        <VehicleAutocompleteField
          control={control}
          name={FORM_FIELDS.vehicleId}
          disabled={loading}
          clientId={Number(clientId)}
          inputProps={{
            label: 'Vehicle',
            required: true,
          }}
          enabled
        />
        <Button
          sx={{ mt: 2, maxWidth: 160 }}
          width="auto"
          onClick={() => setOpen(!open)}
          variant={open ? 'outlined' : 'contained'}
          color="primary"
        >
          {translate('vehicles.addNewVehicle')}
        </Button>
        <CustomDialog
          handleClose={() => {
            if (loading) return;
            setOpen(false);
          }}
          loading={loading}
          open={open}
          title={dialogTitle}
          content={dialogContent}
          actions={dialogActions}
        />
      </Box>
    </>
  );
}

ClientVehicleSection.propTypes = {
  control: PropTypes.object,
  clientId: PropTypes.number,
  loading: PropTypes.bool,
  setValue: PropTypes.func,
};
