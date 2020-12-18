import React from 'react';
import { TextField, Slider } from '../../components';
import { Banners } from '../../configs/Constants';

function TextFieldDemo() {
  return (
    <div>
      <Slider
        banners={Banners}
      />
      <p>This Is Disabled Input</p>
      <TextField value="Disabled Input" disabled />
      <p>A Valid Input</p>
      <TextField value="Valid Input" />
      <p>An Input With Errors</p>
      <TextField value="101" error="Should be Number" />
    </div>
  );
}
export default TextFieldDemo;
