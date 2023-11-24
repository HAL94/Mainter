import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import { Alert, AlertTitle } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { signIn } from 'src/api/auth';
import useLanguage from 'src/locale/useLanguage';

import schema from './schema';
import LoginForm from './form';
import { defaultValues } from './fields';

export default function LoginFormContainer({ onSubmitForm }) {  
  const [isError, setIsError] = useState(false);

  const translate = useLanguage();

  const router = useRouter();

  const {
    isSuccess: success,
    isPending: loading,    
    mutate: signInMutation,    
  } = useMutation({
    mutationFn: signIn,
    mutationKey: ['sign-in'],
    onSuccess: (result) => {
      console.log('result', result.error);      
      if (result.data?.success) {
        router.push('/');
        localStorage.setItem('isLoggedIn', true);
      } else {
        setIsError(true)
      }
    }
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    console.log('submitted', data);
    // setLoading(true);

    if (!isValid) {
      console.log('got errors', errors);
      return;
    }

    if (typeof onSubmitForm === 'function' && onSubmitForm) {
      onSubmitForm(data);
      return;
    }

    signInMutation({ ...data });
  };

  return (
    <>
      {!loading && isError && (
        <Alert sx={{ mb: 5 }} severity="error">
          <AlertTitle>{translate('loginForm.failure')}</AlertTitle>
          {translate('loginForm.failMessage')}
        </Alert>
      )}
      {!loading && success && !isError && (
        <Alert sx={{ mb: 5 }} severity="success">
          <AlertTitle>{translate('loginForm.success')}</AlertTitle>
          {translate('loginForm.successMessage')}
        </Alert>
      )}
      <LoginForm control={control} onSubmit={handleSubmit(onSubmit)} errors={errors} />
    </>
  );
}

LoginFormContainer.propTypes = {
  onSubmitForm: PropTypes.func,
};
