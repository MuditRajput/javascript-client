import React from 'react';
import { Input } from './style';

function TextField(prop) {
  const { defaultValue, disabled, redBorder } = prop;
  return (
    <>
      <Input type="text" defaultValue={defaultValue} disabled={disabled} redBorder={redBorder} />
    </>
  );
}
export default TextField;
