import React from 'react';
import PropTypes from 'prop-types';
import { P } from './style';

const RadioGroup = (props) => {
  const {
    error, onChange, options, onBlur,
  } = props;
  return (
    <>
      {
        options.map(({ value, label }) => (
          <div key={label}>
            <input type="radio" id={label} value={value} onChange={onChange} onBlur={onBlur} />
            <label htmlFor={label}>{label}</label>
          </div>
        ))
      }
      <P>{error}</P>
    </>
  );
};

RadioGroup.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  onBlur: PropTypes.func.isRequired,
};

RadioGroup.defaultProps = {
  error: '',
};

export default RadioGroup;
