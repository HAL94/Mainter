import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import { Alert, AlertTitle } from '@mui/material';

import { addJob } from 'src/api/jobs';
import useLanguage from 'src/locale/useLanguage';

import JobForm from './form';
import schema from './schema';
import { defaultValues } from './fields';

export default function AddJobForm({ onSubmitCb, onSuccessCb, disableFeedback = false }) {
  const [isError, setIsError] = useState(false);

  const {
    mutate,
    isPending: loading,
    isSuccess,
    reset,
  } = useMutation({
    mutationKey: 'add-job',
    mutationFn: addJob,
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
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    console.log('got data', data);

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
      <JobForm
        loading={loading}
        errors={errors}
        control={control}
        watch={watch}
        setValue={setValue}
        onSubmit={handleSubmit(onSubmit)}
        submitLabel={translate('submit')}
      />
    </>
  );
}

AddJobForm.propTypes = {
  onSubmitCb: PropTypes.func,
  onSuccessCb: PropTypes.func,
  disableFeedback: PropTypes.bool,
};
