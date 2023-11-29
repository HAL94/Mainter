import PropTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';
import { CircularProgress } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function DeleteClientDialog({
  open,
  handleClose,
  loading,
  title,
  content,
  actions,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {!loading ? (
          <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
        ) : (
          <CircularProgress />
        )}
      </DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
}

DeleteClientDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string,
  actions: PropTypes.node,
  loading: PropTypes.bool,
};
