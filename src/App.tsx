import React from 'react';
import SignIn from './components/auth/Signin';
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/auth/Signup';
import Profile from './components/profile/Profile';
import DeactivateAccount from './components/profile/DeactivateAccount';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/deactivate" element={<DeactivateAccount />} />
    </Routes>
  );
}

export default App;
