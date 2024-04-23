import React from 'react'
import UserComponent from './UserComponent'
import UserAddressComponent from './UserAddressComponent'
import PropertyDetailsComponent from './PropertyDetailsComponent'


function Admin() {
  return (
    <div>
      <UserComponent/>
      <UserAddressComponent/>
      <PropertyDetailsComponent/>
    </div>
  )
}

export default Admin
