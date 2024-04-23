// RazorpayPayment.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Razorpay from 'razorpay';

function RazorpayPayment() {
  const navigate = useNavigate();
  const [paymentId, setPaymentId] = useState('');

  const options = {
    key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay API key
    amount: 100, // The amount is in currency subunits. Here, it's 100 paise or 1 rupee.
    currency: 'INR', // You can change the currency according to your needs
    name: 'Your Company Name',
    description: 'Payment for Insurance',
    image: 'your_logo_url.png', // Replace with your logo URL
    handler: function (response) {
      // Handle the success callback
      console.log(response);
      setPaymentId(response.razorpay_payment_id);
      navigate('/success'); // Redirect to the success page or handle success as needed
    },
  };

  const rzp = new Razorpay(options);

  const openRazorpayModal = () => {
    rzp.open();
  };

  return (
    <div>
      <h2>Payment Details</h2>
      <button onClick={openRazorpayModal}>Pay Now</button>
      {paymentId && <p>Payment ID: {paymentId}</p>}
    </div>
  );
}

export default RazorpayPayment;
