const contextSelectors = (state) => ({
  deleteModalOpen: () => ({ open: state.deleteModal.open, data: state.deleteModal.data }),
});

export default contextSelectors;
