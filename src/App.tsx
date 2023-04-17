import React from 'react';
import SignIn from './components/auth/Signin';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/auth/Signup';
import Profile from './components/profile/Profile';
import DeactivateAccount from './components/profile/DeactivateAccount';
import Home from './components/home/Home';
import { RequireAuth } from './components/auth/PrivateRoute';
import { NotFound } from './components/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route
        path="/profile/deactivate"
        element={
          <RequireAuth>
            <DeactivateAccount />
          </RequireAuth>
        }
      />
      <Route
        path="/home"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/users/:displayName"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
