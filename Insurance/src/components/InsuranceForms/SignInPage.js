import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignInPage.css';
// import { usePropertyContext } from '../InsuranceForms/PropertyContext';
import { useUserContext } from '../ListOfPolicies/UserContext';
// import { Col } from 'react-bootstrap';

function SignInPage({abc}) {
  // const { propertyValue, buildingAge, carpetArea, pincode, security24x7, propertyEffect, isSalaried } = usePropertyContext();
  const { updateUserData } = useUserContext();
  const navigate = useNavigate();

  const [FullName, setFullName] = useState('');
  const [Mobile, setMobile] = useState('');
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    FullName: '',
    Mobile: '',
    Email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateInputs();
  
    if (isValid) {
      const formData = {
        fullName: FullName,
        mobile: Mobile,
        email: Email,
        password: password,
      };
  
      axios.post('http://localhost:9855/api/signin/add', formData)
        .then(response => {
          updateUserData({ FullName, Mobile, Email });
          navigate('/success', { state:{Mobile} });

          // Only send property data to the database if sign in is successful
          const prtyData = {
            currentMarketValue: abc.currentMarketValue, // Use abc.currentMarketValue instead of currentMarketValue
            carpetArea: abc.carpetArea,
            pincode: abc.pincode,
            security24x7: abc.security24x7,
            buildingAge: abc.buildingAge,
            propertyEffect: abc.propertyEffect,
            isSalaried: abc.isSalaried,
            premium:abc.price,
            mobile: Mobile // Assuming Mobile is a variable holding the mobile number
          };
  
          axios.post('http://localhost:9855/api/property/add', prtyData)
            .then(response => {
              console.log('Property data saved successfully:', response.data);
              // Handle success response if needed
            })
            .catch(error => {
              console.error('Error saving property data:', error);
              // Handle error response if needed
            });
        })
        .catch(error => {
          console.error('Sign in failed:', error);
          if (error.response && error.response.status === 409) {
            setErrorMessages(prevErrors => ({
              ...prevErrors,
              Mobile: 'Mobile number already exists. Kindly switch to SignUp.',
            }));
          } else {
            setErrorMessages(prevErrors => ({
              ...prevErrors,
              Mobile: 'Number already exists. Kindly switch to Login.',
            }));
          }
        });
    } else {
      console.log('Form submission failed. Please check the fields.');
    }
  };
  

  const validateInputs = () => {
    const nameRegex = /^[A-Za-z][A-Za-z. ]{1,18}[A-Za-z. ]$/;
    const mobileRegex = /^[987][0-9]{9}$/;
    const emailRegex = /^[^\s!@#$%^&*@]+@[^\s@]+\.(com|in)$/;
    const passwordRegex = /(?=.*[0-9])(?=.*[@])(?=.*[A-Z])[A-Za-z0-9!@#$%^&*]{8,15}$/;

    let isValid = true;

    const validateField = (fieldName, value, regex, errorMessage) => {
      if (!value || (regex && !regex.test(value))) {
        setErrorMessages(prevErrors => ({
          ...prevErrors,
          [fieldName]: errorMessage,
        }));
        isValid = false;
      } else {
        setErrorMessages(prevErrors => ({ ...prevErrors, [fieldName]: '' }));
      }
    };

    validateField('FullName', FullName, nameRegex, 'Please enter a valid full name.');
    validateField('Mobile', Mobile, mobileRegex, 'Please enter a valid 10-digit mobile number.');
    validateField('Email', Email, emailRegex, 'Please enter a valid email address.');
    validateField('password', password, passwordRegex, 'Password must be at least 8 characters, contain at least one letter, one number, and one special character.');

    return isValid;
  };
  // const mbData = {
  // Mobile
  // };

  return (
    <div className="fcontainer">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleSubmit} className="mt-5">
            <div className="form-group">
              <label>FullName:</label>
              <input
                type="text"
                className="form-control"
                placeholder="ex: FullName"
                value={FullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <small className="text-danger">{errorMessages.FullName}</small>
            </div>

            <div className="form-group">
              <label>MobileNo:</label>
              <input
                type="text"
                className="form-control"
                placeholder="ex: 9876543210"
                value={Mobile}
                maxLength={10}
                onChange={(e) => setMobile(e.target.value)}
              />
              <small className="text-danger">{errorMessages.Mobile}</small>
            </div>

            <div className="form-group">
              <label>EmailId:</label>
              <input
                type="text"
                className="form-control"
                placeholder="ex: example@gmail.com"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <small className="text-danger">{errorMessages.Email}</small>
            </div>
            
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="ex: Abc@123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <small className="text-danger">{errorMessages.password}</small>
            </div>

            <button className="btn btn-success mt-3 mb-4" type="submit">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
