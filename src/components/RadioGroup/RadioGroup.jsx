import React from 'react';
import PropTypes from 'prop-types';

const RadioGroup = (props) => {
  const { error, onChange, options } = props;
  return (
    <>
      {
        options.map(({ value, label }) => (
          <div key={label}>
            <input type="radio" id={label} value={value} onChange={onChange} error={error} />
            {label}
          </div>
        ))
      }
    </>
  );
};

RadioGroup.propTypes = {
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
};

RadioGroup.defaultProps = {
  error: '',
  options: [],
};

export default RadioGroup;
