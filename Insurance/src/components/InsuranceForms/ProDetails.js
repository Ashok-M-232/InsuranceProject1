import React, { useState, useEffect } from 'react';

function ProDetails() {
  const [Pincode, setPincode] = useState('');
  const [FlatNo, setFlatNo] = useState('');
  const [AreaStreet, setAreaStreet] = useState('');
  const [IsCurrentAddress, setIsCurrentAddress] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    Pincode: '',
    FlatNo: '',
    AreaStreet: '',
    IsCurrentAddress: '',
  });

  useEffect(() => {
    // Retrieve form data from sessionStorage on component mount
    const formData = JSON.parse(sessionStorage.getItem('proDetailsFormData'));
    if (formData) {
      setPincode(formData.Pincode);
      setFlatNo(formData.FlatNo);
      setAreaStreet(formData.AreaStreet);
      setIsCurrentAddress(formData.IsCurrentAddress);
    }
  }, []);

  const validateField = (fieldName, value, regex, errorMessage) => {
    if (!value || (regex && !regex.test(value))) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateInputs();

    if (isValid) {
      console.log('Form submitted:', {
        Pincode,
        FlatNo,
        AreaStreet,
        IsCurrentAddress,
      });
      // Store form data in sessionStorage
      sessionStorage.setItem(
        'proDetailsFormData',
        JSON.stringify({
          Pincode,
          FlatNo,
          AreaStreet,
          IsCurrentAddress,
        })
      );
      // Simulate navigation to the success page
      window.location.href = '/success';
    } else {
      console.log('Form submission failed. Please check the fields.');
    }
  };

  const validateInputs = () => {
    const pincodeRegex = /^[0-9]{6}$/;
    const flatNoRegex = /^[A-Za-z0-9]+$/;
    const areaStreetRegex = /^[A-Za-z0-9 ]+$/;

    let isValid = true;

    isValid = isValid && validateField('Pincode', Pincode, pincodeRegex, 'Please enter a valid pincode.');
    isValid = isValid && validateField('FlatNo', FlatNo, flatNoRegex, 'Please enter a valid flat/house number.');
    isValid = isValid && validateField('AreaStreet', AreaStreet, areaStreetRegex, 'Please enter a valid area/street.');

    return isValid;
  };

  const handleInputChange = (fieldName, value, regex, errorMessage) => {
    if (fieldName === 'IsCurrentAddress') {
      setIsCurrentAddress(value);
    } else {
      const setValue = value.trim(); // Trim whitespace from the input
      switch (fieldName) {
        case 'Pincode':
          setPincode(setValue);
          break;
        case 'FlatNo':
          setFlatNo(setValue);
          break;
        case 'AreaStreet':
          setAreaStreet(setValue);
          break;
        default:
          break;
      }

      validateField(fieldName, setValue, regex, errorMessage);

      // Store updated input value in sessionStorage
      sessionStorage.setItem(
        'proDetailsFormData',
        JSON.stringify({
          Pincode: fieldName === 'Pincode' ? setValue : Pincode,
          FlatNo: fieldName === 'FlatNo' ? setValue : FlatNo,
          AreaStreet: fieldName === 'AreaStreet' ? setValue : AreaStreet,
          IsCurrentAddress,
        })
      );
    }
  };

  return (
    <div className='org1'>
      <h1>Property Details</h1>
      <form className='forinner1 container' onSubmit={handleSubmit}>
        <div className='form-group1 container'>
          <div>Pincode:</div>
          <div className='form-group1Input container'>
            <input
              type='text'
              className=''
              placeholder='ex: 123456'
              value={Pincode}
              onChange={(e) => handleInputChange('Pincode', e.target.value, /^[0-9]{6}$/, 'Please enter a valid pincode.')}
            />
            <p className='error-message1' style={{ color: 'red', textAlign:'center' }}>{errorMessages.Pincode}</p>
          </div>
        </div>

        <div className='form-group1 container'>
          <div>Flatno/House No:</div>
          <div className='form-group1Input container'>
            <input
              type='text'
              className=''
              placeholder='ex: A123'
              value={FlatNo}
              onChange={(e) => handleInputChange('FlatNo', e.target.value, /^[A-Za-z0-9]+$/, 'Please enter a valid flat/house number.')}
            />
            <p className='error-message1' style={{ color: 'red', textAlign:'center' }}>{errorMessages.FlatNo}</p>
          </div>
        </div>

        <div className='form-group1 container'>
          <div>Area/Street:</div>
          <div className='form-group1Input container'>
            <input
              type='text'
              className=''
              placeholder='ex: Main Street'
              value={AreaStreet}
              onChange={(e) =>
                handleInputChange('AreaStreet', e.target.value, /^[A-Za-z0-9 ]+$/, 'Please enter a valid area/street.')
              }
            />
            <p className='error-message1' style={{ color: 'red', textAlign:'center' }}>{errorMessages.AreaStreet}</p>
          </div>
        </div>

        <div className='form-group1 container'>
          <div>
            Is the address mentioned above your current address:
            <select value={IsCurrentAddress} onChange={(e) => handleInputChange('IsCurrentAddress', e.target.value)}>
              <option value=''>Select</option>
              <option value='yes'>Yes</option>
              <option value='no'>No</option>
            </select>
          </div>
          {IsCurrentAddress === 'no' && (
            <div className='form-group1Input container'>
              <div>Current Address:</div>
              {/* Include fields for current address */}
            </div>
          )}
        </div>

        <button className='btn btn-success my-2' type='submit'>
          {IsCurrentAddress === 'no' ? 'Proceed' : 'Next'}
        </button>
      </form>
    </div>
  );
}

export default ProDetails;
