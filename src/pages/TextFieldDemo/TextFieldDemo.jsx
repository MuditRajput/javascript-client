/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { TextField, P } from '../../components';

class TextFieldDemo extends Component {
  render() {
    return (
      <div id="root">
        <P>This Is Disabled Input</P>
        <TextField
          defaultValue="Disabled Input"
          disabled
        />
        <P>A Valid Input</P>
        <TextField
          defaultValue="Valid Input"
        />
        <P>An Input With Errors</P>
        <TextField
          redBorder
          defaultValue="101"
        />
        <P warn>Should be a Number</P>
      </div>
    );
  }
}

export default TextFieldDemo;
