import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import { Alert, AlertTitle } from '@mui/material';

import { editVehicle } from 'src/api/vehicles';
import useLanguage from 'src/locale/useLanguage';

import schema from './schema';
import VehicleForm from './form';

export default function EditVehicleForm({ onSubmitCb, onSuccessCb, data, disableFeedback }) {
  const [isError, setIsError] = useState(false);

  const {
    mutate,
    isPending: loading,
    isSuccess,
    reset,
  } = useMutation({
    mutationKey: 'edit-vehicle',
    mutationFn: editVehicle,
    onSuccess: (result) => {
      if (!result.success) {
        setIsError(true);
      } else if (result && result.success) {
        if (onSuccessCb) {
          onSuccessCb(result);
        }
      }
    },
  });

  const translate = useLanguage();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    getValues
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...data,
    },
    mode: 'onBlur',
  });

  const onSubmit = (formData) => {
    setIsError(null);

    // console.log('formData', formData);

    if (!isValid) {
      return;
    }

    if (typeof onSubmitCb === 'function' && onSubmitCb) {
      onSubmitCb(formData);
      return;
    }

    mutate({ ...formData, id: data.id });
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
          {translate('updateIsDone')}
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
        getValues={getValues}
        onSubmit={handleSubmit(onSubmit)}
        submitLabel={translate('edit')}
      />
    </>
  );
}

EditVehicleForm.propTypes = {
  onSubmitCb: PropTypes.func,
  onSuccessCb: PropTypes.func,
  data: PropTypes.object,
  disableFeedback: PropTypes.bool,
};
