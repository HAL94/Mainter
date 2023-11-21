import PropTypes from 'prop-types';
import { useUser } from '@/utils/auth';
import { Navigate } from 'react-router-dom';


export default function PrivateRoute({ children }) {
  const user = useUser();

  const isLoggedIn = user.isSuccess && user.data.data?.sub;

  if (user.isFetching) {
    return null;
  }

  if (isLoggedIn) {
    return <>{children}</>;
  }

  return <Navigate to="/login" replace />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
