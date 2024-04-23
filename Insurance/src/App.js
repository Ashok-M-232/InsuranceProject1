import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/HomePage/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignInPage from './components/InsuranceForms/SignInPage';
import TotalInfo from './components/ListOfPolicies/TotalInfo';
import { UserProvider } from './components/ListOfPolicies/UserContext';
import Prac from './components/ListOfPolicies/Prac';
import Paymentpage from './payment/Paymentpage';
import Payment from './payment/Payment';
import Admin from './components/Admin/Admin';
import PropertyForm from './components/InsuranceForms/PropertyForm';
import { PropertyContextProvider } from './components/InsuranceForms/PropertyContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <PropertyContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/property" element={<PropertyForm />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/success" element={<TotalInfo />} />
            <Route path="/payment" element={<Paymentpage />} />
            <Route path="/razorpay" element={<Payment />} />
            <Route path="/demo" element={<Prac />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </PropertyContextProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
