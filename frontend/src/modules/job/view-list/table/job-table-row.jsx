import { useState } from 'react';
import PropTypes from 'prop-types';

import { Chip } from '@mui/material';
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

export default function JobTableRow({ selected, data, handleClick, handleDeleteClick, handleStatusUpdate }) {
  const { id, title, description, orderNumber, status, client } = data;
  const translate = useLanguage();

  const [open, setOpen] = useState(null);

  const router = useRouter();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const getStatusColor = {
    UNDER_MAINTENANCE: 'primary.darker',
    CANCELD: 'error.main',
    COMPLETED: 'success.main',
  };
  const getStatusContrastColor = {
    UNDER_MAINTENANCE: 'primary.contrastText',
    CANCELD: 'error.contrastText',
    COMPLETED: 'success.contrastText',
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
              {title}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{description}</TableCell>

        <TableCell>{orderNumber}</TableCell>

        <TableCell align="left">{client.fullName}</TableCell>

        <TableCell>
          <Chip
            label={translate('jobs.status')(status)}
            sx={{
              cursor: 'pointer',
              color: getStatusContrastColor[status],
              backgroundColor: getStatusColor[status],
            }}
          />
        </TableCell>

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
            router.push(`/jobs/edit/${id}`);
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
        
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            handleStatusUpdate();
          }}
          sx={{ color: 'info.main' }}
        >
          <Iconify icon="eva:alert-circle-outline" sx={{ mr: 2 }} />
          {translate('jobs.updateStatus')}
        </MenuItem>
      </Popover>
    </>
  );
}

JobTableRow.propTypes = {
  data: PropTypes.object,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  handleDeleteClick: PropTypes.func,
  handleStatusUpdate: PropTypes.func,
};
