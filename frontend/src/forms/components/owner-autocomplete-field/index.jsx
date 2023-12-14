import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { getAllClients } from 'src/api/clients';

import AutoCompleteField from '../auto-complete-field';

export default function OwnerAutocompleteField(props) {
  const [pageState, setPageStage] = useState({ pageNo: 1, pageSize: 20 });
  const { enabled: shouldEnable } = props;
  const [enabled, setEnabled] = useState(shouldEnable);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  const { pageNo, pageSize } = pageState;
  const {
    data: result,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['clients-lookup', pageNo, pageSize],
    queryFn: () => getAllClients({ ...pageState }),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    enabled,
  });

  useEffect(() => {
    if (result?.data) {
      const length = result?.data?.table.length;
      if (options?.length < length) {
        setOptions(
          options.concat([
            ...(result?.data.table?.data?.map((client) => ({
              ownerId: client.id,
              label: client.fullName,
            })) || []),
          ])
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result?.data]);

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
      loading={isFetching || isLoading || options.length <= 0}
      valueAccessor="ownerId"
      labelAccessor="label"
      options={options}
      hasNext={options?.length < result?.data?.table?.length}
      refetch={() => {
        setPageStage((prev) => ({ ...prev, pageNo: prev.pageNo + 1 }));
      }}
    />
  );
}

OwnerAutocompleteField.propTypes = {
  enabled: PropTypes.bool,
};
