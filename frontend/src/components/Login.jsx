import React, { useState } from 'react';
import './Auth.css';
import Navbar from './Navbar';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });

        // Save user data in local storage
        console.log(data.username)
        localStorage.setItem('user', JSON.stringify({ username: data.username, token: data.token }));

        // Navigate to dashboard
        navigate('/dashboard');
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
          navigate('/login');
        } else {
          setError('An unexpected error occurred. Please try again later.');
          navigate('/login');
        }
      }
    };
    return (
      <>
        <Navbar />
        <div className="auth-container">
          <div className="form-box">
            <h1>Login</h1>
            <form className="form" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="form-btn">Login</button>
            </form>
            {error && <p className="text-danger mt-3">{error}</p>} {/* Display error message */}
            <p>Don't have an account? <a href="/register">Register</a></p>
          </div>
        </div>
      </>
    );
  };

  export default Login;
