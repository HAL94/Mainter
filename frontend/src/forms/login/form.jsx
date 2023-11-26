import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Link, Stack, IconButton, InputAdornment } from '@mui/material';

import useLanguage from 'src/locale/useLanguage';

import Iconify from 'src/components/iconify';

import FORM_FIELDS from './fields';
import TextInputField from '../components/text-input-field';

export default function LoginForm({ control, onSubmit, errors, loading }) {
  const [showPassword, setShowPassword] = useState(false);
  const translate = useLanguage();

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={3}>
        <TextInputField
          control={control}
          name={FORM_FIELDS.email}
          type="text"
          errors={errors}
          disabled={loading}
          required
          inputProps={{
            label: translate('emailAddress'),
          }}
        />

        <TextInputField
          control={control}
          name={FORM_FIELDS.password}
          type={showPassword ? 'text' : 'password'}
          errors={errors}
          required
          disabled={loading}
          inputProps={{
            label: translate('password'),
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
          <Link variant="subtitle2" underline="hover">
            {translate('forgotPassword')}
          </Link>
        </Stack>

        <LoadingButton loading={loading} fullWidth size="large" type="submit" variant="contained" color="inherit">
          {translate('login')}
        </LoadingButton>
      </Stack>
    </form>
  );
}

LoginForm.propTypes = {
  control: PropTypes.object,
  onSubmit: PropTypes.func,
  errors: PropTypes.object,
  loading: PropTypes.bool,
};
