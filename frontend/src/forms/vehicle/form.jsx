import React from 'react';
import PropTypes from 'prop-types';

import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import useLanguage from 'src/locale/useLanguage';

import FORM_FIELDS from './fields';
import TextInputField from '../components/text-input-field';
import OwnerAutocompleteField from '../components/owner-autocomplete-field';

export default function VehicleForm({ control, onSubmit, errors, loading, submitLabel, getValues }) {
  const translate = useLanguage();  
  
  console.log('ownerId', getValues?.(FORM_FIELDS.ownerId));
  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={3}>
        <OwnerAutocompleteField
          control={control}
          name={FORM_FIELDS.ownerId}
          disabled={loading}
          inputProps={{
            label: translate(`vehicleForm.label.${FORM_FIELDS.ownerId}`),
            required: true,
          }}
          enabled={Boolean(getValues?.(FORM_FIELDS.ownerId))}
        />

        <TextInputField
          control={control}
          name={FORM_FIELDS.make}
          type="text"
          errors={errors}
          disabled={loading}
          required
          inputProps={{
            label: translate(`vehicleForm.label.${FORM_FIELDS.make}`),
          }}
        />

        <TextInputField
          control={control}
          name={FORM_FIELDS.model}
          type="text"
          errors={errors}
          disabled={loading}
          required
          inputProps={{
            label: translate(`vehicleForm.label.${FORM_FIELDS.model}`),
          }}
        />

        <TextInputField
          control={control}
          name={FORM_FIELDS.year}
          type="text"
          errors={errors}
          disabled={loading}
          required
          inputProps={{
            label: translate(`vehicleForm.label.${FORM_FIELDS.year}`),
          }}
        />

        <TextInputField
          control={control}
          name={FORM_FIELDS.plate}
          type="text"
          errors={errors}
          disabled={loading}
          required
          inputProps={{
            label: translate(`vehicleForm.label.${FORM_FIELDS.plate}`),
          }}
        />

        <TextInputField
          control={control}
          name={FORM_FIELDS.engineNo}
          type="text"
          errors={errors}
          disabled={loading}
          inputProps={{
            label: translate(`vehicleForm.label.${FORM_FIELDS.engineNo}`),
          }}
        />

        <LoadingButton
          loading={loading}
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
        >
          {submitLabel}
        </LoadingButton>
      </Stack>
    </form>
  );
}

VehicleForm.propTypes = {
  control: PropTypes.object,
  onSubmit: PropTypes.func,
  errors: PropTypes.object,
  loading: PropTypes.bool,
  submitLabel: PropTypes.string,
  getValues: PropTypes.func,
};
