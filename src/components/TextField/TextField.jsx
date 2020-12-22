import React from 'react';
import PropTypes from 'prop-types';
import { Input, P } from './style';

const TextField = (props) => {
  const {
    value, disabled, onChange, error, onBlur,
  } = props;
  return (
    <>
      <Input type="text" defaultValue={value} disabled={disabled} onChange={onChange} error={error} onBlur={onBlur} />
      <P>{error}</P>
    </>
  );
};

TextField.defaultProps = {
  disabled: false,
  error: '',
  onBlur: null,
  onChange: null,
};

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string,
  onBlur: PropTypes.func,
};

export default TextField;
