import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '@mui/material';

import { deleteJobs } from 'src/api/jobs';
import useLanguage from 'src/locale/useLanguage';
import { useJobListContext } from 'src/providers/job-view-list';

import CustomDialog from 'src/components/custom-dialog';

export default function DeleteJobDialog() {
  const { selectors, actions } = useJobListContext();
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
    mutationKey: ['delete-jobs'],
    mutationFn: () => deleteJobs({ ids: modalData }),
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
    deleteModal.setClose();
  };

  const MODAL_CONTENTS_STATE = {
    SUCCESS: () => ({
      content: '',
      title: translate('deleteSuccess'),
      actions: (
        <Button
          onClick={() => {
            deleteModal.setClose();
            setTimeout(() => {
              reset();
            }, 500);
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
            setTimeout(() => reset(), 500);
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

  if (result?.success) {
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
