import PropTypes from 'prop-types';
import { useMemo, useReducer, useContext, createContext } from 'react';

import contextActions from './reducer/actions';
import contextSelectors from './reducer/selectors';
import { initialState, contextReducer } from './reducer';

const JobListContext = createContext();

function JobListProvider({ children }) {
  const [state, dispatch] = useReducer(contextReducer, initialState);
  const value = useMemo(() => [state, dispatch], [state]);

  return <JobListContext.Provider value={value}>{children}</JobListContext.Provider>;
}

function useJobListContext() {
  const context = useContext(JobListContext);
  if (context === undefined) {
    throw new Error('useJobListContext must be used within a JobListContextProvider');
  }
  const [state, dispatch] = context;
  const jobListContextAction = contextActions(dispatch);
  const jobListContextSelector = contextSelectors(state);

  return { state, actions: jobListContextAction, selectors: jobListContextSelector };
}

JobListProvider.propTypes = {
  children: PropTypes.node,
};

export { JobListProvider, useJobListContext };
