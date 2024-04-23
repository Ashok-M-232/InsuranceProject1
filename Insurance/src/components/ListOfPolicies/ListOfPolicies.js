import React from 'react';
import { Link } from 'react-router-dom';
import './ListOfPolicies.css';

function ListOfPolicies() {
  return (
    <div className='container'>
      <div className='listOfPolicies'>
        <h4 className='text-center'>Insurance Policies</h4>
        <Link to={"property"} className='btn btn-primary container'><h4>Property Insurance</h4></Link>      
      </div>
    </div>
  );
}

export default ListOfPolicies;
