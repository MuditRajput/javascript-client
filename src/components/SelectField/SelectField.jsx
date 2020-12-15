import React from 'react';
import PropTypes from 'prop-types';
import { Select, P } from './style';

function TextField(props) {
  const {
    options, onChange, defaultText, onBlur, error,
  } = props;
  return (
    <div>
      <Select name="Sport" onChange={onChange} onBlur={onBlur}>
        <option>{defaultText}</option>
        {
          options.map(({ value, label }) => <option key={label}>{value}</option>)
        }
      </Select>
      <P>{error}</P>
    </div>
  );
}

TextField.defaultProps = {
  defaultText: 'select',
  error: '',
};

TextField.propTypes = {
  defaultText: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default TextField;
