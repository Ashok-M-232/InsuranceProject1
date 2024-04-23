import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PracSer from './PracSer';

function Prac() {
  let navigate = useNavigate();

  const [emp, setEmp] = useState({
    currentMarketValue: "",
    carpetArea: "",
    pincode: "",
    buildingAge: "",
    propertyEffect: "Yes",
    security24x7: "Yes",
    isSalaried: "Yes"
  });
  
  const [errors, setErrors] = useState({
    currentMarketValue: '',
    carpetArea: '',
    pincode: '',
    buildingAge: '',
    propertyEffect: '',
    security24x7: '',
    isSalaried: ''
  });

  const cancelHandler = () => {
    navigate("/home");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Universal regex for validation
    const regexMap = {
      currentMarketValue: /^\d+(\.\d{1,2})?$/, // Allow positive numbers with optional decimal up to 2 places
      carpetArea: /^\d+$/, // Allow positive integer numbers
      pincode: /^\d{0,6}$/, // Allow up to 6 digit pincode
      buildingAge: /^\d+$/, // Allow positive integer numbers
      propertyEffect: /^(Yes|No)$/, // Allow "Yes" or "No"
      security24x7: /^(Yes|No)$/, // Allow "Yes" or "No"
      isSalaried: /^(Yes|No)$/ // Allow "Yes" or "No"
    };

    // Validate input value using regex pattern
    if (regexMap[name].test(value) || value === '') { // Allow empty value for pincode
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
      setEmp({ ...emp, [name]: value });
    } else {
      setErrors(prevErrors => ({ ...prevErrors, [name]: `Invalid ${name}` }));
    }
  };

  const saveHandler = (e) => {
    e.preventDefault();

    // Check if there are any validation errors
    if (Object.values(errors).every(error => !error)) {
      console.log("emp =>", emp);
      PracSer.createEmp(emp)
        // .then(res => {
        //   navigate("/");
        // })
        .catch(error => {
          console.error("Error saving user property details:", error);
        });
    } else {
      console.log("Please fix the validation errors before saving.");
    }
  };

  return (
    <div className='container mt-3'>
      <div className='row'>
        <div className='card col-md-6 offset-md-3'>
          <h3 className='text-center'>Input</h3>
          <div className='card-body'>
            <form>
              <div className='form-group'>
                <label>Current Market Value</label>
                <input
                  type='text'
                  name='currentMarketValue'
                  className='form-control'
                  placeholder='Current Market Value'
                  value={emp.currentMarketValue}
                  onChange={handleChange}
                />
                {errors.currentMarketValue && <p className="text-danger">{errors.currentMarketValue}</p>}
              </div>

              <div className='form-group'>
                <label>Carpet Area</label>
                <input
                  type='text'
                  name='carpetArea'
                  className='form-control'
                  placeholder='Carpet Area'
                  value={emp.carpetArea}
                  onChange={handleChange}
                />
                {errors.carpetArea && <p className="text-danger">{errors.carpetArea}</p>}
              </div>

              <div className='form-group'>
  <label>Age of Building <span style={{ color: 'red' }}>*</span> :</label>
  <select
    className='form-control form-select'
    value={emp.buildingAge} // Use emp.buildingAge from state
    onChange={(e) => setEmp({ ...emp, buildingAge: e.target.value })} // Update buildingAge in emp state
  >
    {[0, 5, 10, 15, 20, 25, 30].map((years) => (
      <option key={years} value={years}>
        {`${years}-${years + 5} years`}
      </option>
    ))}
  </select>
</div>


              <div className='form-group'>
                <label>Pincode</label>
                <input
                  type='text'
                  name='pincode'
                  className='form-control'
                  placeholder='Pincode'
                  value={emp.pincode}
                  onChange={handleChange}
                />
                {errors.pincode && <p className="text-danger">{errors.pincode}</p>}
              </div>

              <div className='form-group'>
  <label>Has your property been affected by floods/earthquake in the past 5 years{' '}
    <span style={{ color: 'red' }}>*</span> :</label>
  <select
    className='form-control form-select'
    value={emp.propertyEffect} // Use emp.propertyEffect from state
    onChange={(e) => setEmp({ ...emp, propertyEffect: e.target.value })} // Update propertyEffect in emp state
  >
    <option value='Yes'>Yes</option>
    <option value='No'>No</option>
  </select>
</div>

<div className='form-group'>
  <label>24*7 Security <span style={{ color: 'red' }}>*</span> :</label>
  <select
    className='form-control form-select'
    value={emp.security24x7} // Use emp.security24x7 from state
    onChange={(e) => setEmp({ ...emp, security24x7: e.target.value })} // Update security24x7 in emp state
  >
    <option value='Yes'>Yes</option>
    <option value='No'>No</option>
  </select>
</div>


              <div className='form-group'>
                <label>Is Salaried</label>
                <input
                  type='text'
                  name='isSalaried'
                  className='form-control'
                  placeholder='Is Salaried'
                  value={emp.isSalaried}
                  onChange={handleChange}
                />
                {errors.isSalaried && <p className="text-danger">{errors.isSalaried}</p>}
              </div>

              <button className='btn btn-success' onClick={saveHandler}>Save</button>
              <button className='btn btn-danger' onClick={cancelHandler}>Cancel</button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prac;
