import React from 'react';
import { NavBar } from '../components';

const PrivateLayout = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
  };
  return (
    <NavBar
      handleLogout={handleLogout}
    />
  );
};

export default PrivateLayout;
