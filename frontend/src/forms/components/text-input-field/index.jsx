import React from 'react';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';

import { TextField } from '@mui/material';

export default function TextInputField(props) {
  const { control, name, type, inputProps, errors, required, disabled } = props;
  const { field } = useController({
    control,
    name,
    rules: {
      required,
    },
  });

  return (
    <TextField
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      name={field.name}
      required={required}
      error={Boolean(errors[name])}
      helperText={errors?.[name]?.message}
      disabled={disabled}
      type={type}
      {...field}
      {...inputProps}
    />
  );
}

TextInputField.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string,
  type: PropTypes.string,
  inputProps: PropTypes.object,
  errors: PropTypes.object,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};
