import React from 'react';
import { TextField, Slider } from '../../components';

function TextFieldDemo() {
  return (
    <div>
      <div style={{ background: '#f1f1f1' }}>
        <Slider
          height={300}
          banners={['cloud.jpg', 'dns-server.png', 'full-stack-web-development.jpg', 'js.jpg', 'load-balancer.png']}
        />
      </div>
      <p>This Is Disabled Input</p>
      <TextField
        defaultValue="Disabled Input"
        disabled
      />
      <p>A Valid Input</p>
      <TextField
        defaultValue="Valid Input"
      />
      <p>An Input With Errors</p>
      <TextField
        defaultValue="101"
        error
      />
      <p style={{ color: 'red', fontSize: '12px' }}>Should be a Number</p>
    </div>
  );
}

export default TextFieldDemo;
