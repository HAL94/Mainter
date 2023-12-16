import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { faker } from '@faker-js/faker';

import { Popover, Checkbox, TableRow, TableCell, IconButton } from '@mui/material';

import Iconify from '../../iconify';

export default function AppTableRow({
  hasCheckbox,
  hasAction,
  actionMenu,
  data,
  dataDef,
  selected,
  handleCheck,
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        {hasCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox disableRipple checked={selected} onChange={handleCheck} />
          </TableCell>
        )}

        {dataDef.map((df) => {
          const dataAccess = df.id;
          const parts = dataAccess.split('.');
          let cellData = data;
          parts.forEach((key) => {
            cellData = cellData[key];
          });
          
          const CellComponent = df.cell;

          return <CellComponent key={faker.string.uuid()} cellData={cellData} />;
        })}

        {hasAction && (
          <TableCell align="right">
            <IconButton onClick={handleOpenMenu}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </TableCell>
        )}
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
        {actionMenu.map((act) => {
          const ActionComponent = act.render;
          return <ActionComponent key={act.id} cellData={data} onClick={handleCloseMenu} />;
        })}
      </Popover>
    </>
  );
}

AppTableRow.propTypes = {
  hasCheckbox: PropTypes.bool,
  hasAction: PropTypes.bool,
  selected: PropTypes.bool,
  data: PropTypes.object,
  dataDef: PropTypes.array,
  actionMenu: PropTypes.array,
  handleCheck: PropTypes.func,
};
