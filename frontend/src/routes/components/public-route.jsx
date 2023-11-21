import PropTypes from 'prop-types';
import { useUser } from '@/utils/auth';
import { Navigate } from 'react-router-dom';


export default function PublicRoute({ children }) {
  const user = useUser();

  const isLoggedIn = user.isSuccess && user.data.data?.sub;

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
