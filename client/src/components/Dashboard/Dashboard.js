import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'

const Dashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/dashboard');
                // console.log(response);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className='stD'>
            <h1 className='dashHH'>Dashboard</h1>
            <div className='ndD'>
                {/* <h2>All Users</h2> */}
                <div className='rdD'>
                    {users.map(user => (
                        <div className='allD' key={user._id}>
                            <div className='userDetails'>
                                <div className='detail'>Name: {user.fullName}</div>
                                <div className='detail'>Logged In At : {user.loggedInTime ? new Date(user.loggedInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'LogOut...'}</div>
                                <div className='detail'>Logged Out At : {user.loggedOutTime ? new Date(user.loggedOutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Login...'}</div>
                                <div className='detail'>Date : {user.loggedInTime ? new Date(user.loggedInTime).toLocaleDateString([], { month: 'short', day: '2-digit' }) : 'LogOut...'}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default Dashboard;
