import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css'

const LoginHome = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:9832/api/signin/check', {
        fullName: username,
        password: password
      });
      if (response.data) {
        navigate('/success'); // Replace '/nextpage' with your actual next page URL
      } else {
        setError('Invalid username or password.');
      }
    } catch (error) {
      console.error('Error checking user existence:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="lg22 form-box login-form">
        <div className=" lg2 form-group">
          <h3 className='text-center h3font' style={{ color: 'blue' }}> Login</h3>
          <label className='lblp'>Username:</label>
          <input
            type="text"
            className="form-control smaller-text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="lg2 form-group">
          <label className='lblp'>Password:</label>
          <input
            type="password"
            className="form-control smaller-text"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary smaller-button1" onClick={handleLogin}>
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default LoginHome;
