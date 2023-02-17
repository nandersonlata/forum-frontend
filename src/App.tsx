import React from 'react';
import SignIn from './components/auth/Signin';
import {Route, Routes} from "react-router-dom";
import SignUp from "./components/auth/Signup";

function App() {
  return (
    <Routes>
        <Route path='/' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
    </Routes>
  );
}

export default App;
