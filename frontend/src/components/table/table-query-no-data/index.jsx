import React from 'react'
import PropTypes from 'prop-types';

import { Paper, TableRow, TableCell, Typography } from '@mui/material'

import useLanguage from 'src/locale/useLanguage';

export default function TableQueryNoData({ query }) {
  const translate = useLanguage();
  return (
    <TableRow>
      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
        <Paper
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" paragraph>
            {translate('noResultsTitle')}
          </Typography>

          <Typography variant="body2">
            {translate('noResultsFor')} &nbsp;
            <strong>&quot;{query}&quot;</strong>.
            <br /> {translate('tryChangingWord')}
          </Typography>
        </Paper>
      </TableCell>
    </TableRow>
  )
}

TableQueryNoData.propTypes = {
  query: PropTypes.string,
}
