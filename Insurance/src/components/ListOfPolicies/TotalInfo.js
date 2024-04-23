import React, { useState,useEffect } from 'react';
import axios from 'axios'; // Import Axios library
import './TotalInfo.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function TotalInfo() {
  

  const { state } = useLocation();
  const a = state.Mobile;
   

  useEffect(() => {
    axios.get(`http://localhost:9855/api/property/${a}`)
      .then(response => {
        console.log('ProData',response.data);
        setPropertyDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching property details:', error);
      });
  }, []);
  useEffect(() => {
    axios.get(`http://localhost:9855/api/signin/${a}`)
      .then(response => {
        console.log('UserData',response.data);
        setPropertyDetails1(response.data);
      })
      .catch(error => {
        console.error('Error fetching User details:', error);
      });
  }, []);

  // useEffect(() => {
  //   if (state && state.mbData) {
  //     const mobile = state.mbData;
  //     get(`http://localhost:9855/api/property/${mobile}`)
  //       .then(response => response.json())
  //       .then(data => {
  //         setPropertyDetails(data);
  //       })
  //       .catch(error => console.error('Error fetching property details:', error));
  //   }
  // }, [state]);



  const [propertyDetails, setPropertyDetails] = useState([]);
  const [propertyDetails1, setPropertyDetails1] = useState([]);
  const navigate = useNavigate();
  const [FullNamePrefix, setFullNamePrefix] = useState('');
  const [FullName, setFullName] = useState('');
  const [PanCard, setPanCard] = useState('');
  const [DateofBirth, setDateofBirth] = useState('');
  const [FlatNo, setFlatNo] = useState('');
  const [AreaStreet, setAreaStreet] = useState('');
  const [FlatNo1, setFlatNo1] = useState('');
  const [AreaStreet1, setAreaStreet1] = useState('');
  const [pincode, setPincode] = useState('');
  const [pincodee, setPincodee] = useState('');
  const [IsCurrentAddress, setIsCurrentAddress] = useState('');

  const [errorMessages, setErrorMessages] = useState({
    FullName: '',
    PanCard: '',
    DateofBirth: '',
    FlatNo: '',
    AreaStreet: '',
    CurrentAddress: '',
    pincode: '',
    pincodee: '',
    AreaStreet1: '',
  });

  // Function to validate a field based on regex and error message
  const validateField = (fieldName, value, regex, errorMessage) => {
    if (!regex.test(value)) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [fieldName]: errorMessage,
      }));
      return false;
    } else {
      setErrorMessages((prevErrors) => ({ ...prevErrors, [fieldName]: '' }));
      return true;
    }
  };

  // Function to validate all inputs
