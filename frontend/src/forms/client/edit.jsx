import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import { Alert, AlertTitle } from '@mui/material';

import { editClient } from 'src/api/clients';
import useLanguage from 'src/locale/useLanguage';

import schema from './schema';
import ClientForm from './form';

export default function EditClientFormContainer({ onSubmitCb, data }) {
  const [isError, setIsError] = useState(false);
  
  const {
    mutate,
    isPending: loading,
    isSuccess,
    reset,
  } = useMutation({
    mutationKey: 'edit-client',
    mutationFn: editClient,
    onSuccess: (result) => {
      if (!result.success) {
        setIsError(true);
      }
    },
  });

  const translate = useLanguage();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...data,
      businessName: data.businessName ? data.businessName : '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (formData) => {
    setIsError(null);

    console.log('formData', formData);

    if (!isValid) {
      return;
    }

    if (formData.type === 'INDIVIDUAL') {
      formData.businessName = null;
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

  return (
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
      <ClientForm
        loading={loading}
        errors={errors}
        control={control}
        watch={watch}
        onSubmit={handleSubmit(onSubmit)}
      />
    </>
  );
}

EditClientFormContainer.propTypes = {
  onSubmitCb: PropTypes.func,
  data: PropTypes.object,
};
