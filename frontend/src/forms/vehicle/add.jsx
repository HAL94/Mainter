import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import { Alert, AlertTitle } from '@mui/material';

import { addVehicle } from 'src/api/vehicles';
import useLanguage from 'src/locale/useLanguage';

import schema from './schema';
import VehicleForm from './form';
import { defaultValues } from './fields';

export default function AddVehicleForm({
  onSubmitCb,
  onSuccessCb,
  submitLabel,
  formValues = {},
  disableFeedback = false,
}) {
  const [isError, setIsError] = useState(false);

  const {
    mutate,
    isPending: loading,
    isSuccess,
    reset,
  } = useMutation({
    mutationKey: 'add-vehicle',
    mutationFn: addVehicle,
    onSuccess: (result) => {
      if (!result.success) {
        setIsError(true);
      } else {
        if (onSuccessCb) {
          onSuccessCb(result);
        }
        resetForm();
      }
    },
  });

  const translate = useLanguage();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset: resetForm,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...defaultValues,
      ...formValues,
    },
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    // console.log('got data', data);

    setIsError(null);

    if (!isValid) {
      return;
    }

    if (typeof onSubmitCb === 'function' && onSubmitCb) {
      onSubmitCb(data);
    }

    mutate({ ...data });
  };

  const onReset = () => {
    reset();
    setIsError(null);
  };

  const feedbackContent = disableFeedback ? null : (
    <>
      {!loading && isSuccess && !isError && (
        <Alert sx={{ mb: 5 }} severity="success" onClose={onReset}>
          <AlertTitle>{translate('success')}</AlertTitle>
          {translate('addIsDone')} {translate('addAnother')}
        </Alert>
      )}
      {!loading && isError && (
        <Alert sx={{ mb: 5 }} severity="error" onClose={onReset}>
          <AlertTitle>{translate('failure')}</AlertTitle>
          {translate('failMessage')}
        </Alert>
      )}
    </>
  );

  return (
    <>
      {feedbackContent}
      <VehicleForm
        loading={loading}
        errors={errors}
        control={control}
        onSubmit={handleSubmit(onSubmit)}
        submitLabel={submitLabel || translate('submit')}
      />
    </>
  );
}

AddVehicleForm.propTypes = {
  onSubmitCb: PropTypes.func,
  onSuccessCb: PropTypes.func,
  disableFeedback: PropTypes.bool,
  formValues: PropTypes.object,
  submitLabel: PropTypes.string,
};
