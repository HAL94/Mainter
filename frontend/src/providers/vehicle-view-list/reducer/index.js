import * as actionTypes from './types';

export const initialState = {
  page: 1,
  rowsPerPage: 5,
  query: '', 
  order: 'desc',
  orderBy: 'createdAt',
  selected: [],
  deleteModal: {
    open: false,
    data: null,
  },
};

export function contextReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case actionTypes.SET_PAGES_PER_ROW:
      return {
        ...state,
        rowsPerPage: action.payload,
      };
    case actionTypes.SET_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    case actionTypes.SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case actionTypes.SET_ORDER_BY:
      return {
        ...state,
        orderBy: action.payload,
      };
    case actionTypes.SET_SELECTED:
      return {
        ...state,
        selected: action.payload,
      };
    case actionTypes.OPEN_DELETE_MODAL:
      return {
        ...state,
        deleteModal: { open: true, data: action.payload },
      };
    case actionTypes.CLOSE_DELETE_MODAL:
      return {
        ...state,
        deleteModal: { open: false, data: null },
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
