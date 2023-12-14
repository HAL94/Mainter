import React from 'react';
import PropTypes from 'prop-types';

import { Divider, Typography } from '@mui/material';

import useLanguage from 'src/locale/useLanguage';
import OwnerAutocompleteField from 'src/forms/components/owner-autocomplete-field';

import FORM_FIELDS from '../fields';

export default function ClientSection({ control, loading }) {
  const translate = useLanguage();
  return (
    <>
      <Divider />

      <Typography variant="h5">{translate('jobForm.clientSectionTitle')}</Typography>

      <OwnerAutocompleteField
        control={control}
        name={FORM_FIELDS.ownerId}
        disabled={loading}
        inputProps={{
          label: translate(`vehicleForm.label.${FORM_FIELDS.ownerId}`),
          required: true,
        }}
        enabled
      />
    </>
  );
}

ClientSection.propTypes = {
  control: PropTypes.object,
  loading: PropTypes.bool,
};
