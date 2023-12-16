import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '@mui/material';

import useLanguage from 'src/locale/useLanguage';
import { deleteVehicles } from 'src/api/vehicles';
import { useVehicleListContext } from 'src/providers/vehicle-view-list';

import CustomDialog from 'src/components/custom-dialog';

export default function DeleteVehicleDialog() {
  const { selectors, actions } = useVehicleListContext();
  const { deleteModal, setSelected } = actions;
  const { open, data: modalData } = selectors.deleteModalOpen();
  const queryClient = useQueryClient();

  const translate = useLanguage();

  const {
    mutate,
    isPending: loading,
    data: result,
    reset,
  } = useMutation({
    mutationKey: ['delete-vehicles'],
    mutationFn: () => deleteVehicles({ ids: modalData }),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries(['get-all-vehicles']);
        if (modalData.length > 1) {
          setSelected([]);
        }
      }
    },
  });

  const onCloseHandler = (_event) => {    
    if (loading) return;    
    deleteModal.setClose();
    setTimeout(() => reset(), 500);
  };

  const MODAL_CONTENTS_STATE = {
    SUCCESS: () => ({
      content: '',
      title: translate('deleteSuccess'),
      actions: (
        <Button
          onClick={() => {
            deleteModal.setClose();            
          }}
        >
          {translate('close')}
        </Button>
      ),
    }),
    FAIL: () => ({
      content: translate('failMessage'),
      title: translate('deleteModalTitle'),
      actions: (
        <Button
          onClick={() => {
            deleteModal.setClose();            
          }}
        >
          {translate('close')}
        </Button>
      ),
    }),
    IDLE: () => ({
      content: '',
      title: translate('deleteIdleModalTitle'),
      actions: (
        <>
          <Button sx={{ color: 'primary.main' }} disabled={loading} onClick={deleteModal.setClose}>
            {translate('deleteModalCancel')}
          </Button>
          <Button
            sx={{ color: 'error.main' }}
            variant="success"
            disabled={loading}
            onClick={mutate}
          >
            {translate('deleteModalConfirm')}
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

  if (result && result?.success) {
    const { title, actions: successActions, content } = MODAL_CONTENTS_STATE.SUCCESS();

    dialogContent = content;
    dialogTitle = title;
    dialogActions = successActions;
  }

  if (result && !result.success) {
    const { title, actions: errorActions, content } = MODAL_CONTENTS_STATE.FAIL();

    dialogContent = content;
    dialogTitle = title;
    dialogActions = errorActions;
  }

  return (
    <CustomDialog
      key="delete-dialog"
      title={dialogTitle}
      content={dialogContent}
      actions={dialogActions}
      open={open}
      loading={loading}
      handleClose={onCloseHandler}
    />
  );
}