const validateInputs = () => {
  const alphanumericRegex = /^[A-Za-z0-9\s]+$/;
  const panCardRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/  ;
  const dateOfBirthRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

  let isValid = true;

  isValid = isValid && validateField('FullName', FullName, alphanumericRegex, 'Please enter your full name.');
  isValid = isValid && validateField('PanCard', PanCard, panCardRegex, 'Please enter a valid PanCard.');

  // Validating DateofBirth and age range
  if (dateOfBirthRegex.test(DateofBirth)) {
    const birthDate = new Date(DateofBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    // Check if the age is between 21 and 100 years
    if (age < 21 || age > 100) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        DateofBirth: 'Age must be between 21 and 100 years.',
      }));
      isValid = false;
    } else {
      setErrorMessages((prevErrors) => ({ ...prevErrors, DateofBirth: '' }));
    }
  } else {
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      DateofBirth: 'Please enter a valid date of birth.',
    }));
    isValid = false;
  }

  isValid = isValid && validateField('pincode', pincode, /^\d{6}$/, 'Please enter a valid pincode.');
  isValid = isValid && validateField('FlatNo', FlatNo, alphanumericRegex, 'Please enter a valid flat number.');
  isValid = isValid && validateField('AreaStreet', AreaStreet, alphanumericRegex, 'Please enter a valid area or street.');

  if (IsCurrentAddress === 'no') {
    isValid = isValid && validateField('pincodee', pincodee, /^\d{6}$/, 'Please enter a valid pincode.');
    isValid = isValid && validateField('FlatNo1', FlatNo1, alphanumericRegex, 'Please enter a valid flat number.');
    isValid = isValid && validateField('AreaStreet1', AreaStreet1, alphanumericRegex, 'Please enter a valid area or street.');
  }

  return isValid;
};


  // Function to handle input changes
  const handleInputChange = (fieldName, value, regex, errorMessage) => {
    switch (fieldName) {
      case 'FullNamePrefix':
        setFullNamePrefix(value);
        break;
      case 'FullName':
        setFullName(value);
        validateField(fieldName, value, regex, errorMessage);
        break;
      case 'PanCard':
        setPanCard(value);
        validateField(fieldName, value, regex, errorMessage);
        break;
      case 'DateofBirth':
        setDateofBirth(value);
        validateField(fieldName, value, regex, errorMessage);
        break;
      case 'FlatNo':
        setFlatNo(value);
        validateField(fieldName, value, regex, errorMessage);
        break;
      case 'AreaStreet':
        setAreaStreet(value);
        validateField(fieldName, value, regex, errorMessage);
        break;
      case 'FlatNo1':
        setFlatNo1(value);
        validateField(fieldName, value, regex, errorMessage);
        break;
      case 'AreaStreet1':
        setAreaStreet1(value);
        validateField(fieldName, value, regex, errorMessage);
        break;
      case 'pincode':
        setPincode(value);
        validateField(fieldName, value, regex, errorMessage);
        break;
      case 'pincodee':
        setPincodee(value);
        validateField(fieldName, value, regex, errorMessage);
        break;
      case 'IsCurrentAddress':
        setIsCurrentAddress(value);
        break;
      default:
        break;
    }
  };

  // Function to handle the proceed button click
  const handleProceed = () => {
    const isValid = validateInputs();

    if (isValid) {
      // Prepare data object to send to the backend API
      const data = {
        fullNamePrefix:FullNamePrefix,
        fullName:FullName,
        panCard:PanCard,
        dateofBirth:DateofBirth,
        flatNo:FlatNo,
        areaStreet:AreaStreet,
        flatNo1:FlatNo1,
        areaStreet1:AreaStreet1,
        pincode:pincode,
        pincodee:pincodee,
        isCurrentAddress:IsCurrentAddress,
      };

      // Send POST request to the backend API
      axios.post('http://localhost:9855/api/user-address/add', data)
        .then(response => {
          console.log('Data sent successfully:', response.data);
          if (IsCurrentAddress === 'no') {
            navigate('/payment', { state: data });
          } else {
            navigate('/payment', { state: data });
          }
        })
        .catch(error => {
          console.error('Error while sending data:', error);
        });
    } else {
      console.log('Form submission failed. Please check the fields.');
    } 
  };
  useEffect(() => {
    if (propertyDetails.pincode) {
        setPincode(propertyDetails.pincode);
    }
}, [propertyDetails.pincode]);
  // JSX structure of the component

 





  
  return (
    <div className='org12'>

     <div className='h2 '>
     {propertyDetails1 ? (
            <h4>WellCome {propertyDetails1.fullName}<h2>Fill the details</h2></h4>
        ) : (
            <p>Loading...</p>
        )} 
     </div>
     
      <div>
        
    </div>
      <div className='row'>
                {/* First column */}
                <div className='col-md-2'>
                <h3>User Details & Premium Data</h3>
                
    <div className='container'>
        {propertyDetails || propertyDetails1 ? (
            <table>
                <tbody>
                    <tr>
                        <td><strong>Mobile:</strong></td>
                        <td>{propertyDetails.mobile}</td>
                    </tr>
                    <tr>
                        <td><strong>Email:</strong></td>
                        <td>{propertyDetails1.email}</td>
                    </tr>
                    <tr>
                        <td><strong> MarketValue:</strong></td>
                        <td>{propertyDetails.currentMarketValue}</td>
                    </tr>
                    <tr>
                        <td><strong>CarpetArea:</strong></td>
                        <td>{propertyDetails.carpetArea}</td>
                    </tr>
                    <tr>
                        <td><strong>Pincode:</strong></td>
                        <td>{propertyDetails.pincode}</td>
                    </tr>
                    <tr>
                        <td><strong>BuildingAge:</strong></td>
                        <td>{propertyDetails.buildingAge}</td>
                    </tr>
                    <tr>
                        <td><strong>PropertyEffect: </strong></td>
                        <td>{propertyDetails.propertyEffect}</td>
                    </tr>
                    <tr>
                        <td><strong>Security24x7: </strong></td>
                        <td>{propertyDetails.security24x7}</td>
                    </tr>
                    <tr>
                        <td><strong>Is Salaried:</strong></td>
                        <td>{propertyDetails.isSalaried}</td>
                    </tr>
                    <tr>
                        <td><strong>Premium:</strong></td>
                        <td>{propertyDetails.premium}</td>
                    </tr>
                </tbody>
            </table>
        ) : (
            <p>Loading...</p>
        )}
    </div>                  
                   
                </div>
                {/* Second column */}
                <div className='col-md-10'>
                <div className='forinner11d'>
          <form className='forinner11 container'>
            <h3>Enter PanCard details</h3>

            {/* Input field for FullName */}
            <div className='form-group11 container'>
              <div>FullName:</div>
              <div className='form-group11Input container'>
                <input
                  type='text'
                  className=''
                  placeholder='Enter your full name'
                  value={FullName.toUpperCase()}
                  onChange={(e) => handleInputChange('FullName', e.target.value, /.+/, 'Please enter your full name.')}
                />
                <p className='error-message11' style={{ color: 'red', textAlign: 'center' }}>
                  {errorMessages.FullName}
                </p>
              </div>
            </div>

            {/* Input field for PanCard */}
            <div className='form-group11 container'>
              <div>PanCard:</div>
              <div className='form-group11Input container'>
                <input
                  type='text'
                  className=''
                  placeholder='ex: ABCDE1234F'
                  // value={PanCard.toUpperCase()}
                  onChange={(e) =>
                    handleInputChange('PanCard', e.target.value, /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Please enter a valid PanCard.')
                  }
                />
                <p className='error-message11' style={{ color: 'red', textAlign: 'center' }}>{errorMessages.PanCard}</p>
              </div>
            </div>

            {/* Input field for DateofBirth */}
            <div className='form-group11 container'>
              <div>DateofBirth:</div>
              <div className='form-group11Input container'>
                <input
                  type='text'
                  className=''
                  placeholder='ex: dd/mm/yyyy'
                  value={DateofBirth}
                  onChange={(e) =>
                    handleInputChange('DateofBirth', e.target.value, /^\d{1,2}\/\d{1,2}\/\d{4}$/, 'Please enter a valid date of birth.')
                  }
                />
                <p className='error-message11' style={{ color: 'red', textAlign: 'center' }}>
                  {errorMessages.DateofBirth}
                </p>
              </div>
            </div>

            {/* Input field for pincode */}
            <div className='form-group11 container'>
              <div>Enter Pincode:</div>
              <div className='form-group11Input container'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='ex : 515001'
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                />
                <p className='error-message'>{errorMessages.pincode}</p>
              </div>
            </div>

            {/* Input field for FlatNo */}
            <div className='form-group11 container'>
              <div>FlatNo/House No:</div>
              <div className='form-group11Input container'>
                <input
                  type='text'
                  className=''
                  placeholder='ex: 123'
                  value={FlatNo}
                  onChange={(e) =>
                    handleInputChange('FlatNo', e.target.value, /^[A-Za-z0-9\s]+$/, 'Please enter a valid flat number.')
                  }
                />
                <p className='error-message11' style={{ color: 'red', textAlign: 'center' }}>
                  {errorMessages.FlatNo}
                </p>
              </div>
            </div>

            {/* Input field for AreaStreet */}
            <div className='form-group11 container'>
              <div>Area/Street:</div>
              <div className='form-group11Input container'>
                <input
                  type='text'
                  className=''
                  placeholder='ex: Main Street'
                  value={AreaStreet}
                  onChange={(e) =>
                    handleInputChange('AreaStreet', e.target.value, /^[A-Za-z0-9\s]+$/, 'Please enter a valid area or street.')
                  }
                />
                <p className='error-message11' style={{ color: 'red', textAlign: 'center' }}>
                  {errorMessages.AreaStreet}
                </p>
              </div>
            </div>

            {/* Input field for IsCurrentAddress */}
            <div className='form-group11 container'>
              <div>Is the address mentioned above your current address:</div>
              <div className='form-group11Input container'>
                <select onChange={(e) => setIsCurrentAddress(e.target.value)}>
                  <option value=''>Select</option>
                  <option value='yes'>Yes</option>
                  <option value='no'>No</option>
                </select>
              </div>
            </div>

            {/* Conditional rendering based on IsCurrentAddress */}
            {IsCurrentAddress === 'no' && (
              <div className='form-group11 container'>
                <hr />
                <div>Current Address:</div>
                <br />
                {/* Input field for pincodee */}
                <div className='form-group'>
                  <label>
                    Enter Pincode <span style={{ color: 'red' }}>*</span> :
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='ex: 515001'
                    value={pincodee}
                    onChange={(e) => handleInputChange('pincodee', e.target.value, /^\d{6}$/, 'Please enter a valid pincode.')}
                    maxLength={6}
                  />
                  <p className='error-message'>{errorMessages.pincodee}</p>
                </div>

                {/* Input field for FlatNo1 */}
                <div>
                  <label>
                    FlatNo/House No <span style={{ color: 'red' }}>*</span> :
                  </label>
                  <input
                    type='text'
                    className=''
                    placeholder='ex: 123'
                    value={FlatNo1}
                    onChange={(e) => handleInputChange('FlatNo1', e.target.value, /^[A-Za-z0-9\s]+$/, 'Please enter a valid flat number.')}
                  />
                  <p className='error-message11' style={{ color: 'red', textAlign: 'center' }}>
                    {errorMessages.FlatNo1}
                  </p>
                </div>

                {/* Input field for AreaStreet1 */}
                <div>
                  <label>
                    Area/Street <span style={{ color: 'red' }}>*</span> :
                  </label>
                  <input
                    type='text'
                    className=''
                    placeholder='ex: Main Street'
                    value={AreaStreet1}
                    onChange={(e) => handleInputChange('AreaStreet1', e.target.value, /^[A-Za-z0-9\s]+$/, 'Please enter a valid area or street.')}
                  />
                  <p className='error-message11' style={{ color: 'red', textAlign: 'center' }}>
                    {errorMessages.AreaStreet1}
                  </p>
                </div>
              </div>
            )}

            {/* Proceed button */}
            <h6 style={{color:'orange', textAlign:'center'}}>Please Check the Data Before you Submit the Details</h6>
            {/* <marquee style={{color:'red'}}>Please Check the Data Before you Submit the Details</marquee> */}

            <div className="text-center my-4">
  <button className="btn btn-success" type="button" onClick={handleProceed}>
    Proceed
  </button>
</div>
          </form>
        </div>
                </div>
            </div>
     
     

        
      </div>
  );
}

export default TotalInfo;

