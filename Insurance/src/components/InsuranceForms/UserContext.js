// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [propertyData, setPropertyData] = useState({});
  const [popupMessage, setPopupMessage] = useState('');

  const updatePropertyData = (data) => {
    setPropertyData({
      ...propertyData,
      carpetArea: data.carpetArea,
      pincode: data.pincode,
    });
  };

  const updatePopupMessage = (message) => {
    setPopupMessage(message);
  };

  return (
    <UserContext.Provider value={{ propertyData, updatePropertyData, popupMessage, updatePopupMessage }}>
      {children}
    </UserContext.Provider>
  );
};

export const usePropertyContext = () => {
  return useContext(UserContext);
};
