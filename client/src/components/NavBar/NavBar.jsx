import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NavBar.css';
import Dashboard from '../Dashboard/Dashboard.js';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')));
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user:detail'));
  // const [times, setTimes] = useState({ loggedInTime: null, loggedOutTime: null });

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user:detail')));
    setIsLoggedIn(!!localStorage.getItem('user:detail'));
  }, []);
  const userId = user?.id;

  
  const handleLogout = async () => {
    axios.defaults.withCredentials = true;
    try {
      const response = await axios.get(`https://zany-pear-coypu-sock.cyclic.app/api/logout/${userId}`);
      
      // const { loggedInTime, loggedOutTime } = response.data;
      // setTimes({ loggedInTime, loggedOutTime });

      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem('user:detail');
      navigate('/loginsignup');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <>
      <div className='navbar'>
        <div className='left'>
          <Link to='/' className='userName btnL'>{user ? user?.fullName : 'Please Make an Account'}</Link>
        </div>
        <div className='right'>
          <div className='dash'>
            {/* <Link className='btnL' to='/dashboard'>Dashboard</Link> */}
            {isLoggedIn ? (
              <Link className='btnL' to='/dashboard'>Dashboard</Link>
            ) : (
              <Link className='btnL' onClick={() => alert('Please log in first')}>Dashboard</Link>
            )}
          </div>
          <div className='logio'>
            {isLoggedIn ? (
              <Link className='btnL' onClick={handleLogout}>Logout</Link>
            ) : (
              <Link className='btnL' to='/loginsignup'>Login</Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
