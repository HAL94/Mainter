import { Helmet } from 'react-helmet-async';

import LoginView from 'src/modules/login';


// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Login | Minimal UI </title>
      </Helmet>

      <LoginView />
    </>
  );
}
