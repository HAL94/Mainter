import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import SessionExpiredView from 'src/sections/session-expired';

// ----------------------------------------------------------------------

export default function SessionExpiredPage() {
  
  useEffect(() => {    
    localStorage.removeItem('isLoggedIn');
  }, []);

  return (
    <>
      <Helmet>
        <title> Session Expired </title>
      </Helmet>

      <SessionExpiredView />
    </>
  );
}
