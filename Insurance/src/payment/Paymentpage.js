import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios library

import './Paymentpage.css';

function Paymentpage() {
  const location = useLocation();
  const data = location.state;

  // Log received data
  console.log('Received data at Payment Option:', data);

  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();

  const handleContinue = async () => {
    // Check if an option is selected before navigating
    if (selectedOption) {
      // Log the selected option
      console.log(`Selected option: ${selectedOption}`);

      // Check selected option and navigate accordingly
      if (selectedOption === 'phonePe') {
        // You can add logic here for phonePe payment
        navigate('/phonepe');
      } else if (selectedOption === 'razorpay') {
        // Send data to the API endpoint using axios
        try {
          await axios.post('http://localhost:9855/api/user-address/add', data);
          console.log('Data sent successfully');

          // Navigate to the Razorpay page
          navigate('/razorpay', { state: data });
        } catch (error) {
          console.error('Error sending data:', error);
          alert('Failed to send data. Please try again.');
        }
      }
    } else {
      alert('Please select a payment option.');
    }
  };

  return (
    <div className='pyhd'>
      <h4>Pay through:</h4>
      <label>
        <input
          type='radio'
          value='phonePe'
          checked={selectedOption === 'phonePe'}
          onChange={() => setSelectedOption('phonePe')}
        />
        Phone Pe
      </label>
      <label>
        <input
          type='radio'
          value='razorpay'
          checked={selectedOption === 'razorpay'}
          onChange={() => setSelectedOption('razorpay')}
        />
        Razor pay
      </label>
      <button className='mx-3 my-3 pylk' onClick={handleContinue} disabled={!selectedOption}>
        Continue
      </button>
    </div>
  );
}

export default Paymentpage;
