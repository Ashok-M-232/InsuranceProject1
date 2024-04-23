import React, { createContext, useContext } from 'react';

// Create a new context
export const PropertyContext = createContext();

// Custom hook to consume the PropertyContext
export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('usePropertyContext must be used within a PropertyContextProvider');
  }
  return context;
};

// PropertyContextProvider component to wrap your application and provide the context
export const PropertyContextProvider = ({ children }) => {
  // Define your context values here
  const [currentMarketValue, setCurrentMarketValue] = React.useState('');
  const [carpetArea, setCarpetArea] = React.useState('');
  const [pincode, setPincode] = React.useState('');
  const [buildingAge, setBuildingAge] = React.useState('0');
  const [propertyEffect, setPropertyEffect] = React.useState('No');
  const [security24x7, setSecurity24x7] = React.useState('No');
  const [isSalaried, setIsSalaried] = React.useState('Yes');
  const [totalSum, setTotalSum] = React.useState(0);
  const [popupMessage, setPopupMessage] = React.useState(null);
  const [showPopup, setShowPopup] = React.useState(false);

  // You can add more context values if needed

  return (
    <PropertyContext.Provider
      value={{
        currentMarketValue,
        setCurrentMarketValue,
        carpetArea,
        setCarpetArea,
        pincode,
        setPincode,
        buildingAge,
        setBuildingAge,
        propertyEffect,
        setPropertyEffect,
        security24x7,
        setSecurity24x7,
        isSalaried,
        setIsSalaried,
        totalSum,
        setTotalSum,
        popupMessage,
        setPopupMessage,
        showPopup,
        setShowPopup,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};
