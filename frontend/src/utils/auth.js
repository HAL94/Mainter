import { configureAuth } from 'react-query-auth';
import { getMe, signIn, signUp, logout } from '@/api/auth';



export const { useUser, useLogin, useRegister, useLogout } = configureAuth({
  userFn: () => getMe(),
  loginFn: (credentials) => signIn(credentials),
  registerFn: (credentials) => signUp(credentials),
  logoutFn: () => logout(),
  
});
