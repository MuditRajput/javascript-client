import React from 'react';
import PropTypes from 'prop-types';
import { NavBar } from '../components';

const PrivateLayout = ({ children }) => (
  <>
    <NavBar />
    <div className="main">{children}</div>
  </>
);

PrivateLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateLayout;
