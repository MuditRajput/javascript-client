import React from 'react';
import { TextField, P, Slider } from '../../components';
import { Banners } from '../../configs/Constants';

function TextFieldDemo() {
  return (
    <div>
      <Slider
        banners={Banners}
      />
      <P>This Is Disabled Input</P>
      <TextField defaultValue="Disabled Input" disabled />
      <P>A Valid Input</P>
      <TextField defaultValue="Valid Input" />
      <P>An Input With Errors</P>
      <TextField redBorder defaultValue="101" />
      <P warn>Should be a Number</P>
    </div>
  );
}
export default TextFieldDemo;
