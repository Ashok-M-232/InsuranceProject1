import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ramanaSoft from '../components/Images/ramanaSoft.jpg';

const PaymentComponent = () => {
  const location = useLocation();
  const data = location.state;
  console.log('Received data at RazorPay:', data);

  // Send the received data to the API endpoint
  useEffect(() => {
    const sendDataToAPI = async () => {
      try {
        // Send data to the API endpoint
        const response = await axios.post('http://localhost:9855/api/user-address/add', data);
        console.log('Data sent to API:', response.data);
      } catch (error) {
        console.error('Error sending data to API:', error);
      }
    };

    // Call the function to send data to the API
    if (data) {
      sendDataToAPI();
    }
  }, [data]);

  useEffect(() => {
    // Load Razorpay script dynamically
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = initializeRazorpay;

    document.head.appendChild(script);

    // Clean up script tag on component unmount
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeRazorpay = () => {
    const options = {
      key: 'rzp_test_Su4WV4zdBIGTmZ',
      key_secret: 'EmH6eToe5CvCfAfgfADREv3C',
      amount: data?.amount ?? 100000, // Use amount from data if provided
      name: 'Ramana Insurance',
      description: 'Product/Service Description',
      image: ramanaSoft,
      handler: function (response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
      },
      prefill: {
        name: data?.name ?? 'Your Name',
        email: data?.email ?? 'your_email@example.com',
        contact: data?.contact ?? 'Your Contact Number',
      },
      notes: {
        address: data?.address ?? 'Your Address',
      },
      theme: {
        color: '#F37254',
      },
    };

    const pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <div>
      <button onClick={initializeRazorpay}>Pay with Razorpay</button>
    </div>
  );
};

export default PaymentComponent;
