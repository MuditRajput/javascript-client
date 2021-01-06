/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Typography } from '@material-ui/core';

const withLoaderAndMessage = (WrappedComponent) => {
  const WithLoaderAndMessage = (props) => {
    const { loader, dataLength, ...rest } = props;
    if (loader) {
      return (
        <>
          <CircularProgress size={24} />
        </>
      );
    }
    if (!dataLength) {
      return (
        <Typography variant="h3">OOPS!, No More Trainees</Typography>
      );
    }
    return (
      <WrappedComponent {...rest} />
    );
  };

  WithLoaderAndMessage.propTypes = {
    loader: PropTypes.bool,
    dataLength: PropTypes.number.isRequired,
  };

  WithLoaderAndMessage.defaultProps = {
    loader: false,
  };

  return WithLoaderAndMessage;
};

export default withLoaderAndMessage;
