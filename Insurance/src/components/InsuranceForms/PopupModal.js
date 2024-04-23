// PopupModal.js

import React, { useState, useEffect } from 'react';
import './PopupModal.css';
import LoginPage from '../HomePage/LoginPage';
import SignInPage from './SignInPage';
import { usePropertyContext } from './PropertyContext';

const PopupModal = ({ message, onClose }) => {
  const { popupMessage, updatePopupMessage } = usePropertyContext();
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleView = () => {
    setIsSignIn((prev) => !prev);
  };

  useEffect(() => {
    // Set the default popup message when the modal is opened
    updatePopupMessage(message);
  }, [message, updatePopupMessage]);

  return (
    <div className="popup-modal">
      <div className="popup-content">
        <h3 className='forMsg'>{popupMessage}</h3>
        <div className="container">
          <div className="box">
            <h2>{isSignIn ? 'Sign In' : 'Login'}</h2>
            {isSignIn ? <SignInPage /> : <LoginPage />}
            <p onClick={toggleView} className="toggle-link text-primary font-weight-bold text-center" style={{ cursor: 'pointer' }}>
              {isSignIn ? 'Switch to Login' : 'Switch to Sign In'}
            </p>
          </div>
        </div>
        <button className='btn btn-danger' onClick={onClose}> Close</button>
      </div>
    </div>
  );
};

export default PopupModal;
