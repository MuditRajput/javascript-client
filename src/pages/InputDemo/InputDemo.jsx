import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import {
  TextField, SelectField, RadioGroup, Button,
} from '../../components';
import {
  selectOptions, radioOptionsCricket, radioOptionsFootball,
} from '../../configs/Constants';

const InputDemo = () => {
  const schema = yup.object().shape({
    name: yup.string().required('name is required').min(3, 'should have more then 3 characters'),
    sport: yup.string().required('sport is required'),
    cricket: yup.string().when('sport', { is: 'cricket', then: yup.string().required('required') }),
    football: yup.string().when('sport', { is: 'football', then: yup.string().required('required') }),
  });

  const [state, setstate] = useState({
    name: '', sport: '', cricket: '', football: '',
  });

  const [onBlur, setBlur] = useState({
    name: false, sport: false, cricket: false, football: false,
  });

  const handleBlur = (label) => {
    setBlur({ ...onBlur, [label]: true });
  };

  const isTouched = () => {
    if (onBlur.name || onBlur.sport || onBlur.cricket || onBlur.football) {
      return true;
    }
    return false;
  };

  const hasErrors = () => {
    try {
      schema.validateSync(state);
    } catch (err) {
      return true;
    }
    return false;
  };

  const getError = (label) => {
    if (onBlur[label] && hasErrors()) {
      try {
        schema.validateSyncAt(label, state);
      } catch (err) {
        return err.message;
      }
    }
    return null;
  };

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
    console.log(onBlur);
  });

  const onSubmit = () => {
    console.log(state);
  };

  const resetState = () => {
    setstate({
      name: '', sport: '', cricket: '', football: '',
    });
  };

  const radioOptions = () => {
    const options = {
      cricket: radioOptionsCricket,
      football: radioOptionsFootball,
    };
    return options[state.sport];
  };

  const selectedSport = state[state.sport];

  return (
    <div>
      <p>Name</p>
      <TextField value="" onChange={handleTextField} onBlur={async () => handleBlur('name')} error={getError('name')} />
      <p>Sport</p>
      <SelectField
        options={selectOptions}
        onChange={handleSelectField}
        onBlur={() => handleBlur('sport')}
        error={getError('sport')}
      />
      { (state.sport)
        ? (
          <>
            <p>What You Do?</p>
            <RadioGroup options={radioOptions()} onChange={handleRadioGroup} value={selectedSport} onBlur={() => handleBlur(`${state.sport}`)} error={getError(`${state.sport}`)} />
          </>
        )
        : ''}
      <Button
        value="Cancel"
        onClick={resetState}
      />
      <Button
        value="Submit"
        onClick={onSubmit}
        disabled={!isTouched() || hasErrors()}
        colored={!(!isTouched() || hasErrors())}
      />
    </div>
  );
};

export default InputDemo;
