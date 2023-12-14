import PropTypes from 'prop-types';
import { useMemo, useReducer, useContext, createContext } from 'react';

import contextActions from './reducer/actions';
import contextSelectors from './reducer/selectors';
import { initialState, contextReducer } from './reducer';

const ClientListContext = createContext();

function ClientListProvider({ children }) {
  const [state, dispatch] = useReducer(contextReducer, initialState);
  const value = useMemo(() => [state, dispatch], [state]);

  return <ClientListContext.Provider value={value}>{children}</ClientListContext.Provider>;
}

function useClientListContext() {
  const context = useContext(ClientListContext);
  if (context === undefined) {
    throw new Error('useClientListContext must be used within a ClientListContextProvider');
  }
  const [state, dispatch] = context;
  const clientListContextAction = contextActions(dispatch);
  const clientListContextSelector = contextSelectors(state);

  return { state, actions: clientListContextAction, selectors: clientListContextSelector };
}

ClientListProvider.propTypes = {
  children: PropTypes.node,
};

export { ClientListProvider, useClientListContext };
