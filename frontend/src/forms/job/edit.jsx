import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import { Alert, AlertTitle } from '@mui/material';

import { editJob } from 'src/api/jobs';
import useLanguage from 'src/locale/useLanguage';

import JobForm from './form';
import schema from './schema';

export default function EditJobForm({
  onSubmitCb,
  onSuccessCb,
  data,
  submitLabel,
  disableFeedback,
}) {
  const [isError, setIsError] = useState(false);

  const {
    mutate,
    isPending: loading,
    isSuccess,
    reset,
  } = useMutation({
    mutationKey: 'edit-job',
    mutationFn: editJob,
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
    setValue,
    watch,
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
      <JobForm
        loading={loading}
        errors={errors}
        control={control}
        watch={watch}
        setValue={setValue}
        onSubmit={handleSubmit(onSubmit)}
        submitLabel={submitLabel || translate('edit')}
      />
    </>
  );
}

EditJobForm.propTypes = {
  onSubmitCb: PropTypes.func,
  onSuccessCb: PropTypes.func,
  data: PropTypes.object,
  disableFeedback: PropTypes.bool,
  submitLabel: PropTypes.string,
};
