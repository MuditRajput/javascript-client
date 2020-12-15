import React from 'react';
import PropTypes from 'prop-types';
import { Input, P } from './style';

function TextField(props) {
  const {
    value, disabled, onChange, error,
  } = props;
  return (
    <>
      <Input type="text" defaultValue={value} disabled={disabled} onChange={onChange} error={error} />
      <P>{error}</P>
    </>
  );
}

TextField.defaultProps = {
  disabled: false,
  error: '',
};

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default TextField;
