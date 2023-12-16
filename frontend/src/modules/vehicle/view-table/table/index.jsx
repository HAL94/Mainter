/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import useLanguage from 'src/locale/useLanguage';

import AppTable from 'src/components/table';
import Iconify from 'src/components/iconify';

import columnLabels from './column-labels';
import VehicleTableToolbar from './vehicle-table-toolbar';

// ----------------------------------------------------------------------

export default function VehicleTable(props) {
  const router = useRouter();
  const translate = useLanguage();
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{translate('vehicles.pageTitle')}</Typography>

        <Button
          onClick={() => {
            router.push('/vehicles/add');
          }}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          {translate('vehicles.newVehicle')}
        </Button>
      </Stack>

      <Card>
        <VehicleTableToolbar />
        <AppTable
          {...props}
          columnLabels={columnLabels}
          hasCheckbox
          hasAction
          enableSort
        />
      </Card>
    </Container>
  );
}

VehicleTable.propTypes = {
  data: PropTypes.array,
  dataCount: PropTypes.number,
  tableState: PropTypes.object,
  tableActions: PropTypes.object,
  loading: PropTypes.bool,
  dataDef: PropTypes.array,
  actionMenu: PropTypes.array,
};
