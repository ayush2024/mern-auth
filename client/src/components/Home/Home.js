import { React, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './Home.css'
import LoginSignup from '../LoginSignup/LoginSignup.js';
import Dashboard from '../Dashboard/Dashboard.js';

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')));
    const [times, setTimes] = useState({ loggedInTime: null, loggedOutTime: null });
    // console.log(user.id);
    const userId = user?.id;

    // useEffect(() => {
    const handleLogout = async () => {
        axios.defaults.withCredentials = true;
        try {
            const response = await axios.get(`https://mern-auth-api-woad.vercel.app/logout/${userId}`);
            const { loggedInTime, loggedOutTime } = response.data;
            setTimes({ loggedInTime, loggedOutTime });

            localStorage.removeItem('user:detail');
            navigate('/loginsignup');
        } catch (error) {
            console.error('Logout error:', error.message);
            // Handle logout failure
        }
    };

    // handleLogout();
    // }, []);  

    return (
        <div className='mainH'>
            <div >
                {user ? (
                    <>
                        <h1>Welcome, {user.fullName}</h1>
                        <p>Email: {user.email}</p>
                        <p>ID:{user.id}</p>
                        {/* <Dashboard /> */}
                        {/* <Link className='btnL' to="/logout">Logout</Link> */}
                        <Link className='btnL' to="/dashboard">DashBoard</Link>
                        {/* <button className='btnL' onClick={handleLogout}>Logout</button> */}
                    </>
                ) : (
                    <>
                        <h1>You don't have an account</h1>
                        <Link className='btnL' to="/loginsignup">Login/Signup</Link>
                        {/* <Link className='btnL' to="/dashboard">DashBoard</Link> */}
                        {/* <LoginSignup /> */}
                    </>
                )}
                
            </div>
               
         </div>
    )
}

export default Home
