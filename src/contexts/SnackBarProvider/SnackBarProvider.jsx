import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const SnackBarProvider = (props) => {
  const {
    open, status, message, onClose,
  } = props;
  return (
    <Snackbar open={open} autoHideDuration={1000} onClose={onClose}>
      <MuiAlert severity={status}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

SnackBarProvider.propTypes = {
  open: PropTypes.bool,
  status: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

SnackBarProvider.defaultProps = {
  open: false,
};

export default SnackBarProvider;
