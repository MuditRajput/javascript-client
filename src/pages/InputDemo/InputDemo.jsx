import React, { useEffect, useState } from 'react';
import { TextField, SelectField, RadioGroup } from '../../components';
import {
  selectOptions, radioOptionsCricket, radioOptionsFootball, cricket, football,
} from '../../configs/Constants';

function InputDemo() {
  const [state, setstate] = useState({
    name: '', sport: '', cricket: '', football: '',
  });
  const handleTextField = (input) => {
    setstate({
      ...state, name: input.target.value,
    });
  };
  const handleSelectField = (input) => {
    setstate({
      ...state, sport: input.target.value, cricket: '', football: '',
    });
  };
  const handleRadioGroup = (input) => ({ ...state, [state.sport]: input.target.value });
  useEffect(() => {
    console.log(state);
  });
  const radioOptions = () => {
    let option;
    if (state.sport === football) {
      option = radioOptionsFootball;
    }
    if (state.sport === cricket) {
      option = radioOptionsCricket;
    }
    return option;
  };
  return (
    <div>
      <p>Name</p>
      <TextField value="" onChange={handleTextField} />
      <SelectField
        options={selectOptions}
        onChange={handleSelectField}
      />
      {
        (state.sport)
          ? <RadioGroup options={radioOptions()} onChange={handleRadioGroup} />
          : ''
      }
    </div>
  );
}
export default InputDemo;
