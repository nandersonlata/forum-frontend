import React, { FC } from 'react';
import { isLoggedIn } from './util';
import SignIn from './Signin';

export const RequireAuth: FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const userIsLogged = isLoggedIn(); // Your hook to get login status

  if (!userIsLogged) {
    return <SignIn />;
  }
  return children;
};
