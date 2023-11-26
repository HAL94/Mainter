import React from 'react';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';

import { Select, MenuItem, InputLabel, FormControl, FormHelperText } from '@mui/material';

export default function SelectInputField(props) {
  const { control, name, disabled, type, inputProps, options, errors, required } = props;
  const { field } = useController({
    control,
    name,
    rules: {
      required,
    },
  });

  return (
    <FormControl disabled={disabled} required={required} fullWidth>
      <InputLabel>{inputProps.label}</InputLabel>
      <Select
        onChange={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        error={Boolean(errors[name])}
        type={type}
        {...field}
        {...inputProps}
      >
        {options.map((opt) => (
          <MenuItem key={opt.id} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {errors[name] && <FormHelperText error>{errors[name]?.message}</FormHelperText>}
    </FormControl>
  );
}

SelectInputField.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string,
  type: PropTypes.string,
  inputProps: PropTypes.object,
  errors: PropTypes.object,
  required: PropTypes.bool,
  options: PropTypes.array,
  disabled: PropTypes.bool,
};
