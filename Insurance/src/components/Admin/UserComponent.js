import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap'; // Import React Bootstrap Table component if you're using Bootstrap 4 or above

const UserComponent = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9855/api/signin')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div className='container'>
      <h2 className='m-4 '>User Details</h2>
      <Table striped bordered hover > {/* Use Bootstrap Table component */}
        <thead>
          <tr>
            <th>Mobile</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Property ID</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.mobile}>
              <td>{user.mobile}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.PropertyId}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserComponent;
