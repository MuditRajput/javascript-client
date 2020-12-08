import React from 'react';
import Style from './style';

function TextField(prop) {
  const { input, highlight } = Style();
  const { defaultValue, disabled, error } = prop;
  let style;
  if (error) {
    style = { ...input, ...highlight };
  } else {
    style = { ...input };
  }
  return (
    <>
      <input type="text" defaultValue={defaultValue} disabled={disabled} className="input" style={style} />
    </>
  );
}
export default TextField;
