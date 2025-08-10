import React, { useState } from 'react';
import './Auth.css';
import Navbar from './Navbar'

import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to handle error message
  const navigate = useNavigate();

  const handleRegister = async (e) => {
      e.preventDefault();
      setError(''); // Clear any previous errors
      try {
          const { data } = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
          localStorage.setItem('token', data.token);
          localStorage.setItem('name', data.name);
          navigate('/login'); // Redirect to login if registration is successful
      } catch (error) {
          if (error.response && error.response.data && error.response.data.message) {
              setError(error.response.data.message); // Set error message if registration fails
          } else {
              setError('An unexpected error occurred. Please try again later.');
          }
      }
  };
  return (
    <>
    <Navbar/>
    <div className="auth-container">
      <div className="form-box">
        <h1>Register</h1>
        <form className="form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" placeholder="Enter your name" required
            value={name}
            onChange={(e)=>setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Enter your email" required 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder="Enter your password" required 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <button type="submit" className="form-btn">Register</button>
        </form>
        {error && <p className="text-danger mt-3">{error}</p>} {/* Display error message */}
            <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
    </>
  );
}

export default Register;
