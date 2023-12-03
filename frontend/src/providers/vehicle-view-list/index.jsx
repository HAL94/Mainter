import PropTypes from 'prop-types';
import { useMemo, useReducer, useContext, createContext } from 'react';

import contextActions from './reducer/actions';
import contextSelectors from './reducer/selectors';
import { initialState, contextReducer } from './reducer';

const VehicleListContext = createContext();

function VehicleListProvider({ children }) {
  const [state, dispatch] = useReducer(contextReducer, initialState);
  const value = useMemo(() => [state, dispatch], [state]);

  return <VehicleListContext.Provider value={value}>{children}</VehicleListContext.Provider>;
}

function useVehicleListContext() {
  const context = useContext(VehicleListContext);
  if (context === undefined) {
    throw new Error('useClientListContext must be used within a ClientListContextProvider');
  }
  const [state, dispatch] = context;
  const vehicleListContextAction = contextActions(dispatch);
  const vehicleListContextSelector = contextSelectors(state);

  return { state, actions: vehicleListContextAction, selectors: vehicleListContextSelector };
}

VehicleListProvider.propTypes = {
  children: PropTypes.node,
};

export { VehicleListProvider, useVehicleListContext };
