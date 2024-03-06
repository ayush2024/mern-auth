import { React, useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
    const [userI, setUserI] = useState(JSON.parse(localStorage.getItem('user:detail')));
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user:detail'));
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    console.log(userI.id);
    
    useEffect(() => {
        setUserI(JSON.parse(localStorage.getItem('user:detail')));
        setIsLoggedIn(!!localStorage.getItem('user:detail'));
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/dashboard');
                setUsers(response?.data);
                setFilteredUsers(response?.data); 
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching users:', error?.message);
            }
        };

        fetchUsers();
    }, []);

    const calculateDuration = (loggedInTime, loggedOutTime) => {
        const loggedInTimestamp = new Date(loggedInTime).getTime();
        const loggedOutTimestamp = new Date(loggedOutTime).getTime();
        const durationMilliseconds = loggedOutTimestamp - loggedInTimestamp;
        return formatDuration(durationMilliseconds);
    };

    const formatDuration = (durationMilliseconds) => {
        const milliseconds = parseInt((durationMilliseconds % 1000) / 100);
        let seconds = Math.floor((durationMilliseconds / 1000) % 60);
        let minutes = Math.floor((durationMilliseconds / (1000 * 60)) % 60);
        let hours = Math.floor((durationMilliseconds / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    };

    const filterUsers = (duration) => {
        console.log("Inside")
        const filtered = users.filter(user => {
            const loggedInTime = user.loggedInTime ? new Date(user.loggedInTime).getTime() : 0;
            const loggedOutTime = user.loggedOutTime ? new Date(user.loggedOutTime).getTime() : new Date().getTime();
            const durationMilliseconds = loggedOutTime - loggedInTime;
            return duration === 'moreThan1Hour' ? durationMilliseconds > (1 * 60 * 60 * 1000) :
            duration === 'lessThan1Hour' ? durationMilliseconds < (1 * 60 * 60 * 1000) :
            duration === 'moreThan2Hours' ? durationMilliseconds > (2 * 60 * 60 * 1000) :
            duration === 'halfAnHour' ? durationMilliseconds > (0.5 * 60 * 60 * 1000) :
            true; // Return true for no filter
            
        });
        console.log(filtered);
        setFilteredUsers(filtered);
    };

    return (
        <div className='stD' data-testid="dash-test">
            <h1 className='dashHH'>Dashboard</h1>
            <div className='ndD'>
                <button className='filter' onClick={() => filterUsers('moreThan1Hour')}>More Than 1 Hour</button>
                <button className='filter' onClick={() => filterUsers('lessThan1Hour')}>Less Than 1 Hour</button>
                <button className='filter' onClick={() => filterUsers('moreThan2Hours')}>More Than 2 Hours</button>
                <button className='filter' onClick={() => filterUsers('halfAnHour')}>More Than Half Hours</button>
    
                <div className='rdD'>
                    {filteredUsers.length === 0 ? (
                        <div className="sorryMessage">Sorry, no users found.</div>
                    ) : (
                        filteredUsers.map(user => (
                            <div className='allD' key={user?._id}>
                                {isLoggedIn && userI?.id === user._id ? (
                                    <div className='logedInUser'>
                                        <div className='detail'>Filer: {filteredUsers?.fullName}</div>
    
                                        <div className='detail'>Name: {user?.fullName}</div>
                                        <div className='detail'>Logged In At: {user?.loggedInTime ? new Date(user.loggedInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'LogOut...'}</div>
                                        <div className='detail'>Date: {user?.loggedInTime ? new Date(user.loggedInTime).toLocaleDateString([], { year: 'numeric', month: 'short', day: '2-digit' }) : 'LogOut...'}</div>
                                        <div className='detail'>Currently Logged In...</div>
                                    </div>
                                ) : (
                                    <div className='userDetails'>
                                        <div className='detail'>Name: {user?.fullName}</div>
                                        <div className='detail'>Logged In At: {user?.loggedInTime ? new Date(user.loggedInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'LogOut...'}</div>
                                        <div className='detail'>Logged Out At: {user?.loggedOutTime ? new Date(user.loggedOutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Login...'}</div>
                                        <div className='detail'>Date: {user?.loggedInTime ? new Date(user.loggedInTime).toLocaleDateString([], { year: 'numeric', month: 'short', day: '2-digit' }) : 'LogOut...'}</div>
                                        <div className='detail'><h3>Duration of LogIn:  {calculateDuration(user.loggedInTime, user.loggedOutTime)}</h3></div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
    
};

export default Dashboard;
