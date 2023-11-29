import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes, useNavigate, useLocation } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

import { history } from 'src/utils/route-history';

import DashboardLayout from 'src/layouts/dashboard';

import PublicRoute from './components/public-route';
import PrivateRoute from './components/private-route';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const ClientPage = lazy(() => import('src/pages/client'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const SessionExpiredPage = lazy(() => import('src/pages/session-expired'));
export const AddClientPage = lazy(() => import('src/pages/add-client'));
export const EditClientPage = lazy(() => import('src/pages/edit-client'));

// ----------------------------------------------------------------------

export default function Router() {
  history.navigate = useNavigate();
  history.location = useLocation();

  const routes = useRoutes([
    {
      element: (
        <PrivateRoute>
          <DashboardLayout>
            <Suspense fallback={<CircularProgress />}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </PrivateRoute>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'clients', element: <ClientPage /> },
        { path: 'clients/add', element: <AddClientPage /> },
        { path: 'clients/edit/:id', element: <EditClientPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: (
        <PublicRoute>
          <Suspense fallback={<CircularProgress />}>
            <LoginPage />
          </Suspense>
        </PublicRoute>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: 'session-expired',
      element: (
        <PublicRoute>
          <SessionExpiredPage />
        </PublicRoute>
      ),
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
