import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap'; // Import React Bootstrap Table component if you're using Bootstrap 4 or above


const UserAddressComponent = () => {
  const [userAddresses, setUserAddresses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9855/api/user-address')
      .then(response => {
        setUserAddresses(response.data);
      })
      .catch(error => {
        console.error('Error fetching user addresses:', error);
      });
  }, []);

  return (
    <div className='container'>
      <h2 className='m-4'>User Address Details</h2>
      <Table striped bordered hover > {/* Use Bootstrap Table component */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>PAN Card</th>
            <th>DOB</th> 
            <th>FLAT NO</th>  
            <th>STREET NO</th>  
            <th>PINCODE</th>  
            <th>CURRENT ADDRESS</th>  
            <th>FLAT NO-Current</th>  
            <th>STREET NO-Current</th>  
            <th>PINCODE-current</th>   
             
            <th></th> 
            {/* Add more headers as needed */}
          </tr>
        </thead>
        <tbody>
          {userAddresses.map(address => (
            <tr key={address.id}>
              <td>{address.id}</td>
              <td>{address.fullName}</td>
              <td>{address.panCard}</td>
              <td>{address.dateOfBirth}</td>
              <td>{address.flatNo}</td>
              <td>{address.areaStreet}</td>
              <td>{address.pincode}</td>
              <td>{address.isCurrentAddress}</td>
              <td>{address.flatNo}</td>
              <td>{address.areaStreet}</td>
              <td>{address.pincodee}</td>
              {/* Add more cells as needed */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserAddressComponent;
