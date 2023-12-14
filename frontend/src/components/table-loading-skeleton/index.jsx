/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';

import { Skeleton, TableRow, TableBody, TableCell, IconButton } from '@mui/material';

import Iconify from 'src/components/iconify';

const getRandomArr = (count) => {
  const arr = [];
  for (let x = 0; x < count; x++) {
    arr.push(Math.random());
  }
  return arr;
};

export default function TableLoadingSkeleton({ skeletonLen }) {
  return (
    <TableBody>
      {getRandomArr(skeletonLen).map((id) => (
        <TableRow key={id} hover tabIndex={-1} role="checkbox">
          <TableCell padding="checkbox">
            <Skeleton variant="circular" width={15} height={15} />
          </TableCell>

          <TableCell component="th" scope="row" padding="none">
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          </TableCell>

          <TableCell>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          </TableCell>

          <TableCell>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          </TableCell>

          <TableCell align="center">
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          </TableCell>

          <TableCell>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          </TableCell>

          <TableCell align="right">
            <IconButton>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

TableLoadingSkeleton.propTypes = {
  skeletonLen: PropTypes.number,
};
