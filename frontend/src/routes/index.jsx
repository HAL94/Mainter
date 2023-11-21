import { lazy, Suspense } from 'react';
import DashboardLayout from '@/layouts/dashboard';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

import PublicRoute from './components/public-route';
import PrivateRoute from './components/private-route';

export const IndexPage = lazy(() => import('@/pages/app'));
export const BlogPage = lazy(() => import('@/pages/blog'));
export const UserPage = lazy(() => import('@/pages/user'));
export const LoginPage = lazy(() => import('@/pages/login'));
export const ProductsPage = lazy(() => import('@/pages/products'));
export const Page404 = lazy(() => import('@/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
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
        { path: 'user', element: <UserPage /> },
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
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
