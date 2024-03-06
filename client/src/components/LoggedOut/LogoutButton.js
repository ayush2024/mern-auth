import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
    axios.defaults.withCredentials = true;
    const [times, setTimes] = useState({ loggedInTime: null, loggedOutTime: null });
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')));
    const userId = user?.id;
    const navigate = useNavigate();
    
    useEffect(() => {
        const handleLogout = async () => {
            try {
                const response = await axios.post('http://localhost:8000/api/logout', { userId });
                const { loggedInTime, loggedOutTime } = response.data;
                setTimes({ loggedInTime, loggedOutTime });
                
                localStorage.removeItem('user:detail');
                navigate('/loginsignup');
            } catch (error) {
                console.error('Logout error:', error);
                // Handle logout failure
            }
        };
    
        handleLogout();
    }, []);    

    return (
        <div>
            {/* <button onClick={handleLogout}>Logout</button> */}
            <p>Logout</p>
        </div>
    );
};

export default LogoutButton;
