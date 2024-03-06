import { React, useState } from 'react'
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')));    

    return (
        <div className='mainH'>
            <div >
                {user ? (
                    <>
                        <h1>Welcome, {user.fullName}</h1>
                        <p>Email: {user.email}</p>
                        <p>ID:{user.id}</p>
                        <Link className='btnL' to="/dashboard">DashBoard</Link>
                    </>
                ) : (
                    <>
                        <h1>You don't have an account</h1>
                        <Link className='btnL' to="/loginsignup">Login/Signup</Link>
                    </>
                )}
            </div>
         </div>
    )
}

export default Home
