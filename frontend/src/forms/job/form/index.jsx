import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';

import useLanguage from 'src/locale/useLanguage';

import FORM_FIELDS from '../fields';
import WorkFormSection from './work-section';
import ClientSection from './client-section';
import ClientVehicleSection from './client-vehicle-section';
import TextInputField from '../../components/text-input-field';

export default function JobForm({
  control,
  onSubmit,
  errors,
  loading,
  submitLabel,
  watch,
  setValue,
}) {
  const ownerField = watch(FORM_FIELDS.ownerId);
  const translate = useLanguage();

  useEffect(() => {
    if (!ownerField) {
      setValue(FORM_FIELDS.vehicleId, null);
    }
  }, [ownerField, setValue]);

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={3}>
        <Typography variant="h5">{translate('jobForm.basicSectionTitle')}</Typography>
        <TextInputField
          control={control}
          name={FORM_FIELDS.title}
          type="text"
          errors={errors}
          disabled={loading}
          required
          inputProps={{
            label: translate(FORM_FIELDS.title),
          }}
        />

        <TextInputField
          control={control}
          name={FORM_FIELDS.description}
          type="text"
          errors={errors}
          disabled={loading}
          required
          inputProps={{
            label: translate(FORM_FIELDS.description),
          }}
        />

        <ClientSection control={control} loading={loading} />

        {ownerField && (
          <ClientVehicleSection
            control={control}
            loading={loading}
            clientId={ownerField}
            setValue={setValue}
          />
        )}

        <WorkFormSection control={control} errors={errors} loading={loading} />

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

JobForm.propTypes = {
  control: PropTypes.object,
  onSubmit: PropTypes.func,
  errors: PropTypes.object,
  loading: PropTypes.bool,
  submitLabel: PropTypes.string,
  watch: PropTypes.func,
  setValue: PropTypes.func,
};
