import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { useUser } from 'src/utils/auth';

export default function PublicRoute({ children }) {
  const user = useUser();
  
  const isLoggedIn = user.isSuccess && user.data?.data?.success;

  if (user.isFetching) {
    return null;
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

PublicRoute.propTypes = {
  children: PropTypes.node,
};
