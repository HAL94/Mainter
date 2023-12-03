import PropTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';
import { CircularProgress } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { isRTL } from 'src/locale/useLanguage';

export default function CustomDialog({ open, handleClose, loading, title, content, actions }) {
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
      <DialogActions sx={{ justifyContent: isRTL() ? 'flex-start' : 'flex-end' }}>
        {actions}
      </DialogActions>
    </Dialog>
  );
}

CustomDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.string,
  actions: PropTypes.node,
  loading: PropTypes.bool,
};
