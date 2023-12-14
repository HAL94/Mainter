const contextSelectors = (state) => ({
  deleteModalOpen: () => ({ open: state.deleteModal.open, data: state.deleteModal.data }),
  statusModalOpen: () => ({ open: state.statusModal.open, data: state.statusModal.data }),
});

export default contextSelectors;
