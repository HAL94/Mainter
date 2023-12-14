/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes';
import AppProviders from 'src/providers';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <AppProviders>
      <Router />
    </AppProviders>
  );
}
