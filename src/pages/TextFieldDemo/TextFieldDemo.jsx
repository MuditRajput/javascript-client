import React from 'react';
import { TextField, P, Slider } from '../../components';

function TextFieldDemo() {
  return (
    <div>
      <Slider
        banners={['cloud.jpg', 'dns-server.png', 'full-stack-web-development.jpg', 'js.jpg', 'load-balancer.png']}
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
