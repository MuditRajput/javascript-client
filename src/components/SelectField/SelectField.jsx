import React from 'react';
import PropTypes from 'prop-types';
import { Select } from './style';

function TextField(props) {
  const {
    options, onChange, defaultText,
  } = props;
  return (
    <div>
      <Select name="Sport" onChange={onChange}>
        <option>{defaultText}</option>
        {
          options.map(({ value, label }) => <option key={label}>{value}</option>)
        }
      </Select>
    </div>
  );
}

TextField.defaultProps = {
  defaultText: 'select',
};

TextField.propTypes = {
  defaultText: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextField;
