import React from 'react';
import PropTypes from 'prop-types';

const RadioGroup = (props) => {
  const {
    error, onChange, options, value: selectedValue,
  } = props;
  return (
    <>
      {
        options.map(({ value, label }) => (
          <div key={label}>
            <input type="radio" checked={selectedValue === value} id={label} value={value} onChange={onChange} error={error} />
            {label}
          </div>
        ))
      }
    </>
  );
};

RadioGroup.propTypes = {
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
};

RadioGroup.defaultProps = {
  error: '',
  value: '',
  options: [],
};

export default RadioGroup;
