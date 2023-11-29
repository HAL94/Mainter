import { debounce } from 'lodash';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { Stack, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import useLanguage from 'src/locale/useLanguage';
import { useClientListContext } from 'src/providers/client-view-list';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ClientTableToolbar() {
  const { state, actions } = useClientListContext();
  const { selected, query, type } = state;
  const { setPage, setQuery, setType, deleteModal } = actions;

  const numSelected = selected.length;

  const translate = useLanguage();
  const options = [
    { id: 0, value: '', label: translate('anyClientType') },
    { id: 1, value: 'BUSINESS', label: translate('clientForm.business') },
    { id: 2, value: 'INDIVIDUAL', label: translate('clientForm.individual') },
  ];

  const onFilterChange = (event) => {
    debounce(() => {
      setPage(1);
      setQuery(event.target.value);
    }, 500)();
  };

  const handleConfirmDeleteMulti = () => {
    deleteModal.setOpen(selected);
  };

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Stack spacing={2} justifyContent="start" direction="row">
          <OutlinedInput
            defaultValue={query}
            onChange={onFilterChange}
            placeholder={translate('clients.searchClients')}
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
          <FormControl sx={{ width: '400px' }}>
            <InputLabel>{translate('chooseClientType')}</InputLabel>
            <Select
              id="demo-simple-select"
              value={type}
              label={translate('choose')}
              onChange={(event) => {
                // console.log('got value', event.target.value);
                setType(event.target.value);
              }}
            >
              {options.map((opt) => (
                <MenuItem key={opt.id} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete" onClick={handleConfirmDeleteMulti}>
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
