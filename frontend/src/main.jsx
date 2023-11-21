import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { CircularProgress } from '@mui/material';

import App from './app';

// ----------------------------------------------------------------------

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);


root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense fallback={<CircularProgress />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
