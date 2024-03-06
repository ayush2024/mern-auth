import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css';
import { useNavigate } from 'react-router-dom'

const LoginSignup = () => {
    
    const navigate = useNavigate();
    
    const [login, setLogin] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8000/api/${login ? 'login' : 'register'}`, {
                fullName,
                email,
                password
            });
            const resData = res.data;
            
            if (resData.token) {
                localStorage.setItem('user:token', resData.token);
                localStorage.setItem('user:detail', JSON.stringify(resData.user));
                console.log('User logged in successfully');
                navigate('/');
            }
            
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    }


    return (
        <div className='mainH'>
            <div className='secondD'>
                {!login && (
                    <div>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder='Enter your name' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>
                )}

                <label htmlFor="">Email</label>
                <input type="email" placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="">Password</label>
                <input type="password" placeholder='Enter your Password' value={password} onChange={(e) => setPassword(e.target.value)} />

                <form onSubmit={handleSubmit}>
                    <button className='btnL' type='submit'>{login ? "Login" : "Register"}</button>
                </form>

                <Link className='switch' to="#" onClick={() => setLogin(!login)}>
                    {login ? "Create your account !!" : "Already have account !!!"}
                </Link>
            </div>
        </div>
    )
}

export default LoginSignup;
