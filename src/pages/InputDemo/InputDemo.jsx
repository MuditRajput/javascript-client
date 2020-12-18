import React, { useEffect, useState } from 'react';
import { TextField, SelectField, RadioGroup } from '../../components';
import {
  selectOptions, radioOptionsCricket, radioOptionsFootball,
} from '../../configs/Constants';

const InputDemo = () => {
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
  const handleRadioGroup = (input) => {
    setstate({ ...state, [state.sport]: input.target.value });
  };

  useEffect(() => {
    console.log(state);
  });

  const radioOptions = () => {
    const options = {
      cricket: radioOptionsFootball,
      football: radioOptionsCricket,
    };
    return options[state.sport];
  };

  const selectedSport = state[state.sport];

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
          ? (
            <RadioGroup
              options={radioOptions()}
              onChange={handleRadioGroup}
              value={selectedSport}
            />
          )
          : ''
      }
    </div>
  );
};

export default InputDemo;
