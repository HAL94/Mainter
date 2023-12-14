import React from 'react';
import PropTypes from 'prop-types';
import { useController } from 'react-hook-form';

import { TextField, Autocomplete } from '@mui/material';

export default function AutoCompleteField(props) {
  const {
    control,
    name,
    valueAccessor,
    labelAccessor,
    disabled,
    inputProps,
    options,
    required,
    id,
    setOnOpen,
    setOnClose,
    loading,
    open,
    refetch,
    hasNext,
  } = props;

  const { fieldState, field } = useController({
    control,
    name,
    rules: {
      required,
    },
  });

  const { error } = fieldState;

  return (
    <Autocomplete
      id={id}
      onChange={(_e, newValue, reason) => {
        if (reason === 'clear') {
          field.onChange(null);
          return;
        }
        field.onChange(newValue?.[valueAccessor]);
      }}
      value={
        field.value ? options.find((opt) => opt?.[valueAccessor] === field.value) ?? null : null
      }
      options={options}
      getOptionLabel={(option) => option[labelAccessor]}
      disabled={disabled}
      open={open}
      onOpen={() => setOnOpen()}
      onClose={() => setOnClose()}
      loading={loading}
      ListboxProps={{
        onScroll: (e) => {
          const element = e.target;
          if (element.scrollTop === element.scrollHeight - element.offsetHeight) {
            if (hasNext) {
              refetch();
            }
          }
        },
      }}
      renderInput={(params) => (
        <TextField
          onBlur={field.onBlur}
          helperText={error?.message}
          error={Boolean(error)}
          {...params}
          {...inputProps}
        />
      )}
    />
  );
}

AutoCompleteField.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string,
  type: PropTypes.string,
  inputProps: PropTypes.object,
  required: PropTypes.bool,
  options: PropTypes.array,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  valueAccessor: PropTypes.string,
  labelAccessor: PropTypes.string,
  open: PropTypes.bool,
  setOnOpen: PropTypes.func,
  setOnClose: PropTypes.func,
  loading: PropTypes.bool,
  hasNext: PropTypes.bool,
  refetch: PropTypes.func,
};
