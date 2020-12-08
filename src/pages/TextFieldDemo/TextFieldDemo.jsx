/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { TextField } from '../../components';

class TextFieldDemo extends Component {
  render() {
    return (
      <div id="root">
        <p>This Is Disabled Input</p>
        <TextField
          defaultValue="Disabled Input"
          disabled
        />
        <p>A Valid Input</p>
        <TextField
          defaultValue="Valid Input"
          error
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
}

export default TextFieldDemo;
