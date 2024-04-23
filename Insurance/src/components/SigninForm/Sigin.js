// PropertyForm.js

import React, { useState } from 'react';
import './PropertyForm.css';
import { Link } from 'react-router-dom';

function Sigin() {
  const [currentMarketValue, setCurrentMarketValue] = useState('');
  const [carpetArea, setCarpetArea] = useState('');
  const [pincode, setPincode] = useState('');
  const [buildingAge, setBuildingAge] = useState('0');
  const [propertyEffect, setPropertyEffect] = useState('No');
  const [security24x7, setSecurity24x7] = useState('No');
  const [isSalaried, setIsSalaried] = useState('Yes');
  const [showPremiumPrices, setShowPremiumPrices] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    currentMarketValue: '',
    carpetArea: '',
    pincode: '',
    buildingAge: '',
    duration: '',
  });
  const [totalSum, setTotalSum] = useState(0);

  const handleCombined = () => {
    handleProceed();
    handleCalculateSum();
    setShowPremiumPrices(true);
    // Show the pop-up
  };

  const handleProceed = () => {
    const isValid = validateInputs();

    if (isValid) {
      const propertyValue = parseInt(currentMarketValue, 10);
      const areaValue = parseInt(carpetArea, 10);
      const pincodeValue = parseInt(pincode, 10);
      const totalPropertyValue = propertyValue * 0.01;
      const forsecurity24x7 = propertyValue * 0.01;

      // Create a new form data object
      const formData = {
        currentMarketValue: totalPropertyValue,
        carpetArea: areaValue,
        pincode: pincodeValue,
        propertyEffect,
        forsecurity24x7,
        isSalaried,
      };

      console.log('Form submitted:', formData);
    } else {
      console.log('Form submission failed. Please enter valid numbers.');
    }
  };

  const handleCalculateSum = () => {
    const propertyValue = parseInt(currentMarketValue, 10);
    const totalPropertyValue = propertyValue * 0.01;
    const forsecurity24x7 = propertyValue * 0.008;
    const propertyEffectValue = propertyValue * 0.007;
    const buildingAgeValue = parseInt(buildingAge, 10);

    const sum =
      (buildingAgeValue >= 0 && buildingAgeValue <= 5 ? totalPropertyValue * 0.04 : 0) +
      (buildingAgeValue > 5 && buildingAgeValue <= 10 ? totalPropertyValue * 0.05 : 0) +
      (buildingAgeValue > 10 && buildingAgeValue <= 15 ? totalPropertyValue * 0.06 : 0) +
      (buildingAgeValue > 15 && buildingAgeValue <= 20 ? totalPropertyValue * 0.07 : 0) +
      (buildingAgeValue > 20 && buildingAgeValue <= 25 ? totalPropertyValue * 0.08 : 0) +
      (buildingAgeValue > 25 && buildingAgeValue <= 30 ? totalPropertyValue * 0.09 : 0) +
      (propertyEffect === 'Yes' ? 0 : propertyEffectValue) +
      (security24x7 === 'Yes' ? 0 : forsecurity24x7) +
      (isSalaried === 'Yes' ? 100 : 0);

    setTotalSum(sum * 0.5);

    if (propertyEffect === 'Yes') {
      alert('Due to being affected by floods/earthquake in the past 5 years, you are not eligible.');
      window.location.reload(); // Reload the page
      return; // Exit the function to prevent further execution
    }

    if (isSalaried === 'No') {
      alert('Not a salaried. So, you are not eligible.');
      window.location.reload(); // Reload the page
      return; // Exit the function to prevent further execution
    }

    console.log(`Total Sum: ${sum}`);
  };

  const validateInputs = () => {
    const numberRegex = /^\d+$/;
    let isValid = true;

    const validateField = (fieldName, value, length) => {
      if (!numberRegex.test(value) || (length && value.length !== length)) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          [fieldName]: length
            ? `Please enter a valid ${length}-digit number.`
            : 'Please enter a valid number.',
        }));
        isValid = false;
      } else if (fieldName === 'currentMarketValue' && parseInt(value, 10) <= 10000) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          [fieldName]: 'Please enter a value greater than 100000 for Current Market Value.',
        }));
        isValid = false;
      } else {
        setErrorMessages((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
      }
    };

    validateField('currentMarketValue', currentMarketValue);
    validateField('carpetArea', carpetArea);
    validateField('pincode', pincode, 6);
    validateField('buildingAge', buildingAge, 1);

    return isValid;
  };

  return (
    <div className='org'>
      <div className='bg'>
        <h2>Prediction for the Premium Calculation</h2>
        <div className='bg1'>
          <div className='form-container container'>
            <h2>Structure Details</h2>
            <form className='forinner container'>
              <div className='form-group'>
                <label>Current Market Value of Property:</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='ex : 012345'
                  value={currentMarketValue}
                  onChange={(e) => setCurrentMarketValue(e.target.value)}
                />
                <p className='error-message'>{errorMessages.currentMarketValue}</p>
              </div>

              <div className='form-group'>
                <label>Carpet Area/sq.ft:</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='ex : 1200'
                  value={carpetArea}
                  onChange={(e) => setCarpetArea(e.target.value)}
                />
                <p className='error-message'>{errorMessages.carpetArea}</p>
              </div>

              <div className='form-group'>
                <label>Enter Pincode:</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='ex : 515001'
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
                <p className='error-message'>{errorMessages.pincode}</p>
              </div>

              <div className='form-group'>
                <label>Age of Building:</label>
                <select
                  className='form-control form-select'
                  value={parseInt(buildingAge, 10)} // Convert to number
                  onChange={() => setBuildingAge}
                >
                  {[0, 5, 10, 15, 20, 25, 30].map((years) => (
                    <option key={years} value={years}>
                      {`${years}-${years + 5} years`}
                    </option>
                  ))}
                </select>
              </div>

              <div className='form-group'>
                <label>Has your property been affected by floods/earthquake in the past 5 years:</label>
                <select
                  className='form-control form-select'
                  value={propertyEffect}
                  onChange={(e) => setPropertyEffect(e.target.value)}
                >
                  <option value='Yes'>Yes</option>
                  <option value='No'>No</option>
                </select>
              </div>
            </form>
          </div>
          <div className='form-container container'>
            <h2>Security Measures</h2>
            <form className='forinner container'>
              <div className='form-group'>
                <label>24*7 Security:</label>
                <select
                  className='form-control form-select'
                  value={security24x7}
                  onChange={(e) => setSecurity24x7(e.target.value)}
                >
                  <option value='Yes'>Yes</option>
                  <option value='No'>No</option>
                </select>
              </div>

              <div className='form-group'>
                <label>Are you a salaried ?:</label>
                <select
                  className='form-control form-select'
                  value={isSalaried}
                  onChange={(e) => setIsSalaried(e.target.value)}
                >
                  <option value='Yes'>Yes</option>
                  <option value='No'>No</option>
                </select>
              </div>
            </form>

            {showPremiumPrices && (
  <>
    <h2>Premium Prices As per Years</h2>
    {!Object.values(errorMessages).some((errorMessage) => errorMessage) && (
      <div className='d-flex'>
        <h4 className='btn btn-primary mx-1'>{`1 year ${(totalSum + (totalSum * 0.28)).toFixed(2)}/yr`}</h4>
        <h4 className='btn btn-primary mx-1'>{`2 years ${(totalSum + (totalSum * 0.24)).toFixed(2)}/yr`}</h4>
        <h4 className='btn btn-primary mx-1'>{`3 years ${(totalSum + (totalSum * 0.20)).toFixed(2)}/yr`}</h4>
        <h4 className='btn btn-primary mx-1'>{`4 years ${(totalSum + (totalSum * 0.16)).toFixed(2)}/yr`}</h4>
        <h4 className='btn btn-primary mx-1'>{`5 years ${(totalSum + (totalSum * 0.12)).toFixed(2)}/yr`}</h4>
      </div>
    )}

    {/* Link Tag */}
    <Link to='sigin' className='btn btn-success my-2'>
      Go to Link
    </Link>
  </>
)}

            {/* Calculate button */}
            <button className='btn btn-success my-2' onClick={handleCombined}>
              Calculate
            </button>
            <Link></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sigin;
