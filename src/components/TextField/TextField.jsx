import React from 'react';
import PropTypes from 'prop-types';
import { Input, P } from './style';

const TextField = (props) => {
  const {
    defaultValue, disabled, onChange, error, onBlur,
  } = props;
  return (
    <>
      <Input type="text" defaultValue={defaultValue} disabled={disabled} onChange={onChange} error={error} onBlur={onBlur} />
      <P>{error}</P>
    </>
  );
};

TextField.defaultProps = {
  disabled: false,
  error: '',
  defaultValue: '',
  onChange: () => {},
  onBlur: () => {},
};

TextField.propTypes = {
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string,
  onBlur: PropTypes.func,
};

export default TextField;
