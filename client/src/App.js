import {React, useState} from 'react'
import Home from './components/Home/Home.js'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from './components/LoginSignup/LoginSignup.js';
import Navbar from './components/NavBar/NavBar.jsx';
import LogoutButton from './components/LoggedOut/LogoutButton.js';
import Dashboard from './components/Dashboard/Dashboard.js';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginLogoutClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/loginsignup' element={<LoginSignup />} />
        <Route path='/logout' element={<LogoutButton />} />
        <Route path='/dashboard' element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App