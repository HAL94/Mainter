import * as actionTypes from './types';

const contextActions = (dispatch) => ({
  setPage: (payload) => dispatch({ type: actionTypes.SET_PAGE, payload }),
  setRowsPerPage: (payload) => dispatch({ type: actionTypes.SET_PAGES_PER_ROW, payload }),
  setQuery: (payload) => dispatch({ type: actionTypes.SET_QUERY, payload }),
  setType: (payload) => dispatch({ type: actionTypes.SET_TYPE, payload }),
  setOrder: (payload) => dispatch({ type: actionTypes.SET_ORDER, payload }),
  setOrderBy: (payload) => dispatch({ type: actionTypes.SET_ORDER_BY, payload }),
  setSelected: (payload) => dispatch({ type: actionTypes.SET_SELECTED, payload }),
  deleteModal: {
    setOpen: (payload) => dispatch({ type: actionTypes.OPEN_DELETE_MODAL, payload }),
    setClose: () => dispatch({ type: actionTypes.CLOSE_DELETE_MODAL }),
  },
});

export default contextActions;
