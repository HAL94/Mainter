import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import { Alert, AlertTitle } from '@mui/material';

import { addClient } from 'src/api/clients';
import useLanguage from 'src/locale/useLanguage';

import schema from './schema';
import ClientForm from './form';
import { defaultValues } from './fields';

export default function AddClientForm({
  onSubmitCb,
  onSuccessCb,
  disableFeedback = false,
}) {
  const [isError, setIsError] = useState(false);

  const {
    mutate,
    isPending: loading,
    isSuccess,
    reset,
  } = useMutation({
    mutationKey: 'add-client',
    mutationFn: addClient,
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
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    setIsError(null);

    if (!isValid) {
      return;
    }
    if (typeof onSubmitCb === 'function' && onSubmitCb) {
      onSubmitCb(data);
      return;
    }

    if (data.type === 'INDIVIDUAL') {
      data.businessName = null;
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
      <ClientForm
        loading={loading}
        errors={errors}
        control={control}
        watch={watch}
        onSubmit={handleSubmit(onSubmit)}
        submitLabel={translate('submit')}
      />
    </>
  );
}

AddClientForm.propTypes = {
  onSubmitCb: PropTypes.func,
  onSuccessCb: PropTypes.func,
  disableFeedback: PropTypes.bool,
};
