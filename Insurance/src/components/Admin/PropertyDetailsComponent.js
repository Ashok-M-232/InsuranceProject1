import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap'; // Import React Bootstrap Table component if you're using Bootstrap 4 or above


const PropertyDetailsComponent = () => {
  const [propertyDetails, setPropertyDetails] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9855/api/property/fetch')
      .then(response => {
        setPropertyDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching property details:', error);
      });
  }, []);

  return (
    <div className='container'>
      <h2 className='m-4'>Property Details</h2>
      <Table striped bordered hover> {/* Use Bootstrap Table component */}
      <thead>
        <tr>
          <th>ID</th>
          <th>MARKER VALUE</th>
          <th>AREA</th>
          <th>PINCODE</th>
          <th>BUILDING AGE</th>
          <th>PROPERTY EFFECTED</th>
          <th>SECURITY</th>
          <th>SALARIED ?</th>
          <th>PREMIUM</th>
          <th>MOBILE.NO</th>
          {/* Add more headers as needed */}
        </tr>
      </thead>
      <tbody>
        {propertyDetails.map(property => (
          <tr key={property.id}>
            <td>{property.id}</td>
            <td>{property.currentMarketValue}</td>
            <td>{property.carpetArea}</td>
            <td>{property.pincode}</td>
            <td>{property.buildingAge}</td>
            <td>{property.propertyEffect}</td>
            <td>{property.security24x7}</td>
            <td>{property.isSalaried}</td>
            <td>{property.premium}</td>
            <td>{property.mobile}</td>
            {/* Add more cells as needed */}
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  );
};

export default PropertyDetailsComponent;
