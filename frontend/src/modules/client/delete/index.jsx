import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '@mui/material';

import { deleteClients } from 'src/api/clients';
import { useClientListContext } from 'src/providers/client-view-list';

import DeleteClientDialog from './dialog';

export default function DeleteClientDialogContainer() {
  const { selectors, actions } = useClientListContext();
  const { deleteModal, setSelected } = actions;
  const { open, data: modalData } = selectors.deleteModalOpen();
  const queryClient = useQueryClient();

  const {
    mutate,
    isPending: loading,
    data: result,
    reset,
  } = useMutation({
    mutationKey: ['delete-clients'],
    mutationFn: () => deleteClients({ ids: modalData }),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries(['get-all-clients']);
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
      title: 'Successfully deleted record(s)',
      actions: (
        <Button
          onClick={() => {
            deleteModal.setClose();
            setTimeout(() => {
              reset();              
            }, 500);
          }}
        >
          Close
        </Button>
      ),
    }),
    FAIL: () => ({
      content: 'An error has occured, close and try again',
      title: 'Unable to delete record',
      actions: (
        <Button
          onClick={() => {
            deleteModal.setClose();
            setTimeout(() => reset(), 500);
          }}
        >
          Close
        </Button>
      ),
    }),
    IDLE: () => ({
      content: '',
      title: 'Are you sure you would like to delete this record',
      actions: (
        <>
          <Button disabled={loading} onClick={deleteModal.setClose}>
            Disagree
          </Button>
          <Button disabled={loading} onClick={mutate} autoFocus>
            Agree
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
    dialogTitle = `Are you sure you would like to delete ${modalData.length} record(s)`;
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
    <DeleteClientDialog
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
