import React, { FC } from 'react';
import { isLoggedIn } from './util';
import SignIn from './Signin';

export const RequireAuth: FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const userIsLogged = isLoggedIn();
  if (!userIsLogged) {
    window.location.pathname = '/';
    return <SignIn />;
  }
  return children;
};
