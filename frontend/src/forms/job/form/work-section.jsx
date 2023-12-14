import React from 'react';
import PropTypes from 'prop-types';
import { useFieldArray } from 'react-hook-form';

import { Stack, Button, Divider, Typography } from '@mui/material';

import useLanguage from 'src/locale/useLanguage';
import TextInputField from 'src/forms/components/text-input-field';

import Iconify from 'src/components/iconify';

import FORM_FIELDS, { COST, WORK } from '../fields';

export default function WorkFormSection({ control, errors, loading }) {
  const translate = useLanguage();
  const { fields, append, remove } = useFieldArray({
    control,
    name: FORM_FIELDS.works,
  });
  return (
    <>
      <Divider />
      <Typography variant="h5">{translate('jobForm.workSectionTitle')}</Typography>
      {fields.map((f, index) => (
        <Stack sx={{ width: '100%', gap: 4, mb: 2 }} direction="row" key={f.id}>
          <TextInputField
            control={control}
            name={`${FORM_FIELDS.works}.${index}.${WORK}`}
            type="text"
            errors={errors}
            disabled={loading}
            errorAccessor={() => errors?.[FORM_FIELDS.works]?.[index]?.[WORK]?.message}
            required
            inputProps={{
              label: translate('jobForm.label.work'),
              placeholder: translate('jobForm.label.workPlaceholder'),
            }}
          />
          <TextInputField
            control={control}
            name={`${FORM_FIELDS.works}.${index}.${COST}`}
            type="text"
            errors={errors}
            disabled={loading}
            errorAccessor={() => errors?.[FORM_FIELDS.works]?.[index]?.[COST]?.message}
            required
            inputProps={{
              label: translate('jobForm.label.cost'),
              placeholder: translate('jobForm.label.costPlaceholder'),
            }}
          />
          <Button
            disabled={index === 0}
            type="button"
            variant="contained"
            color="error"
            onClick={() => remove(index)}
          >
            <Iconify icon="eva:trash-2-outline" />
          </Button>
        </Stack>
      ))}
      <Button
        type="button"
        variant="contained"
        color="primary"
        sx={{ width: 70 }}
        onClick={() => append({ [WORK]: '', [COST]: 0 })}
      >
        <Iconify icon="eva:plus-square-outline" />
      </Button>
    </>
  );
}

WorkFormSection.propTypes = {
  control: PropTypes.object,
  errors: PropTypes.object,
  loading: PropTypes.bool,
};
