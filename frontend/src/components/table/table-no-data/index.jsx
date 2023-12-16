import React from 'react';

import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import useLanguage from 'src/locale/useLanguage';

export default function TableNoData() {
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
            {translate('noTableData')}
          </Typography>
        </Paper>
      </TableCell>
    </TableRow>
  );
}
