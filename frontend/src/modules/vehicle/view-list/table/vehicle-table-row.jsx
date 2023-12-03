import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import useLanguage from 'src/locale/useLanguage';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function VehicleTableRow({ selected, data, handleClick, handleDeleteClick }) {
  const { id, make, model, plate, year, client, engineNo } = data;
  const translate = useLanguage();

  const [open, setOpen] = useState(null);

  const router = useRouter();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {make}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{model}</TableCell>

        <TableCell>{plate}</TableCell>

        <TableCell align="center">{year}</TableCell>

        <TableCell align="center">{engineNo}</TableCell>

        <TableCell>{client.fullName}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem
          onClick={() => {
            router.push(`/vehicles/edit/${id}`);
          }}
        >
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          {translate('edit')}
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleCloseMenu();
            handleDeleteClick();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          {translate('delete')}
        </MenuItem>
      </Popover>
    </>
  );
}

VehicleTableRow.propTypes = {
  data: PropTypes.object,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  handleDeleteClick: PropTypes.func,
};
