import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { getAllVehicles } from 'src/api/vehicles';

import AutoCompleteField from '../auto-complete-field';

export default function VehicleAutocompleteField(props) {
  const [pageState, setPageState] = useState({ pageNo: 1, pageSize: 20 });
  const { enabled: shouldEnable, clientId } = props;
  const [enabled, setEnabled] = useState(shouldEnable);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const { pageNo, pageSize } = pageState;
  const {
    data: result,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['vehicle-lookup', pageNo, pageSize, clientId],
    queryFn: () => getAllVehicles({ ...pageState, clientId }),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    enabled,
  });

  useEffect(() => {
    if (result?.data) {
      setOptions([
        ...(result?.data.table?.data?.map((vehicle) => ({
          vehicleId: vehicle.id,
          label: `${vehicle.plate} - ${vehicle.make} - ${vehicle.model} - ${vehicle.year}`,
        })) || []),
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result?.data, clientId]);

  return (
    <AutoCompleteField
      {...props}
      open={open}
      setOnOpen={() => {
        setOpen(true);
        setEnabled(true);
      }}
      setOnClose={() => {
        setOpen(false);
      }}
      loading={isFetching || isLoading}
      valueAccessor="vehicleId"
      labelAccessor="label"
      options={options}
      hasNext={options?.length < result?.data?.table?.length}
      refetch={() => {
        setPageState((prev) => ({ ...prev, pageNo: prev.pageNo + 1 }));
      }}
    />
  );
}

VehicleAutocompleteField.propTypes = {  
  enabled: PropTypes.bool,
  clientId: PropTypes.number,
};
