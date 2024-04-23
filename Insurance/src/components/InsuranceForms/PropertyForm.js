import React, { useState } from 'react';
import './PropertyForm.css';
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button components from react-bootstrap
import PopupModal from './PopupModal';
import { usePropertyContext } from './PropertyContext';
import SignInPage from './SignInPage';
import LoginPage from '../HomePage/LoginPage';
function PropertyForm() {
  const [currentMarketValue, setCurrentMarketValue] = useState('');
  const [carpetArea, setCarpetArea] = useState('');
  const [pincode, setPincode] = useState('');
  const [buildingAge, setBuildingAge] = useState('0');
  const [propertyEffect, setPropertyEffect] = useState('No');
  const [security24x7, setSecurity24x7] = useState('No');
  const [isSalaried, setIsSalaried] = useState('Yes');
  const { updatePropertyData } = usePropertyContext();
  const { price,setPrice } = useState('');
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPremiumPrices, setShowPremiumPrices] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    currentMarketValue: '',
    carpetArea: '',
    pincode: '',
    buildingAge: '',
    duration: '',
  });
  const toggleView = () => {
    setIsSignIn((prev) => !prev);
  };
  const [totalSum, setTotalSum] = useState(0);
  const [popupMessage, setPopupMessage] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the popup

  const handleCombined = () => {
    handleProceed();
    handleCalculateSum();
    setShowPremiumPrices(true);
    setPopupMessage(false)
  };

  const handleProceed = () => {
    const isValid = validateInputs();

    if (isValid) {
      const propertyValue = parseInt(currentMarketValue, 10);
      const areaValue = parseInt(carpetArea, 10);
      const pincodeValue = parseInt(pincode, 10);

      const formData = {
        propertyValue,
        currentMarketValue: propertyValue,
        carpetArea: areaValue,
        pincode: pincodeValue,
        security24x7,
        buildingAge,
        isSalaried,
        
      };

      console.log('Form submitted:', formData);
    } else {
      console.log('Form submission failed. Please enter valid numbers.');
    }
  };

  const handleCalculateSum = () => {
    const propertyValue = parseInt(currentMarketValue, 10);
    const forSecurity24x7 = propertyValue * 0.008;
    const propertyEffectValue = propertyValue * 0.007;
    const buildingAgeValue = parseInt(buildingAge, 10);

    const additionalCost =
      (buildingAgeValue >= 0 && buildingAgeValue <= 5 ? 100 : 0) +
      (buildingAgeValue > 5 && buildingAgeValue <= 10 ? 200 : 0) +
      (buildingAgeValue > 10 && buildingAgeValue <= 15 ? 300 : 0) +
      (buildingAgeValue > 15 && buildingAgeValue <= 20 ? 400 : 0) +
      (buildingAgeValue > 20 && buildingAgeValue <= 25 ? 500 : 0) +
      (buildingAgeValue > 25 && buildingAgeValue <= 30 ? 600 : 0);
    const sum =
      additionalCost +
      (propertyEffect === 'Yes' ? 0 : propertyEffectValue) +
      (security24x7 === 'Yes' ? 0 : forSecurity24x7) +
      (isSalaried === 'Yes' ? 100 : 0);

    setTotalSum(sum * 0.5);

    if (propertyEffect === 'Yes') {
      setShowPopup('Due to being affected by floods/earthquake in the past 5 years, you are not eligible.');
      setShowPopup(true);
      return;
    }

    if (isSalaried === 'No') {
      setShowPopup('Not a salaried individual. So, you are not eligible.');
      setShowPopup(true);
      return;
    }

    console.log(`Total Sum: ${sum}`);
  };

  const validateInputs = () => {
    const numberRegex = /^[1-9][0-9]+$/;
    let isValid = true;

    const validateField = (fieldName, value, length) => {
      if (fieldName !== 'buildingAge') {
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
      }
    };

    validateField('currentMarketValue', currentMarketValue);
    validateField('carpetArea', carpetArea);
    validateField('pincode', pincode, 6);
    validateField('buildingAge', buildingAge, 1);

    return isValid;
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const calculatePremium = (years) => {
    // Add your premium calculation logic here
    const basePremium = totalSum;
    let premium = 0;
  
    switch (years) {
      case 1:
        premium = basePremium + (basePremium * 0.28);
        break;
      case 2:
        premium = (2 * basePremium) + (basePremium * 0.24);
        break;
      case 3:
        premium = (3 * basePremium) + (basePremium * 0.20);
        break;
      case 4:
        premium = (4 * basePremium) + (basePremium * 0.16);
        break;
      case 5:
        premium = (5 * basePremium) + (basePremium * 0.12);
        break;
      default:
        premium = basePremium;
    }
  
    return premium.toFixed(0);
  };
  var premium=0;

  
  
  const propertyValue = parseInt(currentMarketValue, 10);
      const areaValue = parseInt(carpetArea, 10);
      const pincodeValue = parseInt(pincode, 10);

      const [prtyData] = useState({
        currentMarketValue: propertyValue,
        carpetArea: areaValue,
        pincode: pincodeValue,
        security24x7,
        propertyEffect,
        buildingAge,
        isSalaried,
        price:"",
        
        
      });
      const handlePremiumClick = (years) => {
    
        premium = calculatePremium(years);
       console.log(`Premium for ${years} years: ${premium}`);
       prtyData.currentMarketValue=propertyValue;
       prtyData.carpetArea=areaValue;
       prtyData.pincode=pincodeValue;
       prtyData.buildingAge=buildingAge;
       prtyData.price = premium;
       console.log(prtyData.price);
       console.log(prtyData);

       setShowPopup(premium);
     };
      console.log(prtyData);

  
  // console.log('Form submitted:', prtyData);
   
  //  console.log(currentMarketValue);
  // JSX structure of the component
  return (
    <div className="org">
      <div className="bg">
        <h2>Prediction for the Premium Calculation</h2>
        <div className="bg1">
          <div className="form-container container">
            <h2>Structure Details</h2>
            <form className="forinner container">
              <div className="form-group">
                <label>Current Market Value of Property <span style={{ color: 'red' }}>*</span> :</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ex : 012345"
                  maxLength={12}
                  value={currentMarketValue}
                  onChange={(e) => setCurrentMarketValue(e.target.value)}
                />
                <p className="error-message">{errorMessages.currentMarketValue}</p>
              </div>
  
              <div className="form-group">
                <label>Carpet Area/sq.ft <span style={{ color: 'red' }}>*</span> :</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ex : 1200"
                  value={carpetArea}
                  maxLength={5}
                  onChange={(e) => setCarpetArea(e.target.value)}
                />
                <p className="error-message">{errorMessages.carpetArea}</p>
              </div>
  
              <div className="form-group">
                <label>Enter Pincode <span style={{ color: 'red' }}>*</span> :</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ex : 515001"
                  value={pincode}
                  maxLength={6}
                  onChange={(e) => setPincode(e.target.value)}
                />
                <p className="error-message">{errorMessages.pincode}</p>
              </div>
  
              <div className="form-group">
                <label>Age of Building <span style={{ color: 'red' }}>*</span> :</label>
                <select
                  className="form-control form-select"
                  value={buildingAge}
                  onChange={(e) => setBuildingAge(e.target.value)}
                >
                  {[0, 5, 10, 15, 20, 25, 30].map((years) => (
                    <option key={years} value={years}>
                      {`${years}-${years + 5} years`}
                    </option>
                  ))}
                </select>
              </div>
  
              <div className="form-group">
                <label>Has your property been affected by floods/earthquake in the past 5 years{' '}
                  <span style={{ color: 'red' }}>*</span> :</label>
                <select
                  className="form-control form-select"
                  value={propertyEffect}
                  onChange={(e) => setPropertyEffect(e.target.value)}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </form>
          </div>
          <div className="form-container container">
            <h2>Security Measures</h2>
            <form className="forinner container">
              <div className="form-group">
                <label>24*7 Security <span style={{ color: 'red' }}>*</span> :</label>
                <select
                  className="form-control form-select"
                  value={security24x7}
                  onChange={(e) => setSecurity24x7(e.target.value)}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
  
              <div className="form-group">
                <label>Are you a salaried ? <span style={{ color: 'red' }}>*</span> :</label>
                <select
                  className="form-control form-select"
                  value={isSalaried}
                  onChange={(e) => setIsSalaried(e.target.value)}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
             
            </form>
            {propertyEffect === 'Yes' && isSalaried === 'No' ? null : (
            <button className="btn btn-success my-2" onClick={handleCombined}>
              Calculate
            </button>
          )}
            {showPremiumPrices && (
  <>
    <h2>Premium Prices As per Years</h2>
    {!Object.values(errorMessages).some((errorMessage) => errorMessage) && (
      <div className='d-flex'>
        <h4
          className='btn btn-primary mx-1'
          onClick={() => handlePremiumClick(1)}
        >
          1 year {(totalSum + (totalSum * 0.28)).toFixed(2)}/-
        </h4>
        <h4
          className='btn btn-primary mx-1'
          onClick={() => handlePremiumClick(2)}
        >
          2 years {(2*totalSum + (totalSum * 0.24)).toFixed(2)}/-
        </h4>
        <h4
          className='btn btn-primary mx-1'
          onClick={() => handlePremiumClick(3)}
        >
          3 years {(3*totalSum + (totalSum * 0.20)).toFixed(2)}/-
        </h4>
        <h4
          className='btn btn-primary mx-1'
          onClick={() => handlePremiumClick(4)}
        >
          4 years {(4*totalSum + (totalSum * 0.16)).toFixed(2)}/-
        </h4>
        <h4
          className='btn btn-primary mx-1' 
          onClick={() => handlePremiumClick(5)}
        >
          5 years  {(5*totalSum + (totalSum * 0.12)).toFixed(2)}/-
        </h4>
      </div>
    )}
  </>
)}


            {popupMessage && (
              <PopupModal message={popupMessage} onClose={() => setPopupMessage(null)} />
            )}

{propertyEffect === 'Yes' && (
  <Modal show={showPopup} onHide={handleClosePopup} className="text-center">
    <Modal.Body>
    <h4 className="mt-5" style={{ color: 'red' }}>
  Due to being affected by floods/earthquake in the past 5 years, you are not eligible.
</h4>
<Button className="btn btn-primary my-3"  onClick={handleClosePopup}>
  Close
</Button>

    </Modal.Body>
  </Modal>
)}

{isSalaried === 'No' && (
  <Modal show={showPopup} onHide={handleClosePopup} className="text-center">
    <Modal.Body>
      <h4 className="mt-5" style={{ color: 'red' }}>Not a salaried individual. So, you are not eligible.</h4>
      <Button className="btn btn-primary my-3" onClick={handleClosePopup}>
        Close
      </Button>
    </Modal.Body>
  </Modal>
)}
{isSalaried === 'Yes' && propertyEffect === 'No' && (
  <Modal show={showPopup} onHide={handleClosePopup} className="text-center">
    <Modal.Body>
    <div className="popup-content">
        <div className="container">
          <div className="box">
          <h2 style={{ color: 'rgb(0, 16, 100)' }}>{isSignIn ? 'Sign In' : 'Login'}</h2>
            {isSignIn ? <SignInPage abc={prtyData}/> : <LoginPage />}
            <p onClick={toggleView} className="toggle-link text-primary font-weight-bold text-center" style={{ cursor: 'pointer' }}>
              {isSignIn ? 'Switch to Login' : 'Switch to Sign In'}
            </p>
          </div>
        </div>
      </div>
    </Modal.Body>
  </Modal>
)}


         
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default PropertyForm;