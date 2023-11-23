import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { useUser } from 'src/utils/auth';

export default function PrivateRoute({ children }) {
  const user = useUser();

  const isLoggedIn = user.isSuccess && user.data?.data?.sub; 


  if (isLoggedIn) {
    return <>{children}</>;
  }

  return <Navigate to="/login" replace />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
