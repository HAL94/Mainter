/* eslint-disable perfectionist/sort-imports */
import '@/global.css';

import { useScrollToTop } from '@/hooks/use-scroll-to-top';

import Router from '@/routes';
import AppProviders from '@/providers';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <AppProviders>
      <Router />
    </AppProviders>
  );
}
