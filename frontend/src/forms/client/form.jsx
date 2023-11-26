import React from 'react';
import PropTypes from 'prop-types';
import { faker } from '@faker-js/faker';

import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import useLanguage from 'src/locale/useLanguage';

import FORM_FIELDS from './fields';
import TextInputField from '../components/text-input-field';
import SelectInputField from '../components/select-input-field';

export default function ClientForm({ control, onSubmit, errors, watch, loading }) {
  const translate = useLanguage();
  const typeWatch = watch(FORM_FIELDS.type);
  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={3}>
        <SelectInputField
          control={control}
          name={FORM_FIELDS.type}
          errors={errors}
          required
          disabled={loading}
          inputProps={{
            label: translate('clientForm.label.clientType'),
          }}
          options={[
            {
              id: faker.string.uuid(),
              label: translate('clientForm.individual'),
              value: 'INDIVIDUAL',
            },
            { id: faker.string.uuid(), label: translate('clientForm.business'), value: 'BUSINESS' },
          ]}
        />
        {typeWatch === 'BUSINESS' && (
          <TextInputField
            control={control}
            name={FORM_FIELDS.businessName}
            type="text"
            errors={errors}
            disabled={loading}
            required
            inputProps={{
              label: translate(`clientForm.label.${FORM_FIELDS.businessName}`),
            }}
          />
        )}
        <TextInputField
          control={control}
          name={FORM_FIELDS.fullName}
          type="text"
          errors={errors}
          disabled={loading}
          required
          inputProps={{
            label: translate(`clientForm.label.${FORM_FIELDS.fullName}`),
          }}
        />

        <TextInputField
          control={control}
          name={FORM_FIELDS.mobile}
          type="text"
          errors={errors}
          disabled={loading}
          required
          inputProps={{
            label: translate('mobileNumber'),
          }}
        />

        <TextInputField
          control={control}
          name={FORM_FIELDS.email}
          type="email"
          errors={errors}
          disabled={loading}
          inputProps={{
            label: translate('emailAddress'),
          }}
        />

        <LoadingButton
          loading={loading}
          size="large"
          type="submit"
          variant="contained"
          color="inherit"
        >
          {translate('submit')}
        </LoadingButton>
      </Stack>
    </form>
  );
}

ClientForm.propTypes = {
  control: PropTypes.object,
  onSubmit: PropTypes.func,
  errors: PropTypes.object,
  watch: PropTypes.func,
  loading: PropTypes.bool,
};
