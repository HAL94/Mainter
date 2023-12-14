import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from '@tanstack/react-query';

import { CircularProgress } from '@mui/material';

import { client } from './client';
import AppContainer from './app-container';


// ----------------------------------------------------------------------

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);


root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense fallback={<CircularProgress />}>
        <QueryClientProvider client={client}>
          <AppContainer />
        </QueryClientProvider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
