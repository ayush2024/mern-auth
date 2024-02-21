// import { React, useState } from 'react'
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios';
// import './NavBar.css';
// import LoginSignup from '../LoginSignup/LoginSignup';

// const Navbar = () => {

//   const navigate = useNavigate();
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')));
//   const [times, setTimes] = useState({ loggedInTime: null, loggedOutTime: null });
//   // console.log(user.id);
//   const userId = user?.id;

//   // useEffect(() => {
//   const handleLogout = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8000/api/logout/${userId}`);
//       const { loggedInTime, loggedOutTime } = response.data;
//       setTimes({ loggedInTime, loggedOutTime });

//       localStorage.removeItem('user:detail');
//       setUser(null);
//       navigate('/loginsignup');
//     } catch (error) {
//       console.error('Logout error:', error.message);
//       // Handle logout failure
//     }
//   };

//   // handleLogout();
//   // }, []);  
//   return (
//     <div className='navbar'>
//       <div className='left'>
//         <div className='userName'>{user ? user?.fullName : 'Please Make a Account'}</div>
//       </div>
//       <div className='right'>
//         <div className='dash'>
//           <Link className='btnL' to="/dashboard">DashBoard</Link>
//         </div>
//         <div className='logio'>
//           {
//             user ? (

//               <button className='btnL' onClick={handleLogout}>Logout</button>
//             )
//               : (
//                 <Link className='btnL' to='/loginsignup'>Login</Link>
//               )
//           }
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


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

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user:detail')));
    setIsLoggedIn(!!localStorage.getItem('user:detail'));
  },[]);

  const handleLogout = async () => {
    try {
      // Perform logout actions (e.g., clear local storage, update state)
      localStorage.removeItem('user:detail');
      setUser(null);
      setIsLoggedIn(false);
      navigate('/loginsignup'); // Redirect to login/signup page
    } catch (error) {
      console.error('Logout error:', error.message);
      // Handle logout failure
    }
  };

  return (
    <>
      <div className='navbar'>
        <div className='left'>
          <Link to='/' className='userName btnL'>{user ? user.fullName : 'Please Make an Account'}</Link>
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
