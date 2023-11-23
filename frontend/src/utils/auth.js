import { configureAuth } from 'react-query-auth';

import { getMe, signIn, signUp, logout } from 'src/api/auth';

export const USER_KEY = 'app-user';

const { useUser: useUserOriginal, useLogin, useRegister, useLogout } = configureAuth({
  userFn: () => getMe(),
  loginFn: (credentials) => signIn(credentials),
  registerFn: (credentials) => signUp(credentials),
  logoutFn: () => logout(),
  userKey: [USER_KEY]
});

export const useUser = () => useUserOriginal({
  refetchOnWindowFocus: false,
  refetchInterval: false,    
})

export { useLogin, useLogout, useRegister };
