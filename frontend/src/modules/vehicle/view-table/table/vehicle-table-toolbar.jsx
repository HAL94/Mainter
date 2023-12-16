import { debounce } from 'lodash';

import { Stack } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import useLanguage from 'src/locale/useLanguage';
import { useVehicleListContext } from 'src/providers/vehicle-view-list';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function VehicleTableToolbar() {
  const { state, actions } = useVehicleListContext();
  const { selected, query } = state;
  const { setPage, setQuery, deleteModal } = actions;

  const numSelected = selected.length;

  const translate = useLanguage();  

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
          {numSelected} {translate('selected')}
        </Typography>
      ) : (
        <Stack spacing={2} justifyContent="start" direction="row">
          <OutlinedInput
            defaultValue={query}
            onChange={onFilterChange}
            placeholder={translate('vehicles.searchVehicles')}
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />          
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
