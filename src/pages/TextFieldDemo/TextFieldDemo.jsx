import React from 'react';
import { TextField, Slider } from '../../components';

function TextFieldDemo() {
  return (
    <div>
      <Slider
        banners={['cloud.jpg', 'dns-server.png', 'full-stack-web-development.jpg', 'js.jpg', 'load-balancer.png']}
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
