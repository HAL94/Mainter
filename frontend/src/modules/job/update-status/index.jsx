import { useRef } from 'react';
import { faker } from '@faker-js/faker';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import { updateJobStatus } from 'src/api/jobs';
import useLanguage from 'src/locale/useLanguage';
import { useJobListContext } from 'src/providers/job-view-list';

import CustomDialog from 'src/components/custom-dialog';

export default function UpdateJobStatusDialog() {
  const { selectors, actions } = useJobListContext();
  const { statusModal, setSelected } = actions;
  const { open, data: modalData } = selectors.statusModalOpen();
  const queryClient = useQueryClient();
  const status = useRef();
  status.current = modalData?.status || '';

  const translate = useLanguage();

  const {
    mutate,
    isPending: loading,
    data: result,
    reset,
  } = useMutation({
    mutationKey: ['update-job-status'],
    mutationFn: updateJobStatus,
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries(['get-all-jobs']);
        if (modalData.length > 1) {
          setSelected([]);
        }
      }
    },
  });

  const onCloseHandler = () => {
    if (loading) return;
    setTimeout(() => {
      reset();
    }, 500);
    statusModal.setClose();
  };

  const MODAL_CONTENTS_STATE = {
    SUCCESS: () => ({
      content: '',
      title: 'Successfully Updated Job Status!',
      actions: (
        <Button
          onClick={() => {
            statusModal.setClose();
            setTimeout(() => {
              reset();
            }, 500);
          }}
        >
          {translate('close')}
        </Button>
      ),
    }),
    IDLE: () => ({
      content: (
        <FormControl fullWidth>
          <InputLabel>Update Status</InputLabel>
          <Select
            name="job-status"
            defaultValue={modalData?.status}
            onChange={(e) => {
              status.current = e.target.value;
            }}
          >
            {[
              {
                id: faker.string.uuid(),
                value: 'UNDER_MAINTENANCE',
                label: 'Under Maintenance',
              },
              {
                id: faker.string.uuid(),
                value: 'COMPLETED',
                label: 'Completed',
              },
              {
                id: faker.string.uuid(),
                value: 'CANCELED',
                label: 'Canceled',
              },
            ].map((opt) => (
              <MenuItem key={opt.id} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
      title: 'Select the proper status',
      actions: (
        <>
          <Button sx={{ color: 'error.main' }} disabled={loading} onClick={statusModal.setClose}>
            {translate('deleteModalCancel')}
          </Button>
          <Button
            onClick={() => mutate({ id: modalData.id, status: status.current })}
            sx={{ color: 'primary.main' }}
            variant="success"
            disabled={loading}
          >
            Confirm
          </Button>
        </>
      ),
    }),
  };

  let {
    content: dialogContent,
    title: dialogTitle,
    actions: dialogActions,
  } = MODAL_CONTENTS_STATE.IDLE();

  if (modalData?.length > 1) {
    dialogTitle = translate('deleteMultipleTitle')(modalData.length);
  }

  if (result?.success) {
    const { title, actions: successActions, content } = MODAL_CONTENTS_STATE.SUCCESS();

    dialogContent = content;
    dialogTitle = title;
    dialogActions = successActions;
  }

  if (result && !result.success) {
    const { title, actions: errorActions, content } = MODAL_CONTENTS_STATE.IDLE();

    dialogContent = content;
    dialogTitle = title;
    dialogActions = errorActions;
  }

  return (
    <CustomDialog
      key="update-job-dialog"
      title={dialogTitle}
      content={dialogContent}
      actions={dialogActions}
      open={open}
      loading={loading}
      handleClose={onCloseHandler}
    />
  );
}
