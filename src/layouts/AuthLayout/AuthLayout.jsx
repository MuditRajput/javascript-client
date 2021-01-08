import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../components';
import { LoginUi } from '../../pages';

const AuthLayout = ({ history }) => (
  <>
    <LoginUi history={history} />
    <br />
    <Footer />
  </>
);

AuthLayout.propTypes = {
  history: PropTypes.object.isRequired,
};

export default AuthLayout;
